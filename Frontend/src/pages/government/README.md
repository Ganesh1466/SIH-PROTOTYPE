# Government Panel — Rajasthan Employment & Skill Intelligence Portal

## Overview of Implemented Solution
A complete, enterprise-grade **Government/Admin Panel** has been built for the Rajasthan-focused employment and internship portal at `/government/dashboard`.

The system functions as a true **Employment Intelligence & Policy Governance Dashboard**, allowing the Directorate to monitor student supply, recruiter demand, conversion funnels, regional placement disparities, and critical skill deficits across Rajasthan.

---

## 🏛️ Key Capabilities Built

### 1. Government Dashboard (`/government/dashboard`)
- **8 KPI Macro Cards**:
  - Total Registered Students: **25,430** (across 33 districts)
  - Verified Employers: **1,240**
  - Active Jobs: **420**
  - Active Internships: **280**
  - Total Applications: **32,450**
  - Total Placements: **3,890**
  - Placement Rate: **81.5%**
  - Pending Approvals: **6**
- **Prototype Demo Data Badge**: Prominently displayed with live backend data fetching.
- **Employment Conversion Funnel**:
  - Interactive multi-stage visual funnel: `Applications (5,200) → Shortlisted (2,400) → Interviews (1,200) → Selected (510) → Joined (430)`.
  - Cohort selector for **June 2026**, **July 2026**, and **August 2026** with Recharts Area/Bar trends.
- **District Opportunities Comparison Graph**:
  - Interactive Bar chart with district filtering (Jaipur, Jodhpur, Kota, Udaipur, Ajmer, Bikaner, Alwar, Sikar).
- **Jobs vs. Internships Performance Graph**:
  - Composed bar comparison showing total volume and conversion rates (83.4% jobs placement vs 64.2% internship-to-PPO conversion).
- **Industry Skill Demand vs Student Availability Graph**:
  - Multi-bar chart comparing Employer Demand %, Student Availability %, and Skill Gap % across 10 key tech competencies.
- **🔴 Critical Skill Gaps Section**:
  - Highlights critical shortages in **AWS** (42% demand / 12% supply = 30% gap), **Docker** (35% / 8% = 27% gap), **React.js** (72% / 38% = 34% gap), and **Cyber Security** (32% / 10% = 22% gap).
  - **[+ Create Training Recommendation]** interactive modal to define and launch targeted state training bootcamps.

---

### 2. Full Sidebar Navigation & Module Suite

| Route | Module | Purpose |
|---|---|---|
| `/government/dashboard` | **Dashboard** | Rajasthan Employment Intelligence Dashboard & macro KPIs |
| `/government/employers` | **Employer Verification** | Verify, reject, suspend registered corporate entities (`VERIFIED`, `PENDING`, `REJECTED`, `SUSPENDED`) |
| `/government/opportunities` | **Opportunity Approvals** | Review and clear job/internship postings before they become live for students |
| `/government/students` | **Student Overview** | Privacy-compliant talent roster with 5-way filters (District, Degree, Branch, Year, Placement Status) |
| `/government/applications` | **Applications Monitor** | Statewide candidate pipeline & algorithmic match score tracking |
| `/government/placements` | **Placement Analytics** | Statutory placement rate formula (`Joined / Applications × 100`) & monthly trends |
| `/government/skills` | **Skill Gap Analytics** | 10-skill supply-demand matrix and policy recommendation launcher |
| `/government/districts` | **District Analytics** | Regional benchmark analytics across 8+ Rajasthan districts with CSV export |
| `/government/notifications` | **Notifications** | Create state announcements targeted by All, District, Skill, or Degree |
| `/government/reports` | **Reports** | 6 pre-built downloadable datasets with 1-click CSV export |
| `/government/settings` | **Settings** | Governance thresholds, match score requirements, and database sync status |

---

### 3. Backend REST APIs
- `GET /api/government/dashboard`
- `GET /api/government/districts`
- `GET /api/government/skills`
- `GET /api/government/funnel`
- `GET /api/government/employers`
- `PATCH /api/government/employers/:id/verify`
- `PATCH /api/government/employers/:id/reject`
- `PATCH /api/government/employers/:id/suspend`
- `GET /api/government/opportunities`
- `PATCH /api/government/opportunities/:id/approve`
- `PATCH /api/government/opportunities/:id/reject`
- `PATCH /api/government/opportunities/:id/suspend`
- `GET /api/government/students`
- `GET /api/government/placements`
- `GET /api/government/reports`
- `GET /api/government/notifications`
- `POST /api/government/notifications`
- `GET /api/government/recommendations`
- `POST /api/government/recommendations`

---

## Verification & Status
- **Backend**: Tested all 11 endpoints (`success: true`) on `http://localhost:5000`.
- **Frontend**: Tested Vite build (`npm run build`) with zero errors.
- **Access URL**: Available live at `http://localhost:5173/government/dashboard` (or via Unified Portal login under Government role: `rajgoverment@gmail.com`).
