import { useState, type ReactNode } from "react";
import {
  ClipboardList,
  FileSearch,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Sparkles,
  X,
} from "lucide-react";
import type { PageId } from "../types/app";

const links: { id: PageId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "ภาพรวม", icon: LayoutDashboard },
  { id: "scan", label: "ตรวจความคล้าย", icon: FileSearch },
  { id: "reports", label: "ผลการตรวจ", icon: ClipboardList },
  { id: "community-report", label: "แจ้งเบาะแส", icon: Plus },
  { id: "plans", label: "แพ็กเกจ", icon: Sparkles },
];

export function AppLayout({
  page,
  navigate,
  onLogout,
  userName,
  children,
}: {
  page: PageId;
  navigate: (page: PageId) => void;
  onLogout: () => void;
  userName: string;
  children: ReactNode;
}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const currentLabel = links.find((link) => link.id === page)?.label ?? page;

  return (
    <div className="min-h-screen bg-[#f7f8fb] font-sans text-[#14213d] lg:grid lg:grid-cols-[256px_minmax(0,1fr)]">
      <aside className="sticky top-0 z-20 bg-[#142d49] px-4 py-3 text-white shadow-sm sm:px-5 lg:flex lg:h-screen lg:min-h-screen lg:flex-col lg:px-5 lg:py-6">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              navigate("dashboard");
              setMobileNavOpen(false);
            }}
            className="flex w-fit items-center gap-2.5 text-left"
            aria-label="ไปหน้า Overview"
          >
            <img src="/copymai-logo.svg" alt="" className="size-9 shrink-0" />
            <span className="flex flex-col leading-tight">
              <b className="text-sm font-extrabold tracking-wide">COPYMAI</b>
              <small className="mt-0.5 text-[8px] font-medium tracking-[.14em] text-slate-300">
                COPYRIGHT INTELLIGENCE
              </small>
            </span>
          </button>
          <button
            type="button"
            onClick={() => setMobileNavOpen((open) => !open)}
            className="grid size-10 place-items-center rounded-xl border border-white/15 text-white transition hover:bg-white/10 lg:hidden"
            aria-label={mobileNavOpen ? "ปิดเมนู" : "เปิดเมนู"}
            aria-expanded={mobileNavOpen}
          >
            {mobileNavOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>

        <nav
          aria-label="เมนูหลัก"
          className={`${
            mobileNavOpen ? "mt-4 flex" : "hidden"
          } max-h-[calc(100dvh-4rem)] flex-col gap-1.5 overflow-y-auto overscroll-contain pb-1 lg:mt-9 lg:max-h-none lg:overflow-visible lg:flex lg:pb-0`}
        >
          {links.map(({ id, label, icon: Icon }) => (
            <button
              className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs font-medium transition sm:gap-3 lg:w-full lg:px-3.5 lg:py-3 ${
                page === id
                  ? "bg-white text-[#1f3768] shadow-sm"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
              key={id}
              onClick={() => {
                navigate(id);
                setMobileNavOpen(false);
              }}
              aria-current={page === id ? "page" : undefined}
            >
              <Icon size={17} strokeWidth={1.8} />
              <span>{label}</span>
            </button>
          ))}
          <div className="mt-2 border-t border-white/15 pt-3 lg:hidden">
            <div className="flex items-center gap-3 px-3 py-2">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-800">
                {userName.charAt(0).toUpperCase()}
              </span>
              <span className="min-w-0 text-xs">
                <b className="block truncate text-white">{userName}</b>
                <small className="mt-1 block text-[10px] text-slate-300">
                  Personal workspace
                </small>
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setMobileNavOpen(false);
                onLogout();
              }}
              className="mt-1 flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-xs font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <LogOut size={17} strokeWidth={1.8} />
              ออกจากระบบ
            </button>
          </div>
        </nav>

        <div className="relative mt-auto hidden border-t border-white/15 pt-5 lg:block">
          <button
            type="button"
            onClick={() => setProfileOpen((open) => !open)}
            className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-white/10"
            aria-haspopup="menu"
            aria-expanded={profileOpen}
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-800">
              {userName.charAt(0).toUpperCase()}
            </span>
            <span className="min-w-0 text-xs">
              <b className="block truncate">{userName}</b>
              <small className="mt-1 block text-[10px] text-slate-300">
                Personal workspace
              </small>
            </span>
          </button>
          {profileOpen && (
            <div
              role="menu"
              className="absolute bottom-full left-0 mb-2 w-full rounded-xl border border-slate-200 bg-white p-1.5 text-[#14213d] shadow-xl"
            >
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setProfileOpen(false);
                  setMobileNavOpen(false);
                  onLogout();
                }}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-xs font-medium text-slate-700 transition hover:bg-rose-50 hover:text-rose-700"
              >
                <LogOut size={15} />
                ออกจากระบบ
              </button>
            </div>
          )}
        </div>
      </aside>

      <main className="min-w-0">
        <header className="sticky top-0 z-10 flex min-h-14 items-center gap-2 border-b border-slate-200/80 bg-white/95 px-4 text-xs text-slate-500 backdrop-blur sm:px-6 lg:px-8">
          <span className="hidden sm:inline">Workspace</span>
          <span className="hidden text-slate-300 sm:inline">/</span>
          <b className="font-semibold text-[#1f3768]">{currentLabel}</b>
        </header>
        <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
          {children}
          <footer className="mt-8 border-t border-slate-200/70 pt-4 text-center text-[10px] leading-5 text-slate-400">
            Prototype · ผลคะแนนเป็นข้อมูลคัดกรอง ไม่ใช่ข้อสรุปทางกฎหมาย
          </footer>
        </div>
      </main>
    </div>
  );
}
