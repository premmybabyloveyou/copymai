import {
    ArrowRight,
    BellRing,
    FileSearch,
    Fingerprint,
    Menu,
    ScanSearch,
    ShieldCheck,
    Sparkles,
    X,
  } from "lucide-react";
  import { useState } from "react";
  import type { PageId } from "../types/app";

  const plans = [
    {
      name: "Basic Personal",
      audience: "ผู้ใช้งานทั่วไป",
      detail: "เริ่มตรวจสอบผลงานทีละชิ้น",
      action: "เริ่มใช้ฟรี",
    },
    {
      name: "Author",
      audience: "นักเขียน ศิลปิน และผู้สร้างสรรค์",
      detail: "พื้นที่จัดการผลงานและตรวจสอบที่มากขึ้น",
      action: "เลือกแพลน",
    },
    {
      name: "Pro Company",
      audience: "บริษัทและทีมกฎหมาย",
      detail: "ติดตามการใช้งานและทำงานร่วมกันเป็นทีม",
      action: "เลือกแพลน",
      featured: true,
    },
    {
      name: "Pro Max Company",
      audience: "องค์กรที่ต้องการความปลอดภัยสูง",
      detail: "รองรับ Ground Truth ภายในองค์กร",
      action: "ติดต่อเรา",
    },
  ];

  export function LandingPage({
    navigate,
  }: {
    navigate: (page: PageId) => void;
  }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
      <main className="min-h-screen overflow-hidden bg-[#f7f8fb] font-sans text-[#14213d]">
        <header className="relative z-20 mx-auto grid min-h-[68px] w-full max-w-[1600px] grid-cols-[1fr_auto] items-center px-4 sm:min-h-[76px] sm:px-8 lg:grid-cols-[1fr_auto_1fr] lg:px-12">
          <a
            href="#top"
            className="flex items-center gap-2 justify-self-start sm:gap-3"
            aria-label="COPYMAI หน้าหลัก"
          >
            <img src="/copymai-logo.svg" alt="" className="size-9 sm:size-10" />
            <span className="flex flex-col leading-tight">
              <span className="text-lg font-black tracking-[-0.04em] text-[#1f3768] sm:text-xl">
                COPYMAI
              </span>
              <small className="mt-0.5 text-[8px] font-medium tracking-[.14em] text-slate-500 sm:text-[9px]">
                COPYRIGHT INTELLIGENCE
              </small>
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 lg:flex">
            <a className="transition hover:text-[#1f3768]" href="#features">
              ความสามารถ
            </a>
            <a className="transition hover:text-[#1f3768]" href="#plans">
              แพ็กเกจ
            </a>
            <a className="transition hover:text-[#1f3768]" href="#how-it-works">
              วิธีใช้งาน
            </a>
          </nav>

          <div className="flex items-center justify-self-end gap-1.5 sm:gap-3 lg:col-start-3">
            <button
              type="button"
              onClick={() => navigate("login")}
              className="hidden rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white sm:block"
            >
              เข้าสู่ระบบ
            </button>

            <button
              type="button"
              onClick={() => navigate("register")}
              className="flex items-center gap-1.5 rounded-xl bg-[#1f3768] px-3 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-950/15 transition hover:bg-[#182c55] sm:gap-2 sm:px-4 sm:text-sm"
            >
              <span className="sm:hidden">เริ่มใช้</span>
              <span className="hidden sm:inline">ทดลองใช้งาน</span>
              <ArrowRight size={15} />
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "ปิดเมนู" : "เปิดเมนู"}
              aria-expanded={menuOpen}
              className="grid size-10 place-items-center rounded-xl border border-slate-200 bg-white text-[#1f3768] lg:hidden"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {menuOpen && (
            <nav className="absolute left-4 right-4 top-[calc(100%-4px)] grid gap-1 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl lg:hidden">
              {[
                ["ความสามารถ", "#features"],
                ["แพ็กเกจ", "#plans"],
                ["วิธีใช้งาน", "#how-it-works"],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  {label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  navigate("login");
                }}
                className="rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                เข้าสู่ระบบ
              </button>
            </nav>
          )}
        </header>

        <section
          id="features"
          className="scroll-mt-6 border-y border-[#dce8e8] bg-gradient-to-b from-[#edf5f4] via-white to-[#f7f8fb] py-16 sm:py-24"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#dce8e8] bg-white px-3.5 py-2 text-[10px] font-bold tracking-wide text-[#17877e] shadow-sm sm:text-xs">
                <Sparkles size={14} />
                COPYRIGHT TOOLS FOR CREATORS
              </span>

              <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-[#14213d] sm:text-5xl">
                เครื่องมือดูแลผลงาน
                <br className="hidden sm:block" />
                <span className="text-[#17877e]">สำหรับทุกขั้นตอน</span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                ตั้งแต่ตรวจสอบผลงานก่อนเตรียมยื่นต่อกรมทรัพย์สินทางปัญญา
                ไปจนถึงรวบรวมข้อมูลเมื่อพบผลงานที่อาจคล้ายกัน
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  icon: ScanSearch,
                  title: "ตรวจสอบความคล้าย",
                  text: "เปรียบเทียบผลงานกับข้อมูลอ้างอิง เพื่อคัดกรองรายการที่ควรตรวจสอบต่อ",
                },
                {
                  icon: FileSearch,
                  title: "เตรียมผลงานก่อนยื่น DIP",
                  text: "ช่วยให้ผู้สร้างสรรค์ตรวจดูผลงานและข้อมูลเบื้องต้นก่อนเตรียมยื่นจดแจ้ง",
                },
                {
                  icon: BellRing,
                  title: "ติดตามและแจ้งเบาะแส",
                  text: "บันทึกรายการที่พบ พร้อมส่งข้อมูลให้เจ้าของผลงานนำไปตรวจสอบต่อ",
                },
                {
                  icon: Fingerprint,
                  title: "จัดเก็บข้อมูลผลงาน",
                  text: "รวมรายละเอียดผลงานและข้อมูลประกอบไว้ในพื้นที่ทำงานเดียวกัน",
                },
              ].map(({ icon: Icon, title, text }, index) => (
                <article
                  key={title}
                  className={`rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:p-6 ${
                    index === 1
                      ? "border-[#17877e]/40 ring-4 ring-[#17877e]/5"
                      : "border-slate-200"
                  }`}
                >
                  <span className="grid size-12 place-items-center rounded-2xl bg-[#e9f5f2] text-[#17877e]">
                    <Icon size={22} />
                  </span>

                  <h2 className="mt-5 text-base font-bold text-[#203954]">
                    {title}
                  </h2>
                  <p className="mt-2 min-h-[72px] text-sm leading-6 text-slate-500">
                    {text}
                  </p>

                  <button
                    type="button"
                    onClick={() => navigate("register")}
                    className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#1f3768] transition hover:text-[#17877e]"
                  >
                    ทดลองใช้งาน <ArrowRight size={14} />
                  </button>
                </article>
              ))}
            </div>

            <p className="mt-7 text-center text-[10px] leading-5 text-slate-400">
              ผลการตรวจเป็นข้อมูลคัดกรองเบื้องต้น ไม่ใช่ข้อสรุปทางกฎหมาย
              และไม่รับประกันผลการจดแจ้ง
            </p>
          </div>
        </section>

        <section
          id="plans"
          className="scroll-mt-6 border-y border-slate-200 bg-[#f1f5fa] py-16 sm:py-24"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold tracking-[.16em] text-[#17877e]">
                COPYMAI PLANS
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#14213d] sm:text-4xl">
                เลือกแพ็กเกจที่เหมาะกับคุณ
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                เริ่มต้นใช้งานส่วนตัว หรือเลือกเครื่องมือสำหรับทีมและองค์กร
              </p>
            </div>

            <div className="mt-10 grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {plans.map((plan) => (
                <article
                  key={plan.name}
                  className={`relative flex flex-col rounded-2xl border p-5 transition hover:-translate-y-1 sm:p-6 ${
                    plan.featured
                      ? "border-2 border-[#1f3768] bg-white shadow-xl shadow-blue-950/15 ring-4 ring-[#1f3768]/5"
                      : "border-slate-200 bg-white shadow-sm hover:shadow-lg"
                  }`}
                >
                  {plan.featured && (
                    <span className="absolute -top-3 right-4 rounded-full bg-[#1f3768] px-3 py-1 text-[10px] font-bold text-white">
                      แนะนำสำหรับองค์กร
                    </span>
                  )}

                  <p className="text-xs font-bold text-[#17877e]">{plan.name}</p>
                  <h3 className="mt-3 min-h-10 text-sm font-semibold leading-5 text-[#203954]">
                    {plan.audience}
                  </h3>
                  <p className="mt-3 min-h-12 text-xs leading-5 text-slate-500">
                    {plan.detail}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        plan.name === "Pro Max Company" ? "login" : "register",
                      )
                    }
                    className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold transition ${
                      plan.featured
                        ? "bg-[#1f3768] text-white hover:bg-[#182c55]"
                        : "border border-slate-200 text-[#1f3768] hover:bg-slate-50"
                    }`}
                  >
                    {plan.action}
                    <ArrowRight size={14} />
                  </button>
                </article>
              ))}
            </div>

            <p className="mt-6 text-center text-[10px] leading-5 text-slate-400">
              แพ็กเกจและสิทธิ์เป็นข้อมูลตัวอย่างสำหรับต้นแบบ
              ผลการตรวจเป็นข้อมูลคัดกรอง ไม่ใช่ข้อสรุปทางกฎหมาย
            </p>
          </div>
        </section>

        <section
          id="how-it-works"
          className="scroll-mt-6 mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20"
        >
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold tracking-[.16em] text-[#17877e]">
                HOW IT WORKS
              </p>
              <h2 className="mt-3 max-w-lg text-3xl font-bold leading-tight text-[#14213d] sm:text-4xl">
                จากไฟล์ของคุณ
                <br />
                สู่ข้อมูลที่ใช้ตรวจสอบต่อ
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-slate-500">
                ขั้นตอนที่ออกแบบให้เข้าใจง่าย
                โดยผลจากระบบเป็นข้อมูลช่วยคัดกรองและต้องให้มนุษย์พิจารณาบริบทเพิ่มเติม
              </p>
              <button
                type="button"
                onClick={() => navigate("register")}
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#1f3768] hover:text-[#17877e]"
              >
                เริ่มใช้งาน <ArrowRight size={16} />
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                {
                  n: "01",
                  icon: FileSearch,
                  title: "เพิ่มผลงาน",
                  text: "อัปโหลดไฟล์ที่ต้องการตรวจสอบ",
                },
                {
                  n: "02",
                  icon: ScanSearch,
                  title: "เปรียบเทียบ",
                  text: "ระบบค้นหาผลงานอ้างอิงที่คล้ายกัน",
                },
                {
                  n: "03",
                  icon: ShieldCheck,
                  title: "ตรวจผล",
                  text: "พิจารณาคู่เทียบและหลักฐานต่อ",
                },
              ].map(({ n, icon: Icon, title, text }) => (
                <article
                  key={n}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <span className="flex items-center justify-between text-xs font-bold text-[#17877e]">
                    <Icon size={19} />
                    <span>{n}</span>
                  </span>
                  <h3 className="mt-8 text-sm font-bold text-[#203954]">
                    {title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <footer className="bg-[#142d49] px-5 py-8 text-white sm:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <img src="/copymai-logo.svg" alt="" className="size-9" />
              <div>
                <b className="text-sm tracking-wide">COPYMAI</b>
                <p className="mt-1 text-[10px] text-slate-300">
                  เครื่องมือช่วยตรวจสอบและดูแลผลงาน
                </p>
              </div>
            </div>
            <span className="text-[10px] text-slate-400">
              © 2026 COPYMAI · Prototype
            </span>
          </div>
        </footer>
      </main>
    );
  }
