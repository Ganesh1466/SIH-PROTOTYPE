-- ====================================================================================
-- SUPABASE SQL SCHEMA & FAKE SEED DATA FOR RAJASTHAN GOVERNMENT ANALYTICS DASHBOARD
-- ====================================================================================
-- Description:
-- Run this SQL in your Supabase SQL Editor (Dashboard -> SQL Editor -> New Query -> Run)
-- It creates all required analytics tables, enables RLS with read/write access, 
-- and seeds rich, realistic fake data for Rajasthan districts, skills, and placements.
-- ====================================================================================

-- 1. TABLE: District Intelligence & Placements
CREATE TABLE IF NOT EXISTS public.government_district_analytics (
    id SERIAL PRIMARY KEY,
    district VARCHAR(100) NOT NULL UNIQUE,
    total_students INT DEFAULT 0,
    total_employers INT DEFAULT 0,
    total_jobs INT DEFAULT 0,
    total_internships INT DEFAULT 0,
    total_applications INT DEFAULT 0,
    total_placements INT DEFAULT 0,
    placement_rate NUMERIC(5,2) DEFAULT 0.0,
    talent_score INT DEFAULT 75,
    avg_stipend_inr INT DEFAULT 20000,
    top_sector VARCHAR(100) DEFAULT 'Information Technology',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABLE: Industry Skill Demand vs Student Availability
CREATE TABLE IF NOT EXISTS public.government_skill_analytics (
    id SERIAL PRIMARY KEY,
    skill_name VARCHAR(100) NOT NULL UNIQUE,
    employer_demand INT NOT NULL,      -- Percentage (0 - 100)
    student_availability INT NOT NULL, -- Percentage (0 - 100)
    skill_gap INT NOT NULL,            -- Difference (Demand - Availability)
    district VARCHAR(100) DEFAULT 'Rajasthan',
    priority VARCHAR(50) DEFAULT 'HIGH', -- CRITICAL, HIGH, MEDIUM, LOW
    category VARCHAR(100) DEFAULT 'Technical',
    recommendation TEXT,
    avg_salary_lpa NUMERIC(4,2) DEFAULT 6.5,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABLE: Recruitment Funnel & Conversion Tracking
CREATE TABLE IF NOT EXISTS public.government_funnel_analytics (
    id SERIAL PRIMARY KEY,
    period VARCHAR(50) NOT NULL UNIQUE,
    applications INT NOT NULL,
    shortlisted INT NOT NULL,
    interviews INT NOT NULL,
    selected INT NOT NULL,
    joined INT NOT NULL,
    conversion_rate VARCHAR(20) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABLE: College & Higher Education Institution Analytics
CREATE TABLE IF NOT EXISTS public.government_college_analytics (
    id SERIAL PRIMARY KEY,
    college_name VARCHAR(200) NOT NULL UNIQUE,
    district VARCHAR(100) NOT NULL,
    tier VARCHAR(20) DEFAULT 'Tier 1',
    naac_grade VARCHAR(10) DEFAULT 'A++',
    total_enrolled INT DEFAULT 1000,
    placed_students INT DEFAULT 800,
    placement_rate NUMERIC(5,2) DEFAULT 80.0,
    avg_package_lpa NUMERIC(4,2) DEFAULT 7.2,
    top_hiring_company VARCHAR(150) DEFAULT 'TechNova Solutions',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABLE: Sector-wise Placement Distribution (For Donut/Pie Charts)
CREATE TABLE IF NOT EXISTS public.government_placement_sectors (
    id SERIAL PRIMARY KEY,
    sector VARCHAR(100) NOT NULL UNIQUE,
    hired_count INT NOT NULL,
    percentage NUMERIC(5,2) NOT NULL,
    avg_package_lpa NUMERIC(4,2) NOT NULL,
    growth_rate VARCHAR(20) DEFAULT '+15%',
    color_code VARCHAR(30) DEFAULT '#38bdf8',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TABLE: Government Recommendations & Skill Development Programs
CREATE TABLE IF NOT EXISTS public.government_recommendations (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    target_cohort VARCHAR(200) NOT NULL,
    recommended_institutes TEXT NOT NULL,
    estimated_impact_students INT DEFAULT 1500,
    budget_allocated_lacs NUMERIC(6,2) DEFAULT 45.0,
    status VARCHAR(50) DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================================
-- ENABLE ROW LEVEL SECURITY (RLS) & OPEN POLICIES FOR PUBLIC DEMO / PROTOTYPE ACCESS
-- ====================================================================================
ALTER TABLE public.government_district_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.government_skill_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.government_funnel_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.government_college_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.government_placement_sectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.government_recommendations ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Public read government_district_analytics" ON public.government_district_analytics;
    CREATE POLICY "Public read government_district_analytics" ON public.government_district_analytics FOR SELECT USING (true);
    CREATE POLICY "Public insert government_district_analytics" ON public.government_district_analytics FOR INSERT WITH CHECK (true);
    CREATE POLICY "Public update government_district_analytics" ON public.government_district_analytics FOR UPDATE USING (true);

    DROP POLICY IF EXISTS "Public read government_skill_analytics" ON public.government_skill_analytics;
    CREATE POLICY "Public read government_skill_analytics" ON public.government_skill_analytics FOR SELECT USING (true);
    CREATE POLICY "Public insert government_skill_analytics" ON public.government_skill_analytics FOR INSERT WITH CHECK (true);

    DROP POLICY IF EXISTS "Public read government_funnel_analytics" ON public.government_funnel_analytics;
    CREATE POLICY "Public read government_funnel_analytics" ON public.government_funnel_analytics FOR SELECT USING (true);
    CREATE POLICY "Public insert government_funnel_analytics" ON public.government_funnel_analytics FOR INSERT WITH CHECK (true);

    DROP POLICY IF EXISTS "Public read government_college_analytics" ON public.government_college_analytics;
    CREATE POLICY "Public read government_college_analytics" ON public.government_college_analytics FOR SELECT USING (true);

    DROP POLICY IF EXISTS "Public read government_placement_sectors" ON public.government_placement_sectors;
    CREATE POLICY "Public read government_placement_sectors" ON public.government_placement_sectors FOR SELECT USING (true);

    DROP POLICY IF EXISTS "Public read government_recommendations" ON public.government_recommendations;
    CREATE POLICY "Public read government_recommendations" ON public.government_recommendations FOR ALL USING (true);
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Policies initialized';
END $$;

-- ====================================================================================
-- SEED DATA: 1. RAJASTHAN DISTRICT ANALYTICS
-- ====================================================================================
INSERT INTO public.government_district_analytics 
(district, total_students, total_employers, total_jobs, total_internships, total_applications, total_placements, placement_rate, talent_score, avg_stipend_inr, top_sector)
VALUES
('Jaipur', 5840, 345, 1420, 580, 7250, 890, 86.40, 94, 25000, 'Cloud Software & SaaS'),
('Jodhpur', 3420, 210, 820, 360, 4650, 610, 83.20, 88, 22000, 'FinTech & Solar IoT'),
('Kota', 4150, 235, 940, 430, 5600, 720, 84.80, 91, 21000, 'EdTech & Automation'),
('Udaipur', 2890, 168, 640, 290, 3820, 480, 82.10, 84, 19500, 'Data Science & Mining Tech'),
('Ajmer', 2450, 142, 510, 230, 3180, 390, 80.50, 81, 18000, 'E-Commerce & Logistics'),
('Bikaner', 1980, 115, 410, 180, 2540, 310, 79.10, 78, 17500, 'AgriTech & Renewable Energy'),
('Alwar', 2650, 158, 580, 260, 3410, 440, 81.30, 83, 20000, 'Industrial IoT & Robotics'),
('Sikar', 2280, 130, 480, 210, 2980, 360, 79.90, 80, 18500, 'Healthcare IT & QA')
ON CONFLICT (district) DO UPDATE SET
    total_students = EXCLUDED.total_students,
    total_employers = EXCLUDED.total_employers,
    total_jobs = EXCLUDED.total_jobs,
    total_internships = EXCLUDED.total_internships,
    total_applications = EXCLUDED.total_applications,
    total_placements = EXCLUDED.total_placements,
    placement_rate = EXCLUDED.placement_rate,
    talent_score = EXCLUDED.talent_score;

-- ====================================================================================
-- SEED DATA: 2. SKILL GAP INTELLIGENCE (DEMAND VS AVAILABILITY)
-- ====================================================================================
INSERT INTO public.government_skill_analytics 
(skill_name, employer_demand, student_availability, skill_gap, district, priority, category, recommendation, avg_salary_lpa)
VALUES
('React.js / Next.js', 88, 42, 46, 'Rajasthan', 'CRITICAL', 'Frontend Frameworks', 'Launch State Advanced Frontend & Next.js Full Stack Academy', 8.5),
('Node.js & Microservices', 76, 38, 38, 'Rajasthan', 'HIGH', 'Backend Architecture', 'State Cloud Microservices & Distributed Backend Bootcamp', 8.0),
('AWS Cloud Architecture', 82, 22, 60, 'Rajasthan', 'CRITICAL', 'Cloud Infrastructure', 'Sponsored AWS Cloud Architect & Solution Practitioner Track', 10.2),
('Cyber Security & SOC', 68, 18, 50, 'Rajasthan', 'CRITICAL', 'Information Security', 'State SOC Defense Lab & Ethical Hacking Certification', 9.4),
('Docker & Kubernetes', 64, 15, 49, 'Rajasthan', 'CRITICAL', 'DevOps & SRE', 'Statewide DevOps Containerization and CI/CD Labs', 9.8),
('AI / Machine Learning', 85, 30, 55, 'Rajasthan', 'CRITICAL', 'Artificial Intelligence', 'Rajasthan Applied AI, NLP & Large Language Models Cohort', 12.0),
('Data Analytics & BI', 72, 34, 38, 'Rajasthan', 'HIGH', 'Data Science', 'Statewide PowerBI, Tableau & Enterprise SQL Certification', 7.5),
('Python Automation', 70, 58, 12, 'Rajasthan', 'LOW', 'Core Scripting', 'Advanced Applied Python for System Scripting & APIs', 6.8),
('PostgreSQL & Redis', 65, 44, 21, 'Rajasthan', 'MEDIUM', 'Database Engineering', 'Enterprise Database Architecture & Caching Optimization', 7.2),
('Mobile App Dev (Flutter)', 58, 28, 30, 'Rajasthan', 'HIGH', 'Mobile Engineering', 'Cross-Platform Mobile Application Development Track', 7.0)
ON CONFLICT (skill_name) DO UPDATE SET
    employer_demand = EXCLUDED.employer_demand,
    student_availability = EXCLUDED.student_availability,
    skill_gap = EXCLUDED.skill_gap,
    priority = EXCLUDED.priority,
    recommendation = EXCLUDED.recommendation;

-- ====================================================================================
-- SEED DATA: 3. MULTI-MONTH RECRUITMENT FUNNEL
-- ====================================================================================
INSERT INTO public.government_funnel_analytics 
(period, applications, shortlisted, interviews, selected, joined, conversion_rate)
VALUES
('May 2026', 2800, 1250, 620, 270, 210, '7.50%'),
('June 2026', 3600, 1600, 810, 360, 290, '8.05%'),
('July 2026', 4500, 2050, 1020, 460, 380, '8.44%'),
('August 2026', 5800, 2750, 1380, 590, 510, '8.79%'),
('September 2026', 6400, 3100, 1550, 680, 600, '9.37%')
ON CONFLICT (period) DO UPDATE SET
    applications = EXCLUDED.applications,
    shortlisted = EXCLUDED.shortlisted,
    interviews = EXCLUDED.interviews,
    selected = EXCLUDED.selected,
    joined = EXCLUDED.joined,
    conversion_rate = EXCLUDED.conversion_rate;

-- ====================================================================================
-- SEED DATA: 4. SECTOR-WISE PLACEMENT BREAKDOWN (DONUT & PIE CHARTS)
-- ====================================================================================
INSERT INTO public.government_placement_sectors 
(sector, hired_count, percentage, avg_package_lpa, growth_rate, color_code)
VALUES
('Enterprise SaaS & Cloud', 1420, 34.50, 9.2, '+28%', '#38bdf8'),
('FinTech & Digital Banking', 980, 23.80, 8.6, '+18%', '#818cf8'),
('AI & Data Intelligence', 640, 15.60, 11.5, '+44%', '#c084fc'),
('E-Commerce & Logistics', 490, 11.90, 6.8, '+12%', '#34d399'),
('EdTech & Skill Tech', 320, 7.80, 6.2, '+8%', '#fbbf24'),
('Industrial IoT & Automation', 260, 6.40, 7.4, '+15%', '#f43f5e')
ON CONFLICT (sector) DO UPDATE SET
    hired_count = EXCLUDED.hired_count,
    percentage = EXCLUDED.percentage,
    avg_package_lpa = EXCLUDED.avg_package_lpa;

-- ====================================================================================
-- SEED DATA: 5. TOP RAJASTHAN INSTITUTES / COLLEGES ANALYTICS
-- ====================================================================================
INSERT INTO public.government_college_analytics 
(college_name, district, tier, naac_grade, total_enrolled, placed_students, placement_rate, avg_package_lpa, top_hiring_company)
VALUES
('MNIT Jaipur', 'Jaipur', 'Tier 1', 'A++', 1250, 1140, 91.20, 14.5, 'TechNova Solutions'),
('MBM Engineering College', 'Jodhpur', 'Tier 1', 'A+', 980, 840, 85.70, 9.8, 'InnovateX Technologies'),
('RTU Kota (University College of Engineering)', 'Kota', 'Tier 1', 'A', 1100, 930, 84.50, 8.6, 'Solvix Cloud Systems'),
('College of Technology and Engineering (CTAE)', 'Udaipur', 'Tier 2', 'A', 750, 610, 81.30, 7.9, 'DataStream Analytics'),
('Government Engineering College Ajmer', 'Ajmer', 'Tier 2', 'B++', 680, 520, 76.50, 6.8, 'CodeCraft Labs'),
('Government Engineering College Bikaner', 'Bikaner', 'Tier 2', 'B+', 590, 440, 74.60, 6.2, 'AgriTech Automation')
ON CONFLICT (college_name) DO UPDATE SET
    total_enrolled = EXCLUDED.total_enrolled,
    placed_students = EXCLUDED.placed_students,
    placement_rate = EXCLUDED.placement_rate,
    avg_package_lpa = EXCLUDED.avg_package_lpa;

-- ====================================================================================
-- SEED DATA: 6. GOVERNMENT RECOMMENDATIONS & ACTION PROGRAMS
-- ====================================================================================
INSERT INTO public.government_recommendations 
(title, target_cohort, recommended_institutes, estimated_impact_students, budget_allocated_lacs, status)
VALUES
('Rajasthan Statewide AWS & Cloud Practitioner Certification Drive', '3rd & 4th Year CS/IT Students', 'MNIT Jaipur, RTU Kota, MBM Jodhpur', 3200, 75.0, 'ACTIVE'),
('State Cybersecurity & SOC Analyst Defense Apprenticeship', 'Final Year Electronics & CSE', 'Government Engineering Colleges (Jaipur, Ajmer, Udaipur)', 1800, 50.0, 'ACTIVE'),
('Full-Stack Modern React & TypeScript Placement Accelerator', '2nd & 3rd Year Polytechnic & B.Tech', 'All Registered Technical Institutes in 8 Districts', 4500, 60.0, 'ACTIVE');

-- Done! Verify tables
SELECT 'government_district_analytics' as table_name, count(*) FROM public.government_district_analytics
UNION ALL
SELECT 'government_skill_analytics', count(*) FROM public.government_skill_analytics
UNION ALL
SELECT 'government_funnel_analytics', count(*) FROM public.government_funnel_analytics
UNION ALL
SELECT 'government_placement_sectors', count(*) FROM public.government_placement_sectors
UNION ALL
SELECT 'government_college_analytics', count(*) FROM public.government_college_analytics
UNION ALL
SELECT 'government_recommendations', count(*) FROM public.government_recommendations;
