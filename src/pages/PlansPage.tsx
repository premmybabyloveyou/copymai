import { Check, FileSearch, Sparkles } from "lucide-react";
import type { PageId } from "../types/app";
import { PageHeader } from "../components/PageHeader";

const plans = [
  {
    name: "Basic Personal",
    price: "ฟรี",
    description: "สำหรับผู้สร้างสรรค์ที่เริ่มดูแลผลงาน",
    quota: "ตรวจทีละผลงาน · 8 scans/เดือน",
    current: true,
  },
  {
    name: "Basic Company",
    price: "เริ่มต้น ฿—",
    description: "พื้นที่ทำงานสำหรับบริษัทและทีมขนาดเล็ก",
    quota: "พื้นที่ทีม · quota เพิ่มขึ้น",
  },
  {
    name: "Pro / Pro Max",
    price: "ติดต่อเรา",
    description: "สำหรับองค์กรที่ต้องการการติดตามที่ครอบคลุม",
    quota: "ติดตามออนไลน์ · Ground Truth ภายใน",
    featured: true,
  },
];

export function PlansPage({ navigate }: { navigate: (page: PageId) => void }) {
  return (
    <div className="space-y-6">
      <PageHeader
        title="แพ็กเกจของฉัน"
        description="เลือกระดับการใช้งานที่เหมาะกับผลงานและทีมของคุณ"
      />

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_14px_40px_-30px_rgba(31,55,104,.25)] sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-[.16em] text-[#17877e]">
              COPYMAI PLANS
            </p>
            <h2 className="mt-1 text-lg font-bold text-[#1f3768]">
              แพ็กเกจสำหรับทุกช่วงการเติบโต
            </h2>
          </div>
          <p className="text-[10px] text-slate-400">
            ราคาและสิทธิในหน้านี้เป็นข้อมูลตัวอย่าง
          </p>
        </div>

        <div className="mt-5 grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex h-full flex-col rounded-2xl border p-5 transition sm:p-6 ${
                plan.featured
                  ? "border-[#1f3768] bg-gradient-to-b from-[#f4f7fc] to-white shadow-lg shadow-[#1f3768]/10"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 right-5 inline-flex items-center gap-1 rounded-full bg-[#1f3768] px-3 py-1 text-[9px] font-bold text-white">
                  <Sparkles size={12} /> สำหรับองค์กร
                </span>
              )}
              <div className="flex items-center justify-between gap-2">
                <small className="text-[10px] font-bold tracking-[.14em] text-[#17877e]">
                  {plan.current ? "CURRENT PLAN" : "COPYMAI PLAN"}
                </small>
                {plan.current && (
                  <span className="rounded-full bg-[#eaf6f3] px-2.5 py-1 text-[9px] font-semibold text-[#17877e]">
                    ใช้งานอยู่
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-lg font-bold text-[#1f3768]">
                {plan.name}
              </h3>
              <p className="mt-1 min-h-10 text-xs leading-5 text-slate-500">
                {plan.description}
              </p>
              <p className="mt-5 text-2xl font-bold tracking-tight text-[#1f3768]">
                {plan.price}
              </p>
              <div className="mt-4 rounded-xl bg-[#f5f8fa] px-3.5 py-3 text-xs font-medium text-slate-600">
                {plan.quota}
              </div>
              <ul className="my-5 flex-1 space-y-3 text-xs leading-5 text-slate-600">
                <li className="flex items-start gap-2.5">
                  <Check size={15} className="mt-0.5 shrink-0 text-[#17877e]" />
                  สิทธิการใช้งานตามแพ็กเกจ
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={15} className="mt-0.5 shrink-0 text-[#17877e]" />
                  ข้อมูลตัวอย่างสำหรับ mockup
                </li>
              </ul>
              <button
                type="button"
                className={`w-full rounded-xl px-4 py-3 text-xs font-semibold transition focus:outline-none focus:ring-4 ${
                  plan.featured
                    ? "bg-[#1f3768] text-white hover:bg-[#182c55] focus:ring-[#1f3768]/20"
                    : "border border-slate-200 bg-white text-[#1f3768] hover:bg-slate-50 focus:ring-slate-200"
                }`}
              >
                {plan.current ? "แพ็กเกจปัจจุบัน" : "ดูรายละเอียด"}
              </button>
            </article>
          ))}
        </div>
      </section>

      <p className="rounded-xl border border-[#dce9e6] bg-[#f1f8f6] px-4 py-3 text-[10px] leading-5 text-[#315b58]">
        สิทธิ์และราคาในหน้านี้เป็นข้อมูลจำลองสำหรับต้นแบบ
        ระบบจริงอาจกำหนดโควตาและความสามารถตามแพ็กเกจที่เปิดให้บริการ
      </p>

      <footer className="mt-3 border-t border-slate-200/80 px-1 py-6 text-[#1f3768] sm:px-2 sm:py-7">
        <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-[1.3fr_.8fr_1.2fr] xl:gap-10">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/copymai-logo.svg"
                alt=""
                className="size-10 shrink-0"
              />
              <div>
                <b className="text-sm tracking-wide">COPYMAI</b>
                <p className="mt-1 text-[9px] font-medium tracking-[.14em] text-slate-500">
                  COPYRIGHT INTELLIGENCE
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-[11px] leading-5 text-slate-500">
              พื้นที่ช่วยจัดการผลงาน ตรวจสอบความคล้าย
              และรวบรวมข้อมูลสำหรับตรวจสอบต่อ
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-[#1f3768]">เมนูทางลัด</h3>
            <div className="mt-3 grid gap-2">
              <button
                onClick={() => navigate("scan")}
                className="w-fit text-left text-[11px] text-slate-500 transition hover:text-[#17877e]"
              >
                ตรวจความคล้าย
              </button>
              <button
                onClick={() => navigate("reports")}
                className="w-fit text-left text-[11px] text-slate-500 transition hover:text-[#17877e]"
              >
                ผลการตรวจ
              </button>
              <button
                onClick={() => navigate("community-report")}
                className="w-fit text-left text-[11px] text-slate-500 transition hover:text-[#17877e]"
              >
                แจ้งเบาะแส
              </button>
              <button
                onClick={() => navigate("plans")}
                className="w-fit text-left text-[11px] text-slate-500 transition hover:text-[#17877e]"
              >
                แพ็กเกจ
              </button>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-[#1f3768]">ข้อควรทราบ</h3>
            <p className="mt-3 text-[10px] leading-5 text-slate-500">
              ราคาและสิทธิ์ในหน้านี้เป็นข้อมูลตัวอย่างสำหรับต้นแบบ
            </p>
            <div className="mt-4 flex flex-col gap-1 border-t border-slate-200 pt-3 text-[9px] text-slate-400 sm:flex-row sm:justify-between xl:flex-col xl:gap-1">
              <span>© 2026 COPYMAI · Prototype</span>
              <span className="flex items-center gap-1.5">
                <FileSearch size={12} />
                ข้อมูลในหน้านี้เป็นตัวอย่าง
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
