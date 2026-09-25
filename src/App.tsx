import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/shell/AppShell';
import { OverviewPage } from '@/pages/OverviewPage';
import { AlertCenterPage } from '@/pages/AlertCenterPage';
import { AccessDeniedPage } from '@/pages/AccessDeniedPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { AuthProvider } from '@/providers/AuthProvider';
import { WorkspaceProvider } from '@/providers/WorkspaceProvider';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { RequireWorkspace } from '@/components/workspace/RequireWorkspace';
import { LandingPage } from '@/pages/LandingPage';
import { AuthPage } from '@/pages/AuthPage';
import { OnboardingPage } from '@/pages/OnboardingPage';
import { AddLocationPage, LocationDetailPage, LocationsPage } from '@/pages/LocationsPage';
import { ContentLibraryPage } from '@/pages/ContentLibraryPage';
import { CampaignsPage } from '@/pages/CampaignsPage';
import { SchedulePage } from '@/pages/SchedulePage';
import { MonitoringPage } from '@/pages/MonitoringPage';
import { ReportsPage } from '@/pages/ReportsPage';
import { TeamPage } from '@/pages/TeamPage';
import { OrganizationSettingsPage } from '@/pages/OrganizationSettingsPage';
import { BranchManagerPage } from '@/pages/BranchManagerPage';
import { ReportIssuePage } from '@/pages/ReportIssuePage';
import { ActivityPage } from '@/pages/ActivityPage';
import { HelpPage } from '@/pages/HelpPage';
import { BillingPage } from '@/pages/BillingPage';

export default function App() {
  return (
    <AuthProvider>
      <WorkspaceProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route path="/signup" element={<AuthPage mode="signup" />} />
          <Route element={<RequireAuth />}>
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route element={<RequireWorkspace />}>
            <Route element={<AppShell />}>
            <Route index element={<Navigate to="/overview" replace />} />
            <Route path="/overview" element={<OverviewPage />} />
            <Route path="/my-location" element={<BranchManagerPage />} />
            <Route path="/monitoring/alerts" element={<AlertCenterPage />} />
            <Route path="/access-denied" element={<AccessDeniedPage />} />
            <Route path="/not-found" element={<NotFoundPage />} />

            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/locations/new" element={<AddLocationPage />} />
            <Route path="/locations/:id" element={<LocationDetailPage />} />
            <Route path="/content" element={<ContentLibraryPage />} />
            <Route path="/campaigns" element={<CampaignsPage />} />
            <Route path="/campaigns/new" element={<CampaignsPage />} />
            <Route path="/campaigns/:id" element={<CampaignsPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/monitoring" element={<MonitoringPage />} />
            <Route path="/monitoring/activity" element={<ActivityPage />} />
            <Route path="/activity" element={<ActivityPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/settings" element={<OrganizationSettingsPage />} />
            <Route path="/settings/billing" element={<BillingPage />} />
            <Route path="/organization/team" element={<TeamPage />} />
            <Route path="/organization/settings" element={<OrganizationSettingsPage />} />
            <Route path="/my-location/report-issue" element={<ReportIssuePage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Route>
          </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      </WorkspaceProvider>
    </AuthProvider>
  );
}
