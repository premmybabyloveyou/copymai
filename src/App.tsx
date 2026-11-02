import { useState } from 'react';
import { AppLayout } from './layouts/AppLayout';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { ScanPage } from './pages/ScanPage';
import { ResultsPage } from './pages/ResultsPage';
import { ReportsPage } from './pages/ReportsPage';
import { CommunityReportPage } from './pages/CommunityReportPage';
import { PlansPage } from './pages/PlansPage';
import { LandingPage } from './pages/LandingPage';
import type { PageId, ScanRecord, UploadedWork } from './types/app';

export default function App() {
  const [page, setPage] = useState<PageId>('landing');
  const [uploadedWork, setUploadedWork] = useState<UploadedWork | undefined>();
  const [selectedScan, setSelectedScan] = useState<ScanRecord | undefined>();
  if (page === 'landing') return <LandingPage navigate={setPage} />;
  if (page === 'login' || page === 'register') {
    return <AuthPage mode={page} switchMode={setPage} success={() => setPage('dashboard')} backToLanding={() => setPage('landing')} />;
  }
  return (
    <AppLayout page={page} navigate={setPage}>
      {page === 'dashboard' && <DashboardPage navigate={setPage} />}
      {page === 'scan' && <ScanPage done={(work) => { setUploadedWork(work); setSelectedScan(undefined); setPage('results'); }} navigate={setPage} />}
      {page === 'results' && <ResultsPage back={() => setPage('scan')} navigate={setPage} uploadedWork={uploadedWork} scanRecord={selectedScan} />}
      {page === 'reports' && <ReportsPage open={(scan) => { setUploadedWork(undefined); setSelectedScan(scan); setPage('results'); }} navigate={setPage} />}
      {page === 'community-report' && <CommunityReportPage navigate={setPage} />}
      {page === 'plans' && <PlansPage navigate={setPage} />}
    </AppLayout>
  );
}
