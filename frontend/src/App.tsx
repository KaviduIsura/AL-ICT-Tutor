import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layout
import { AppLayout } from './components/layout/AppLayout';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { ForgotPasswordPage } from './pages/public/ForgotPasswordPage';
import { PrivacyPage } from './pages/public/PrivacyPage';

// Student Pages
import { StudentDashboard } from './pages/student/Dashboard';
import { UnitDetailPage } from './pages/student/UnitDetailPage';
import { ChatPage } from './pages/student/ChatPage';
import { QuizSetupPage } from './pages/student/QuizSetupPage';
import { QuizRunnerPage } from './pages/student/QuizRunnerPage';
import { QuizResultPage } from './pages/student/QuizResultPage';
import { PastPapersPage } from './pages/student/PastPapersPage';
import { ProgressPage } from './pages/student/ProgressPage';
import { MistakesPage } from './pages/student/MistakesPage';
import { FlashcardsPage } from './pages/student/FlashcardsPage';
import { GlossaryPage } from './pages/student/GlossaryPage';
import { PlannerPage } from './pages/student/PlannerPage';

// Teacher Pages
import { TeacherDashboard } from './pages/teacher/TeacherDashboard';
import { ContentUploadPage } from './pages/teacher/ContentUploadPage';
import { ReviewQueuePage } from './pages/teacher/ReviewQueuePage';
import { MarkOverridePage } from './pages/teacher/MarkOverridePage';
import { ClassAnalyticsPage } from './pages/teacher/ClassAnalyticsPage';
import { ClassRosterPage } from './pages/teacher/ClassRosterPage';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { UserManagementPage } from './pages/admin/UserManagementPage';
import { CurriculumManagerPage } from './pages/admin/CurriculumManagerPage';
import { PromptVersionsPage } from './pages/admin/PromptVersionsPage';
import { QualityDashboardPage } from './pages/admin/QualityDashboardPage';
import { SystemSettingsPage } from './pages/admin/SystemSettingsPage';
import { AuditLogsPage } from './pages/admin/AuditLogsPage';

// Shared Pages
import { SettingsPage } from './pages/shared/SettingsPage';
import { HelpPage } from './pages/shared/HelpPage';
import { NotFoundPage } from './pages/shared/NotFoundPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot" element={<ForgotPasswordPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />

        {/* Authenticated Portals Shell */}
        <Route element={<AppLayout />}>
          {/* Student Portal */}
          <Route path="/app" element={<StudentDashboard />} />
          <Route path="/units/:id" element={<UnitDetailPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/quiz/new" element={<QuizSetupPage />} />
          <Route path="/quiz/run" element={<QuizRunnerPage />} />
          <Route path="/quiz/result" element={<QuizResultPage />} />
          <Route path="/past-papers" element={<PastPapersPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/mistakes" element={<MistakesPage />} />
          <Route path="/flashcards" element={<FlashcardsPage />} />
          <Route path="/glossary" element={<GlossaryPage />} />
          <Route path="/planner" element={<PlannerPage />} />

          {/* Teacher Portal */}
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/teacher/content" element={<ContentUploadPage />} />
          <Route path="/teacher/review" element={<ReviewQueuePage />} />
          <Route path="/teacher/marks" element={<MarkOverridePage />} />
          <Route path="/teacher/analytics" element={<ClassAnalyticsPage />} />
          <Route path="/teacher/classes" element={<ClassRosterPage />} />

          {/* Admin Portal */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagementPage />} />
          <Route path="/admin/curriculum" element={<CurriculumManagerPage />} />
          <Route path="/admin/prompts" element={<PromptVersionsPage />} />
          <Route path="/admin/quality" element={<QualityDashboardPage />} />
          <Route path="/admin/settings" element={<SystemSettingsPage />} />
          <Route path="/admin/audit" element={<AuditLogsPage />} />

          {/* Shared Routes */}
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/help" element={<HelpPage />} />
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
