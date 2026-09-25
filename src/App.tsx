import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/shell/AppShell';
import { OverviewPage } from '@/pages/OverviewPage';
import { MyLocationPage } from '@/pages/MyLocationPage';
import { AlertCenterPage } from '@/pages/AlertCenterPage';
import { AccessDeniedPage } from '@/pages/AccessDeniedPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { PlaceholderPage } from '@/pages/PlaceholderPage';
import { AuthProvider } from '@/providers/AuthProvider';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<Navigate to="/overview" replace />} />
            <Route path="/overview" element={<OverviewPage />} />
            <Route path="/my-location" element={<MyLocationPage />} />
            <Route path="/monitoring/alerts" element={<AlertCenterPage />} />
            <Route path="/access-denied" element={<AccessDeniedPage />} />
            <Route path="/not-found" element={<NotFoundPage />} />

            <Route path="/locations" element={<PlaceholderPage />} />
            <Route path="/locations/new" element={<PlaceholderPage />} />
            <Route path="/locations/:id/*" element={<PlaceholderPage />} />
            <Route path="/content" element={<PlaceholderPage />} />
            <Route path="/campaigns" element={<PlaceholderPage />} />
            <Route path="/campaigns/new" element={<PlaceholderPage />} />
            <Route path="/campaigns/:id" element={<PlaceholderPage />} />
            <Route path="/schedule" element={<PlaceholderPage />} />
            <Route path="/reports" element={<PlaceholderPage />} />
            <Route path="/team" element={<PlaceholderPage />} />
            <Route path="/settings" element={<PlaceholderPage />} />
            <Route path="/help" element={<PlaceholderPage />} />
            <Route path="/login" element={<PlaceholderPage />} />

            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
