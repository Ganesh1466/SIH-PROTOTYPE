import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, ProtectedRoute } from './context/AuthContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { PageLoader } from './components/common/PageLoader';

// Layouts (Static for immediate scaffolding)
import { StudentLayout } from './layouts/StudentLayout';
import { EmployerLayout } from './layouts/EmployerLayout';
import { GovernmentLayout } from './layouts/GovernmentLayout';

// Unified Direct Portal Login (Lazy)
const UnifiedLogin = lazy(() => import('./pages/auth/UnifiedLogin').then(m => ({ default: m.UnifiedLogin })));

// Student Portal Pages (Lazy loaded on demand)
const StudentDashboard = lazy(() => import('./pages/student/StudentDashboard').then(m => ({ default: m.StudentDashboard })));
const CareerPassport = lazy(() => import('./pages/student/CareerPassport').then(m => ({ default: m.CareerPassport })));
const JobListings = lazy(() => import('./pages/student/JobListings').then(m => ({ default: m.JobListings })));
const JobDetail = lazy(() => import('./pages/student/JobDetail').then(m => ({ default: m.JobDetail })));
const SkillGapAnalysis = lazy(() => import('./pages/student/SkillGapAnalysis').then(m => ({ default: m.SkillGapAnalysis })));
const LearningPath = lazy(() => import('./pages/student/LearningPath').then(m => ({ default: m.LearningPath })));
const ApplicationsTracker = lazy(() => import('./pages/student/ApplicationsTracker').then(m => ({ default: m.ApplicationsTracker })));
const StudentInterviews = lazy(() => import('./pages/student/StudentInterviews').then(m => ({ default: m.StudentInterviews })));
const NotificationCenter = lazy(() => import('./pages/student/NotificationCenter').then(m => ({ default: m.NotificationCenter })));

// Employer Portal Pages (Lazy loaded on demand)
const EmployerDashboard = lazy(() => import('./pages/employer/EmployerDashboard').then(m => ({ default: m.EmployerDashboard })));
const EmployerJobs = lazy(() => import('./pages/employer/EmployerJobs').then(m => ({ default: m.EmployerJobs })));
const OpportunityChoice = lazy(() => import('./pages/employer/OpportunityChoice').then(m => ({ default: m.OpportunityChoice })));
const CreateJobPost = lazy(() => import('./pages/employer/CreateJobPost').then(m => ({ default: m.CreateJobPost })));
const CreateInternshipPost = lazy(() => import('./pages/employer/CreateInternshipPost').then(m => ({ default: m.CreateInternshipPost })));
const CandidateRanking = lazy(() => import('./pages/employer/CandidateRanking').then(m => ({ default: m.CandidateRanking })));
const EmployerApplications = lazy(() => import('./pages/employer/EmployerApplications').then(m => ({ default: m.EmployerApplications })));
const EmployerInterviews = lazy(() => import('./pages/employer/EmployerInterviews').then(m => ({ default: m.EmployerInterviews })));
const EmployerReports = lazy(() => import('./pages/employer/EmployerReports').then(m => ({ default: m.EmployerReports })));

// Government Portal Pages (Lazy loaded on demand)
const GovernmentDashboard = lazy(() => import('./pages/government/GovernmentDashboard').then(m => ({ default: m.GovernmentDashboard })));
const GovernmentEmployers = lazy(() => import('./pages/government/GovernmentEmployers').then(m => ({ default: m.GovernmentEmployers })));
const GovernmentOpportunities = lazy(() => import('./pages/government/GovernmentOpportunities').then(m => ({ default: m.GovernmentOpportunities })));
const GovernmentStudents = lazy(() => import('./pages/government/GovernmentStudents').then(m => ({ default: m.GovernmentStudents })));
const GovernmentApplications = lazy(() => import('./pages/government/GovernmentApplications').then(m => ({ default: m.GovernmentApplications })));
const PlacementAnalytics = lazy(() => import('./pages/government/PlacementAnalytics').then(m => ({ default: m.PlacementAnalytics })));
const SkillDemandIntelligence = lazy(() => import('./pages/government/SkillDemandIntelligence').then(m => ({ default: m.SkillDemandIntelligence })));
const DistrictIntelligence = lazy(() => import('./pages/government/DistrictIntelligence').then(m => ({ default: m.DistrictIntelligence })));
const CollegeAnalytics = lazy(() => import('./pages/government/CollegeAnalytics').then(m => ({ default: m.CollegeAnalytics })));
const GovernmentNotifications = lazy(() => import('./pages/government/GovernmentNotifications').then(m => ({ default: m.GovernmentNotifications })));
const GovernmentReports = lazy(() => import('./pages/government/GovernmentReports').then(m => ({ default: m.GovernmentReports })));
const GovernmentSettings = lazy(() => import('./pages/government/GovernmentSettings').then(m => ({ default: m.GovernmentSettings })));

function App() {
  return (
    <ErrorBoundary>
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
          
          <Suspense fallback={<PageLoader />}>
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
                <Route path="employers" element={<GovernmentEmployers />} />
                <Route path="opportunities" element={<GovernmentOpportunities />} />
                <Route path="students" element={<GovernmentStudents />} />
                <Route path="applications" element={<GovernmentApplications />} />
                <Route path="placements" element={<PlacementAnalytics />} />
                <Route path="skills" element={<SkillDemandIntelligence />} />
                <Route path="districts" element={<DistrictIntelligence />} />
                <Route path="colleges" element={<CollegeAnalytics />} />
                <Route path="notifications" element={<GovernmentNotifications />} />
                <Route path="reports" element={<GovernmentReports />} />
                <Route path="settings" element={<GovernmentSettings />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;

