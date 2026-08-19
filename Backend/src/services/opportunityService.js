import { supabase, isSupabaseConfigured } from '../config/supabase.js';
import { normalizeSkill } from '../utils/skillNormalizer.js';

// In-Memory Persistent Store for Opportunities
let memoryOpportunities = new Map();

export const OpportunityService = {
  /**
   * Create new Job or Internship Opportunity
   */
  async createOpportunity(employerId, payload, isDraft = false) {
    const oppId = `opp-${Date.now()}`;
    const oppType = payload.opportunity_type || 'JOB';
    const status = isDraft ? 'DRAFT' : 'PUBLISHED';

    // Normalize Skills
    const rawSkills = Array.isArray(payload.skills) ? payload.skills : [];
    const normalizedSkills = rawSkills.map(s => {
      const name = typeof s === 'string' ? s : s.skill_name || s.name;
      return {
        id: `osk-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        opportunity_id: oppId,
        skill_name: name,
        normalized_skill: normalizeSkill(name),
        requirement_type: s.requirement_type || (s.isRequired ? 'REQUIRED' : 'PREFERRED'),
        is_core: Boolean(s.is_core || s.isCore)
      };
    });

    const newOpportunity = {
      id: oppId,
      employer_id: employerId,
      opportunity_type: oppType,
      title: payload.title || '',
      department: payload.department || 'Engineering',
      company_name: payload.company_name || 'TechNova Solutions',
      company_website: payload.company_website || '',
      description: payload.description || '',
      employment_type: payload.employment_type || 'Full Time',
      internship_type: payload.internship_type || 'Technical',
      responsibilities: payload.responsibilities || [],

      // Rajasthan Location
      state: 'Rajasthan',
      district: payload.district || 'Jaipur',
      city: payload.city || payload.district || 'Jaipur',
      work_mode: payload.work_mode || 'Hybrid',

      // Compensation
      salary_min: payload.salary_min !== undefined ? Number(payload.salary_min) : 400000,
      salary_max: payload.salary_max !== undefined ? Number(payload.salary_max) : 800000,
      salary_type: payload.salary_type || 'Annual CTC',

      stipend_min: payload.stipend_min !== undefined ? Number(payload.stipend_min) : 10000,
      stipend_max: payload.stipend_max !== undefined ? Number(payload.stipend_max) : 20000,
      is_paid: payload.is_paid !== undefined ? Boolean(payload.is_paid) : true,
      duration_months: payload.duration_months || '6 Months',

      // Education & Experience
      education: payload.education || {
        qualification: 'B.Tech',
        branches: ['CSE', 'IT'],
        academic_year: '3rd Year',
        minimum_cgpa: 7.0
      },
      experience_level: payload.experience_level || 'Fresher',
      experience_min: payload.experience_min || 0,
      experience_max: payload.experience_max || 2,

      // Benefits & Application Details
      ppo_available: Boolean(payload.ppo_available),
      certificate_provided: Boolean(payload.certificate_provided),
      mentorship_provided: Boolean(payload.mentorship_provided),
      flexible_schedule: Boolean(payload.flexible_schedule),

      application_deadline: payload.application_deadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      max_applications: payload.max_applications ? Number(payload.max_applications) : null,

      skills: normalizedSkills,
      status: status,
      applications_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // 1. Sync to Supabase if connected
    if (isSupabaseConfigured()) {
      try {
        console.log(`[Supabase ⏳] Saving opportunity (${oppType}) to Supabase...`);
        const validEmployerUuid = (employerId && employerId.length === 36) ? employerId : 'a1b2c3d4-e5f6-4890-abcd-ef1234567890';
        
        const { data: dbOpp, error: oppErr } = await supabase
          .from('opportunities')
          .insert({
            employer_id: validEmployerUuid,
            opportunity_type: newOpportunity.opportunity_type,
            title: newOpportunity.title,
            department: newOpportunity.department,
            company_name: newOpportunity.company_name,
            company_website: newOpportunity.company_website,
            description: newOpportunity.description,
            employment_type: newOpportunity.employment_type,
            internship_type: newOpportunity.internship_type,
            state: newOpportunity.state,
            district: newOpportunity.district,
            city: newOpportunity.city,
            work_mode: newOpportunity.work_mode,
            salary_min: newOpportunity.salary_min,
            salary_max: newOpportunity.salary_max,
            salary_type: newOpportunity.salary_type,
            stipend_min: newOpportunity.stipend_min,
            stipend_max: newOpportunity.stipend_max,
            is_paid: newOpportunity.is_paid,
            duration_months: newOpportunity.duration_months,
            minimum_qualification: newOpportunity.education?.qualification || 'B.Tech',
            minimum_cgpa: newOpportunity.education?.minimum_cgpa ? Number(newOpportunity.education.minimum_cgpa) : null,
            experience_min: newOpportunity.experience_min,
            experience_max: newOpportunity.experience_max,
            application_deadline: newOpportunity.application_deadline,
            max_applications: newOpportunity.max_applications,
            ppo_available: newOpportunity.ppo_available,
            certificate_provided: newOpportunity.certificate_provided,
            mentorship_provided: newOpportunity.mentorship_provided,
            status: newOpportunity.status
          })
          .select()
          .single();

        if (oppErr) {
          console.error(`[Supabase ❌ Error] opportunities insert:`, oppErr.message);
        } else if (dbOpp) {
          newOpportunity.id = dbOpp.id;

          // Insert opportunity_skills
          if (normalizedSkills.length > 0) {
            await supabase.from('opportunity_skills').insert(
              normalizedSkills.map(s => ({
                opportunity_id: dbOpp.id,
                skill_name: s.skill_name,
                normalized_skill: s.normalized_skill,
                requirement_type: s.requirement_type,
                is_core: s.is_core
              }))
            );
          }

          // Insert opportunity_education
          if (newOpportunity.education) {
            try {
              const branchesArr = Array.isArray(newOpportunity.education.branches)
                ? newOpportunity.education.branches
                : [newOpportunity.education.branches || 'Computer Science & Engineering'];

              const eduPayload = {
                opportunity_id: dbOpp.id,
                qualification: newOpportunity.education.qualification || 'B.Tech',
                branches: branchesArr,
                academic_year: newOpportunity.education.academic_year || '4th Year / Graduating',
                minimum_cgpa: newOpportunity.education.minimum_cgpa ? Number(newOpportunity.education.minimum_cgpa) : null
              };

              const { error: eduErr } = await supabase
                .from('opportunity_education')
                .insert(eduPayload);

              if (eduErr) {
                console.warn(`[Supabase ⚠️] opportunity_education insert notice:`, eduErr.message);
              } else {
                console.log(`[Supabase ✅] Saved education criteria in opportunity_education table for opportunity ${dbOpp.id}`);
              }
            } catch (eduEx) {
              console.warn(`[Supabase ⚠️] opportunity_education sync exception:`, eduEx.message);
            }
          }

          console.log(`[Supabase ✅] Opportunity saved in Supabase with ID: ${dbOpp.id}`);
        }
      } catch (err) {
        console.error(`[Supabase ❌ Exception]:`, err.message);
      }
    }

    memoryOpportunities.set(newOpportunity.id, newOpportunity);
    return newOpportunity;
  },

  /**
   * Get all opportunities for employer or student portal
   */
  async getAllOpportunities(employerId, filter = {}) {
    if (isSupabaseConfigured()) {
      try {
        let query = supabase
          .from('opportunities')
          .select(`*, opportunity_skills (*), opportunity_education (*)`)
          .order('created_at', { ascending: false });

        if (employerId) {
          query = query.eq('employer_id', employerId);
        }
        if (filter.status && filter.status !== 'ALL') {
          query = query.eq('status', filter.status);
        }
        if (filter.type && filter.type !== 'ALL') {
          query = query.eq('opportunity_type', filter.type);
        }

        const { data: dbList, error } = await query;
        if (dbList && !error) {
          const freshList = [];
          dbList.forEach(item => {
            const edu = item.opportunity_education?.[0] || item.education || {
              qualification: item.minimum_qualification || 'B.Tech',
              branches: item.branches || ['Computer Science & Engineering', 'Information Technology'],
              academic_year: item.academic_year || '3rd Year',
              minimum_cgpa: item.minimum_cgpa ? Number(item.minimum_cgpa) : 6.5
            };

            const formatted = {
              ...item,
              education: edu,
              skills: item.opportunity_skills || item.skills || [],
              applications_count: item.applications_count || 0
            };
            memoryOpportunities.set(item.id, formatted);
            freshList.push(formatted);
          });
          return freshList;
        }
      } catch (err) {
        console.warn("Supabase fetch notice:", err.message);
      }
    }

    let list = Array.from(memoryOpportunities.values());

    if (employerId) {
      list = list.filter(o => o.employer_id === employerId);
    }
    if (filter.type && filter.type !== 'ALL') {
      list = list.filter(o => o.opportunity_type === filter.type);
    }
    if (filter.status && filter.status !== 'ALL') {
      list = list.filter(o => o.status === filter.status);
    }

    return list;
  },

  /**
   * Get single opportunity by ID
   */
  async getOpportunityById(oppId) {
    if (isSupabaseConfigured()) {
      try {
        const { data: dbOpp, error } = await supabase
          .from('opportunities')
          .select(`*, opportunity_skills (*), opportunity_education (*)`)
          .eq('id', oppId)
          .single();

        if (dbOpp && !error) {
          const edu = dbOpp.opportunity_education?.[0] || dbOpp.education || {
            qualification: dbOpp.minimum_qualification || 'B.Tech',
            branches: dbOpp.branches || ['Computer Science & Engineering', 'Information Technology'],
            academic_year: dbOpp.academic_year || '3rd Year',
            minimum_cgpa: dbOpp.minimum_cgpa ? Number(dbOpp.minimum_cgpa) : 6.5
          };

          const formatted = {
            ...dbOpp,
            education: edu,
            skills: dbOpp.opportunity_skills || dbOpp.skills || [],
            applications_count: dbOpp.applications_count || 0
          };
          memoryOpportunities.set(formatted.id, formatted);
          return formatted;
        }
      } catch (err) {
        console.warn("Supabase single fetch notice:", err.message);
      }
    }

    if (memoryOpportunities.has(oppId)) {
      return memoryOpportunities.get(oppId);
    }

    return null;
  },


  /**
   * Update opportunity
   */
  async updateOpportunity(oppId, payload) {
    const existing = await this.getOpportunityById(oppId);
    if (!existing) return null;

    const updated = {
      ...existing,
      ...payload,
      updated_at: new Date().toISOString()
    };

    if (isSupabaseConfigured()) {
      try {
        await supabase
          .from('opportunities')
          .update({
            title: updated.title,
            description: updated.description,
            district: updated.district,
            work_mode: updated.work_mode,
            status: updated.status,
            updated_at: updated.updated_at
          })
          .eq('id', oppId);

        if (updated.education) {
          const branchesArr = Array.isArray(updated.education.branches)
            ? updated.education.branches
            : [updated.education.branches || 'Computer Science & Engineering'];

          await supabase
            .from('opportunity_education')
            .upsert({
              opportunity_id: oppId,
              qualification: updated.education.qualification || 'B.Tech',
              branches: branchesArr,
              academic_year: updated.education.academic_year || '4th Year / Graduating',
              minimum_cgpa: updated.education.minimum_cgpa ? Number(updated.education.minimum_cgpa) : null
            }, { onConflict: 'opportunity_id' });
        }
      } catch (err) {
        console.warn("Supabase update error:", err.message);
      }
    }

    memoryOpportunities.set(oppId, updated);
    return updated;
  },

  /**
   * Change Status: Publish or Close
   */
  async updateStatus(oppId, newStatus) {
    return this.updateOpportunity(oppId, { status: newStatus });
  },

  /**
   * Delete Opportunity (Drafts)
   */
  async deleteOpportunity(oppId) {
    if (isSupabaseConfigured()) {
      try {
        await supabase.from('opportunities').delete().eq('id', oppId);
      } catch (err) {
        console.warn("Supabase delete error:", err.message);
      }
    }
    return memoryOpportunities.delete(oppId);
  }
};
