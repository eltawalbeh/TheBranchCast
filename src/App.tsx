import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/shell/AppShell';
import { OverviewPage } from '@/pages/OverviewPage';
import { MyLocationPage } from '@/pages/MyLocationPage';
import { AlertCenterPage } from '@/pages/AlertCenterPage';
import { AccessDeniedPage } from '@/pages/AccessDeniedPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { PlaceholderPage } from '@/pages/PlaceholderPage';
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
            <Route path="/my-location" element={<MyLocationPage />} />
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
            <Route path="/schedule" element={<PlaceholderPage />} />
            <Route path="/reports" element={<PlaceholderPage />} />
            <Route path="/team" element={<PlaceholderPage />} />
            <Route path="/settings" element={<PlaceholderPage />} />
            <Route path="/help" element={<PlaceholderPage />} />
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
