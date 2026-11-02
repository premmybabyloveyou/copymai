import {
  ArrowRight,
  BadgeCheck,
  BellRing,
  FileSearch,
  Fingerprint,
  Globe2,
  LockKeyhole,
  Menu,
  ScanSearch,
  X,
  ShieldCheck,
  Sparkles,
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
          <a className="transition hover:text-[#1f3768]" href="#how-it-works">
            วิธีใช้งาน
          </a>
          <a className="transition hover:text-[#1f3768]" href="#plans">
            แพ็กเกจ
          </a>
        </nav>
        <div className="flex items-center justify-self-end gap-1.5 sm:gap-3 lg:col-start-3">
          <button
            onClick={() => navigate("login")}
            className="hidden rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white sm:block"
          >
            เข้าสู่ระบบ
          </button>
          <button
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
              ["วิธีใช้งาน", "#how-it-works"],
              ["แพ็กเกจ", "#plans"],
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
        id="top"
        className="relative mx-auto grid max-w-7xl items-center gap-9 px-4 pb-12 pt-8 sm:gap-12 sm:px-8 sm:pb-24 sm:pt-16 lg:grid-cols-[1.02fr_.98fr] lg:gap-8"
      >
        <div className="relative z-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#dce8e8] bg-white/80 px-3 py-2 text-[10px] font-semibold text-[#287e78] shadow-sm sm:mb-6 sm:px-3.5 sm:text-xs">
            <Sparkles size={14} /> AI-assisted copyright intelligence
          </div>
          <h1 className="max-w-2xl text-[2.15rem] font-bold leading-[1.2] tracking-tight text-[#14213d] sm:text-5xl lg:text-[58px]">
            รู้ทันการละเมิด
            <br />
            ก่อนมูลค่าจะ<span className="text-[#17877e]">สูญหาย</span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
            ตรวจสอบความคล้าย ติดตามการใช้ผลงาน
            และรวบรวมข้อมูลเบื้องต้นเพื่อให้คุณรู้ว่าควรตรวจสอบอะไรต่อ
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-8 sm:gap-3">
            <button
              onClick={() => navigate("register")}
              className="flex items-center gap-2 rounded-xl bg-[#1f3768] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-950/15 transition hover:-translate-y-0.5 hover:bg-[#182c55]"
            >
              เริ่มตรวจสอบผลงาน <ArrowRight size={16} />
            </button>
            <a
              href="#plans"
              className="rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-[#1f3768] transition hover:border-slate-300 hover:bg-slate-50"
            >
              ดูแพลนทั้งหมด
            </a>
          </div>
          <div className="mt-7 flex flex-wrap gap-x-4 gap-y-3 text-[10px] font-medium text-slate-500 sm:mt-9 sm:gap-x-6 sm:text-xs">
            <span className="inline-flex items-center gap-2">
              <BadgeCheck size={15} className="text-[#17877e]" /> DIP Ground
              Truth*
            </span>
            <span className="inline-flex items-center gap-2">
              <LockKeyhole size={14} className="text-[#17877e]" /> Secure
              evidence
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck size={15} className="text-[#17877e]" />{" "}
              Human-in-the-loop
            </span>
          </div>
          <p className="mt-3 text-[10px] leading-5 text-slate-400">
            *การเชื่อมต่อฐานข้อมูลขึ้นอยู่กับสิทธิ์และการให้บริการของหน่วยงาน
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[570px] lg:ml-auto">
          <div className="absolute -right-10 -top-10 size-48 rounded-full bg-[#ccebe5]/60 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 size-48 rounded-full bg-[#dce5f5]/80 blur-3xl" />
          <div className="relative rounded-[22px] border border-white bg-white p-3 shadow-[0_28px_80px_-32px_rgba(27,48,77,.35)] sm:rounded-[26px] sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-slate-500">
                  COPYMAI WORKSPACE
                </p>
                <h2 className="mt-1 text-lg font-bold text-[#172d4b]">
                  Copyright risk overview
                </h2>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1.5 text-[10px] font-semibold text-emerald-700">
                <span className="size-1.5 rounded-full bg-emerald-500" /> Demo
                data
              </span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-1.5 sm:mt-5 sm:gap-3">
              {[
                ["24", "ผลงาน"],
                ["08", "รายการที่ควรตรวจ"],
                ["฿186K", "มูลค่าประเมิน*"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-xl bg-[#f7f9fb] p-2 sm:rounded-2xl sm:p-4"
                >
                  <span className="block text-base font-bold text-[#1f3768] sm:text-2xl">
                    {value}
                  </span>
                  <span className="mt-1 block text-[9px] leading-3.5 text-slate-500 sm:text-[10px] sm:leading-4">
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl border border-slate-100 p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-[#203954]">
                    Activity overview
                  </h3>
                  <p className="mt-1 text-[10px] text-slate-400">
                    ภาพรวมตัวอย่างในช่วง 90 วัน
                  </p>
                </div>
                <span className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-[10px] text-slate-500">
                  90 วัน⌄
                </span>
              </div>
              <div className="mt-5 flex h-32 items-end gap-2 border-b border-slate-100 px-1 sm:gap-3">
                {[34, 52, 43, 72, 59, 88, 65, 96, 73, 84, 62, 100].map(
                  (height, index) => (
                    <div key={index} className="flex h-full flex-1 items-end">
                      <div
                        className={`w-full rounded-t-md ${
                          index > 8 ? "bg-[#1f3768]" : "bg-[#b9dcd7]"
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  )
                )}
              </div>
              <div className="mt-2 flex justify-between text-[9px] text-slate-400">
                <span>ส.ค.</span>
                <span>ก.ย.</span>
                <span>ต.ค.</span>
                <span>พ.ย.</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-2xl bg-[#eef8f6] p-3.5">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white text-[#17877e]">
                <Globe2 size={17} />
              </span>
              <span className="min-w-0 flex-1">
                <b className="block text-xs text-[#24524f]">
                  Internet monitoring
                </b>
                <small className="mt-1 block text-[10px] text-slate-500">
                  มีรายการตัวอย่างรอการตรวจสอบ
                </small>
              </span>
              <span className="rounded-full bg-white px-2 py-1 text-[9px] font-semibold text-[#17877e]">
                พร้อมดู
              </span>
            </div>
            <p className="mt-3 text-[9px] text-slate-400">
              *ตัวเลขทั้งหมดเป็นข้อมูลจำลองสำหรับแสดงตัวอย่างหน้าจอ
            </p>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="border-y border-slate-100 bg-white py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold tracking-[.16em] text-[#17877e]">
              ONE WORKSPACE, CLEARER NEXT STEPS
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#14213d] sm:text-4xl">
              ดูแลผลงานได้ในที่เดียว
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-500">
              ช่วยค้นหาและจัดระเบียบข้อมูลที่เกี่ยวข้อง
              เพื่อให้เจ้าของผลงานตัดสินใจตรวจสอบต่อได้ง่ายขึ้น
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: ScanSearch,
                title: "ตรวจสอบความคล้าย",
                text: "เปรียบเทียบไฟล์กับผลงานอ้างอิง พร้อมแสดงระดับความคล้ายเพื่อคัดกรองเบื้องต้น",
              },
              {
                icon: BellRing,
                title: "ติดตามและแจ้งเบาะแส",
                text: "บันทึกรายการที่พบและส่งข้อมูลให้เจ้าของผลงานนำไปตรวจสอบต่อ",
              },
              {
                icon: Fingerprint,
                title: "จัดเก็บข้อมูลผลงาน",
                text: "เก็บรายละเอียดผลงานและหลักฐานประกอบในพื้นที่ทำงานเดียวกัน",
              },
            ].map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="rounded-2xl border border-slate-100 bg-[#fbfcfd] p-6 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/5"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-[#e9f5f2] text-[#17877e]">
                  <Icon size={20} />
                </span>
                <h3 className="mt-5 text-base font-bold text-[#203954]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20"
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
              onClick={() => navigate("scan")}
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#1f3768] hover:text-[#17877e]"
            >
              ดูตัวอย่างการตรวจ <ArrowRight size={16} />
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

      <section id="plans" className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold tracking-[.16em] text-[#17877e]">
                PLANS
              </p>
              <h2 className="mt-3 text-3xl font-bold text-[#14213d] sm:text-4xl">
                เลือกขอบเขตที่เหมาะกับผลงาน
              </h2>
              <p className="mt-3 text-sm text-slate-500">
                เริ่มจากการใช้งานส่วนตัว และขยายได้ตามความต้องการ
              </p>
            </div>
            <p className="text-xs text-slate-400">
              แพ็กเกจและสิทธิ์เป็นตัวอย่างสำหรับต้นแบบ
            </p>
          </div>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border p-5 ${
                  plan.featured
                    ? "border-[#1f3768] bg-[#f7f9fd] shadow-lg shadow-blue-950/10"
                    : "border-slate-200 bg-white"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 right-4 rounded-full bg-[#1f3768] px-3 py-1 text-[10px] font-bold text-white">
                    แนะนำ
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
                  onClick={() => navigate("register")}
                  className={`mt-auto flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
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
          <p className="mt-5 text-center text-[10px] leading-5 text-slate-400">
            ระดับความคล้ายไม่ใช่ข้อสรุปว่ามีการละเมิดลิขสิทธิ์
            และไม่ใช้แทนคำแนะนำทางกฎหมาย
          </p>
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
