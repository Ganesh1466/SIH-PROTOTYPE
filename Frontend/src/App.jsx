import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, ProtectedRoute } from './context/AuthContext';

// Unified Direct Portal Login
import { UnifiedLogin } from './pages/auth/UnifiedLogin';

// Layouts
import { StudentLayout } from './layouts/StudentLayout';
import { EmployerLayout } from './layouts/EmployerLayout';
import { GovernmentLayout } from './layouts/GovernmentLayout';

// Student Portal Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { CareerPassport } from './pages/student/CareerPassport';
import { JobListings } from './pages/student/JobListings';
import { JobDetail } from './pages/student/JobDetail';
import { SkillGapAnalysis } from './pages/student/SkillGapAnalysis';
import { LearningPath } from './pages/student/LearningPath';
import { ApplicationsTracker } from './pages/student/ApplicationsTracker';
import { StudentInterviews } from './pages/student/StudentInterviews';
import { NotificationCenter } from './pages/student/NotificationCenter';

// Employer Portal Pages
import { EmployerDashboard } from './pages/employer/EmployerDashboard';
import { EmployerJobs } from './pages/employer/EmployerJobs';
import { OpportunityChoice } from './pages/employer/OpportunityChoice';
import { CreateJobPost } from './pages/employer/CreateJobPost';
import { CreateInternshipPost } from './pages/employer/CreateInternshipPost';
import { CandidateRanking } from './pages/employer/CandidateRanking';
import { EmployerApplications } from './pages/employer/EmployerApplications';
import { EmployerInterviews } from './pages/employer/EmployerInterviews';
import { EmployerReports } from './pages/employer/EmployerReports';

// Government Portal Pages
import { GovernmentDashboard } from './pages/government/GovernmentDashboard';
import { DistrictIntelligence } from './pages/government/DistrictIntelligence';
import { SkillDemandIntelligence } from './pages/government/SkillDemandIntelligence';
import { CollegeAnalytics } from './pages/government/CollegeAnalytics';
import { PlacementAnalytics } from './pages/government/PlacementAnalytics';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#0F172A',
              color: '#F8FAFC',
              fontSize: '13px',
              fontWeight: '600',
              borderRadius: '10px',
              border: '1px solid #334155'
            }
          }}
        />
        
        <Routes>
          {/* Direct Unified Portal SSO Entry */}
          <Route path="/" element={<UnifiedLogin />} />
          <Route path="/login" element={<UnifiedLogin />} />
          <Route path="/student/login" element={<UnifiedLogin />} />
          <Route path="/employer/login" element={<UnifiedLogin />} />
          <Route path="/government/login" element={<UnifiedLogin />} />

          {/* Student Portal (Role: student only) */}
          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRole="student">
                <StudentLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/student/dashboard" replace />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="passport" element={<CareerPassport />} />
            <Route path="career-passport" element={<CareerPassport />} />
            <Route path="jobs" element={<JobListings />} />
            <Route path="jobs/:id" element={<JobDetail />} />
            <Route path="skill-gap" element={<SkillGapAnalysis />} />
            <Route path="learning-path" element={<LearningPath />} />
            <Route path="applications" element={<ApplicationsTracker />} />
            <Route path="interviews" element={<StudentInterviews />} />
            <Route path="notifications" element={<NotificationCenter />} />
          </Route>

          {/* Employer Portal (Role: employer only) */}
          <Route
            path="/employer"
            element={
              <ProtectedRoute allowedRole="employer">
                <EmployerLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/employer/dashboard" replace />} />
            <Route path="dashboard" element={<EmployerDashboard />} />
            <Route path="jobs" element={<EmployerJobs />} />
            <Route path="opportunities" element={<EmployerJobs />} />
            <Route path="post" element={<OpportunityChoice />} />
            <Route path="post/job" element={<CreateJobPost />} />
            <Route path="post/internship" element={<CreateInternshipPost />} />
            <Route path="jobs/create" element={<OpportunityChoice />} />
            <Route path="candidates" element={<CandidateRanking />} />
            <Route path="applications" element={<EmployerApplications />} />
            <Route path="interviews" element={<EmployerInterviews />} />
            <Route path="reports" element={<EmployerReports />} />
          </Route>

          {/* Government Portal (Role: government only) */}
          <Route
            path="/government"
            element={
              <ProtectedRoute allowedRole="government">
                <GovernmentLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/government/dashboard" replace />} />
            <Route path="dashboard" element={<GovernmentDashboard />} />
            <Route path="districts" element={<DistrictIntelligence />} />
            <Route path="skills" element={<SkillDemandIntelligence />} />
            <Route path="colleges" element={<CollegeAnalytics />} />
            <Route path="placements" element={<PlacementAnalytics />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
