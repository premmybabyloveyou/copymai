import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "./lib/supabase";
import { AppLayout } from "./layouts/AppLayout";
import { AuthPage } from "./pages/AuthPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ScanPage } from "./pages/ScanPage";
import { ResultsPage } from "./pages/ResultsPage";
import { ReportsPage } from "./pages/ReportsPage";
import { CommunityReportPage } from "./pages/CommunityReportPage";
import { PlansPage } from "./pages/PlansPage";
import { LandingPage } from "./pages/LandingPage";
import type { PageId, ScanRecord, UploadedWork } from "./types/app";

const publicPages: PageId[] = [
  "landing",
  "login",
  "register",
  "reset-password",
];

export default function App() {
  const [page, setPage] = useState<PageId>("landing");
  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [uploadedWork, setUploadedWork] = useState<UploadedWork | undefined>();
  const [selectedScan, setSelectedScan] = useState<ScanRecord | undefined>();

  useEffect(() => {
    let mounted = true;

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, nextSession) => {
        setSession(nextSession);
        setAuthReady(true);

        if (event === "PASSWORD_RECOVERY") {
          setPage("reset-password");
        }
      }
    );

    void supabase.auth.getSession().then(({ data, error }) => {
      if (!mounted) return;

      if (error) {
        console.error("Unable to load auth session:", error.message);
      }

      setSession(data.session);
      setAuthReady(true);
    });

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!authReady) return;

    if (session && page === "login") {
      setPage("dashboard");
    } else if (!session && !publicPages.includes(page)) {
      setPage("login");
    }
  }, [authReady, page, session]);

  async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Unable to sign out:", error.message);
      return;
    }

    setPage("landing");
  }

  if (!authReady) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f7f8fb] text-sm text-slate-500">
        กำลังตรวจสอบ session...
      </main>
    );
  }

  if (page === "landing") {
    return <LandingPage navigate={setPage} />;
  }

  if (page === "login" || page === "register" || page === "reset-password") {
    const authMode = page === "reset-password" ? "reset" : page;

    return (
      <AuthPage
        mode={authMode}
        switchMode={(mode) =>
          setPage(mode === "reset" ? "reset-password" : mode)
        }
        success={() => setPage("dashboard")}
        backToLanding={() => setPage("landing")}
      />
    );
  }

  if (!session) {
    return (
      <AuthPage
        mode="login"
        switchMode={(mode) =>
          setPage(mode === "reset" ? "reset-password" : mode)
        }
        success={() => setPage("dashboard")}
        backToLanding={() => setPage("landing")}
      />
    );
  }

  const displayName =
    String(session.user.user_metadata.display_name ?? "").trim() ||
    session.user.email ||
    "ผู้ใช้งาน";

  return (
    <AppLayout
      page={page}
      navigate={setPage}
      onLogout={() => void logout()}
      userName={displayName}
    >
      {page === "dashboard" && <DashboardPage navigate={setPage} />}

      {page === "scan" && (
        <ScanPage
          done={(work) => {
            setUploadedWork(work);
            setSelectedScan(undefined);
            setPage("results");
          }}
          navigate={setPage}
        />
      )}

      {page === "results" && (
        <ResultsPage
          back={() => setPage("scan")}
          navigate={setPage}
          uploadedWork={uploadedWork}
          scanRecord={selectedScan}
        />
      )}

      {page === "reports" && (
        <ReportsPage
          open={(scan) => {
            setUploadedWork(undefined);
            setSelectedScan(scan);
            setPage("results");
          }}
          navigate={setPage}
        />
      )}

      {page === "community-report" && (
        <CommunityReportPage navigate={setPage} />
      )}

      {page === "plans" && <PlansPage navigate={setPage} />}
    </AppLayout>
  );
}
