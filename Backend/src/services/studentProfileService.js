import { supabase, isSupabaseConfigured } from '../config/supabase.js';
import { normalizeSkillList } from '../utils/skillNormalizer.js';

// In-Memory Persistent Store (Synchronized with Supabase)
let memoryProfileStore = new Map();

/**
 * Calculates Profile Completion Percentage dynamically
 * Personal: 20%, Education: 20%, Skills: 20%, Projects: 15%, Experience: 10%, Preferences: 15%
 */
export const calculateProfileCompletion = (profileData = {}) => {
  let score = 0;
  const personal = profileData.personal || {};
  const education = profileData.education || {};
  const skills = Array.isArray(profileData.skills) ? profileData.skills : [];
  const projects = Array.isArray(profileData.projects) ? profileData.projects : [];
  const experience = profileData.experience || {};
  const preferences = profileData.preferences || {};

  // Personal Info (20%)
  if (personal.full_name && personal.email && personal.phone && personal.city) {
    score += 20;
  } else if (personal.full_name && personal.email) {
    score += 10;
  }

  // Education (20%)
  if (education.degree && education.branch && education.college_name && education.current_year) {
    score += 20;
  } else if (education.degree && education.college_name) {
    score += 10;
  }

  // Skills (20%)
  if (skills.length >= 3) {
    score += 20;
  } else if (skills.length > 0) {
    score += 10;
  }

  // Projects (15%)
  if (projects.length >= 1 && projects[0].project_name) {
    score += 15;
  }

  // Experience (10%)
  if (experience.experience_type === 'fresher' || (experience.company_name && experience.role)) {
    score += 10;
  }

  // Preferences (15%)
  if (Array.isArray(preferences.preferred_roles) && preferences.preferred_roles.length > 0 &&
      Array.isArray(preferences.preferred_locations) && preferences.preferred_locations.length > 0) {
    score += 15;
  }

  return Math.min(score, 100);
};

export const StudentProfileService = {
  /**
   * Fetch complete student profile for authenticated user
   */
  async getProfile(userId) {
    // 1. Check Supabase DB first if configured
    if (isSupabaseConfigured()) {
      try {
        const { data: profile, error } = await supabase
          .from('student_profiles')
          .select(`
            *,
            student_skills (*),
            student_projects (*),
            student_experience (*),
            student_preferences (*)
          `)
          .eq('user_id', userId)
          .single();

        if (profile && !error) {
          const formatted = {
            id: profile.id,
            user_id: profile.user_id,
            personal: {
              full_name: profile.full_name || '',
              email: profile.email || '',
              phone: profile.phone || '',
              date_of_birth: profile.date_of_birth || '',
              gender: profile.gender || '',
              city: profile.city || '',
              state: profile.state || 'Rajasthan'
            },
            education: {
              highest_qualification: profile.highest_qualification || 'B.Tech',
              degree: profile.degree || '',
              branch: profile.branch || '',
              college_name: profile.college_name || '',
              current_year: profile.current_year || '3rd Year',
              graduation_year: profile.graduation_year || '2026',
              cgpa: profile.cgpa || ''
            },
            skills: profile.student_skills || [],
            projects: profile.student_projects || [],
            experience: profile.student_experience?.[0] || { experience_type: 'fresher' },
            preferences: profile.student_preferences?.[0] || {
              preferred_roles: ['Frontend Developer', 'React Developer'],
              preferred_locations: ['Jaipur', 'Remote'],
              work_mode: 'Hybrid',
              opportunity_type: 'Both'
            },
            profile_completion: profile.profile_completion || 0,
            updated_at: profile.updated_at,
            is_new: false
          };

          memoryProfileStore.set(userId, formatted);
          return formatted;
        }
      } catch (err) {
        console.warn("Supabase fetch notice:", err.message);
      }
    }

    // 2. Return from In-Memory synchronized store
    if (memoryProfileStore.has(userId)) {
      return memoryProfileStore.get(userId);
    }

    // Default initialized empty profile structure
    const emptyProfile = {
      id: `sp-${userId}`,
      user_id: userId,
      personal: {
        full_name: '',
        email: '',
        phone: '',
        date_of_birth: '',
        gender: '',
        city: '',
        state: 'Rajasthan'
      },
      education: {
        highest_qualification: 'B.Tech',
        degree: '',
        branch: '',
        college_name: '',
        current_year: '3rd Year',
        graduation_year: '2026',
        cgpa: ''
      },
      skills: [],
      projects: [],
      experience: {
        experience_type: 'fresher'
      },
      preferences: {
        preferred_roles: ['Frontend Developer', 'React Developer'],
        preferred_locations: ['Jaipur', 'Remote'],
        work_mode: 'Hybrid',
        opportunity_type: 'Both'
      },
      profile_completion: 0,
      updated_at: new Date().toISOString(),
      is_new: true
    };

    return emptyProfile;
  },

  /**
   * Save or Update complete student profile to Supabase & Synchronized Store
   */
  async saveProfile(userId, profilePayload) {
    const normalizedSkills = normalizeSkillList(profilePayload.skills || []);
    const completion = calculateProfileCompletion({
      ...profilePayload,
      skills: normalizedSkills
    });

    const completeProfile = {
      id: `sp-${userId}`,
      user_id: userId,
      personal: {
        full_name: profilePayload.personal?.full_name || '',
        email: profilePayload.personal?.email || '',
        phone: profilePayload.personal?.phone || '',
        date_of_birth: profilePayload.personal?.date_of_birth || null,
        gender: profilePayload.personal?.gender || null,
        city: profilePayload.personal?.city || '',
        state: profilePayload.personal?.state || 'Rajasthan'
      },
      education: {
        highest_qualification: profilePayload.education?.highest_qualification || 'B.Tech',
        degree: profilePayload.education?.degree || '',
        branch: profilePayload.education?.branch || '',
        college_name: profilePayload.education?.college_name || '',
        current_year: profilePayload.education?.current_year || '3rd Year',
        graduation_year: profilePayload.education?.graduation_year || '2026',
        cgpa: profilePayload.education?.cgpa || null
      },
      skills: normalizedSkills,
      projects: profilePayload.projects || [],
      experience: profilePayload.experience || { experience_type: 'fresher' },
      preferences: profilePayload.preferences || {
        preferred_roles: ['Frontend Developer'],
        preferred_locations: ['Jaipur', 'Remote'],
        work_mode: 'Hybrid',
        opportunity_type: 'Both'
      },
      profile_completion: completion,
      updated_at: new Date().toISOString(),
      is_new: false
    };

    // 1. Sync to Supabase if connected
    if (isSupabaseConfigured()) {
      try {
        console.log(`[Supabase ⏳] Syncing Career Passport for user: ${userId}`);

        // 1.1 Upsert student_profiles
        const { data: upsertedProfile, error: profileErr } = await supabase
          .from('student_profiles')
          .upsert({
            user_id: userId,
            full_name: completeProfile.personal.full_name,
            email: completeProfile.personal.email,
            phone: completeProfile.personal.phone,
            date_of_birth: completeProfile.personal.date_of_birth || null,
            gender: completeProfile.personal.gender || null,
            city: completeProfile.personal.city,
            state: completeProfile.personal.state,
            highest_qualification: completeProfile.education.highest_qualification,
            degree: completeProfile.education.degree,
            branch: completeProfile.education.branch,
            college_name: completeProfile.education.college_name,
            current_year: completeProfile.education.current_year,
            graduation_year: completeProfile.education.graduation_year,
            cgpa: completeProfile.education.cgpa ? parseFloat(completeProfile.education.cgpa) : null,
            profile_completion: completion,
            updated_at: completeProfile.updated_at
          }, { onConflict: 'user_id' })
          .select()
          .single();

        if (profileErr) {
          console.error(`[Supabase ❌ Error] student_profiles:`, profileErr.message);
        } else if (upsertedProfile) {
          const studentDbId = upsertedProfile.id;
          completeProfile.id = studentDbId;

          // 1.2 Upsert Skills
          if (normalizedSkills.length > 0) {
            await supabase.from('student_skills').delete().eq('student_id', studentDbId);
            const { error: skillErr } = await supabase.from('student_skills').insert(
              normalizedSkills.map(s => ({
                student_id: studentDbId,
                skill_name: s.skill_name,
                normalized_skill: s.normalized_skill,
                skill_level: s.skill_level || 'Intermediate',
                years_experience: s.years_experience || 1
              }))
            );
            if (skillErr) console.error(`[Supabase ❌ Error] student_skills:`, skillErr.message);
          }

          // 1.3 Upsert Projects
          if (completeProfile.projects.length > 0) {
            await supabase.from('student_projects').delete().eq('student_id', studentDbId);
            const { error: projErr } = await supabase.from('student_projects').insert(
              completeProfile.projects.map(p => ({
                student_id: studentDbId,
                project_name: p.project_name,
                description: p.description,
                technologies: Array.isArray(p.technologies) ? p.technologies : [p.technologies],
                project_url: p.project_url || null,
                github_url: p.github_url || null
              }))
            );
            if (projErr) console.error(`[Supabase ❌ Error] student_projects:`, projErr.message);
          }

          // 1.4 Upsert Experience
          if (completeProfile.experience) {
            await supabase.from('student_experience').delete().eq('student_id', studentDbId);
            const { error: expErr } = await supabase.from('student_experience').insert({
              student_id: studentDbId,
              experience_type: completeProfile.experience.experience_type || 'fresher',
              company_name: completeProfile.experience.company_name || null,
              role: completeProfile.experience.role || null,
              start_date: completeProfile.experience.start_date || null,
              end_date: completeProfile.experience.end_date || null,
              is_current: Boolean(completeProfile.experience.is_current),
              description: completeProfile.experience.description || null
            });
            if (expErr) console.error(`[Supabase ❌ Error] student_experience:`, expErr.message);
          }

          // 1.5 Upsert Preferences
          if (completeProfile.preferences) {
            const { error: prefErr } = await supabase.from('student_preferences').upsert({
              student_id: studentDbId,
              preferred_roles: completeProfile.preferences.preferred_roles || [],
              preferred_locations: completeProfile.preferences.preferred_locations || [],
              work_mode: completeProfile.preferences.work_mode || 'Hybrid',
              opportunity_type: completeProfile.preferences.opportunity_type || 'Both',
              updated_at: completeProfile.updated_at
            }, { onConflict: 'student_id' });
            if (prefErr) console.error(`[Supabase ❌ Error] student_preferences:`, prefErr.message);
          }

          console.log(`[Supabase ✅] Successfully published & stored complete passport in Supabase (ID: ${studentDbId})`);
        }
      } catch (err) {
        console.error(`[Supabase ❌ Sync Exception]:`, err.message);
      }
    } else {
      console.log(`[Local Store] Supabase env not active. Saved in live memory store.`);
    }

    // 2. Persist in memory store
    memoryProfileStore.set(userId, completeProfile);
    return completeProfile;
  }
};
