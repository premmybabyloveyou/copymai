import { useState } from "react";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Check,
  Database,
  FileSearch,
  Globe2,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import type { PageId } from "../types/app";

type DemoPlan = "pro" | "pro-max" | null;

const availablePlans = [
  {
    name: "Personal",
    audience: "สำหรับผู้สร้างสรรค์รายบุคคล",
    description: "เริ่มดูแลและตรวจสอบผลงานของคุณ",
    quota: "ตรวจทีละผลงาน · 8 ครั้ง/เดือน",
    features: [
      "ตรวจผลงานทีละชิ้น",
      "ดูผลการตรวจตัวอย่าง",
      "จัดเก็บประวัติการตรวจ",
    ],
    current: true,
  },
  {
    name: "Plus",
    audience: "สำหรับผู้สร้างสรรค์ที่มีผลงานหลายชิ้น",
    description: "พื้นที่และโควตาที่เพิ่มขึ้นสำหรับการใช้งานต่อเนื่อง",
    quota: "โควตาเพิ่มเติม · เหมาะกับผู้สร้างสรรค์",
    features: [
      "ทุกความสามารถใน Personal",
      "ตรวจผลงานได้มากขึ้น",
      "จัดการผลงานในพื้นที่เดียว",
    ],
  },
];

function DemoPage({
  plan,
  onBack,
}: {
  plan: Exclude<DemoPlan, null>;
  onBack: () => void;
}) {
  const isProMax = plan === "pro-max";

  const stats = isProMax
    ? [
        ["ผลงานในคลัง", "4,821"],
        ["รายการที่ควรตรวจ", "26"],
        ["แหล่งข้อมูลภายใน", "12"],
      ]
    : [
        ["แหล่งที่ติดตาม", "18"],
        ["รายการที่ควรตรวจ", "26"],
        ["สมาชิกทีม", "5"],
      ];

  const matches = isProMax
    ? [
        ["ภาพประกอบ: สวนหลังฝน", "คลัง Ground Truth ภายใน", "91%"],
        ["นิยาย: ฤดูฝนที่ผ่านมา", "คลังวรรณกรรมขององค์กร", "76%"],
        ["ผลงานเสียง: ทำนองสวน", "คลังสื่อภายใน", "68%"],
      ]
    : [
        ["ภาพประกอบ: สวนหลังฝน", "Marketplace · เว็บไซต์สาธารณะ", "91%"],
        ["นิยาย: ฤดูฝนที่ผ่านมา", "เว็บไซต์เผยแพร่สาธารณะ", "76%"],
        ["ผลงานเสียง: ทำนองสวน", "แพลตฟอร์มวิดีโอสาธารณะ", "68%"],
      ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={isProMax ? "Pro Max · ตัวอย่างระบบภายใน" : "Pro · ตัวอย่างระบบติดตาม"}
        description={
          isProMax
            ? "ตัวอย่างพื้นที่ตรวจสอบสำหรับองค์กรที่ใช้ Ground Truth ภายใน"
            : "ตัวอย่างการติดตามแหล่งข้อมูลสาธารณะและทำงานร่วมกันเป็นทีม"
        }
        action={
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-[#1f3768] transition hover:bg-slate-50"
          >
            <ArrowLeft size={14} />
            กลับหน้าแพ็กเกจ
          </button>
        }
      />

      <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900">
        <Sparkles size={16} className="shrink-0" />
        หน้าจำลองสำหรับแสดงแนวคิด · ไม่มีการติดตามหรือสแกนข้อมูลจริง
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map(([label, value]) => (
          <article
            key={label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-xs text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-bold text-[#1f3768]">{value}</p>
            <p className="mt-1 text-[10px] text-slate-400">ข้อมูลตัวอย่าง</p>
          </article>
        ))}
      </div>

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="text-sm font-bold text-[#1f3768]">
              {isProMax ? "ผลเทียบกับ Ground Truth ภายใน" : "รายการที่พบจากแหล่งสาธารณะ"}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              คะแนนใช้คัดกรองรายการที่ควรตรวจสอบต่อ
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {matches.map(([title, source, score]) => (
              <div
                key={title}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#eaf6f3] text-[#17877e]">
                    <FileSearch size={17} />
                  </span>
                  <span className="min-w-0">
                    <b className="block truncate text-xs text-slate-700">
                      {title}
                    </b>
                    <small className="mt-1 block truncate text-[10px] text-slate-400">
                      {source}
                    </small>
                  </span>
                </div>
                <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">
                  {score}
                </span>
              </div>
            ))}
          </div>
        </section>

        <aside className="rounded-2xl border border-slate-200 bg-white p-5">
          <span className="grid size-10 place-items-center rounded-xl bg-[#eaf6f3] text-[#17877e]">
            {isProMax ? <Database size={19} /> : <Globe2 size={19} />}
          </span>
          <h2 className="mt-4 text-sm font-bold text-[#1f3768]">
            {isProMax ? "Ground Truth ภายในองค์กร" : "แหล่งข้อมูลและทีม"}
          </h2>
          <p className="mt-2 text-xs leading-5 text-slate-500">
            {isProMax
              ? "ตัวอย่างการจัดการชุดผลงานอ้างอิงภายใน พร้อมกำหนดสิทธิ์เข้าถึงสำหรับทีม"
              : "ตัวอย่างการติดตามแหล่งข้อมูลสาธารณะ โดยใช้ข้อมูลอ้างอิงที่ระบบเชื่อมต่อ"}
          </p>
          <div className="mt-4 space-y-3 border-t border-slate-100 pt-4 text-xs text-slate-600">
            <p className="flex items-center gap-2">
              {isProMax ? <ShieldCheck size={15} /> : <Users size={15} />}
              {isProMax ? "กำหนดสิทธิ์ผู้ใช้ในองค์กร" : "พื้นที่ทำงานสำหรับทีม"}
            </p>
            <p className="flex items-center gap-2">
              <Activity size={15} />
              สถานะและประวัติการตรวจ
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export function PlansPage({ navigate }: { navigate: (page: PageId) => void }) {
  const [demoPlan, setDemoPlan] = useState<DemoPlan>(null);
  const [selectedPlan, setSelectedPlan] = useState("");

  if (demoPlan) {
    return (
      <DemoPage plan={demoPlan} onBack={() => setDemoPlan(null)} />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="แพ็กเกจของฉัน"
        description="เลือกแพ็กเกจสำหรับการใช้งาน หรือเปิดดูตัวอย่างแผนสำหรับองค์กร"
      />

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_14px_40px_-30px_rgba(31,55,104,.25)] sm:p-6">
        <div>
          <p className="text-[10px] font-bold tracking-[.16em] text-[#17877e]">
            PERSONAL PLANS
          </p>
          <h2 className="mt-1 text-lg font-bold text-[#1f3768]">
            แพ็กเกจสำหรับผู้สร้างสรรค์
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Personal และ Plus เป็นแพ็กเกจสำหรับเลือกใช้งานในต้นแบบนี้
          </p>
        </div>

        <div className="mt-5 grid items-stretch gap-4 md:grid-cols-2">
          {availablePlans.map((plan) => (
            <article
              key={plan.name}
              className={`flex h-full flex-col rounded-2xl border p-5 sm:p-6 ${
                plan.name === "Plus"
                  ? "border-[#17877e]/40 bg-gradient-to-b from-[#f2f9f7] to-white shadow-md"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-bold text-[#17877e]">{plan.name}</p>
                {plan.current && (
                  <span className="rounded-full bg-[#eaf6f3] px-2.5 py-1 text-[9px] font-semibold text-[#17877e]">
                    แพ็กเกจปัจจุบัน
                  </span>
                )}
              </div>

              <h3 className="mt-4 text-base font-bold text-[#1f3768]">
                {plan.audience}
              </h3>
              <p className="mt-2 min-h-10 text-xs leading-5 text-slate-500">
                {plan.description}
              </p>

              <p className="mt-4 rounded-xl bg-[#f5f8fa] px-3.5 py-3 text-xs font-medium text-slate-600">
                {plan.quota}
              </p>

              <ul className="my-5 flex-1 space-y-3 text-xs leading-5 text-slate-600">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check
                      size={15}
                      className="mt-0.5 shrink-0 text-[#17877e]"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() =>
                  plan.current
                    ? setSelectedPlan("คุณกำลังใช้ Personal Plan อยู่")
                    : setSelectedPlan("เลือก Plus Plan ในตัวอย่างแล้ว")
                }
                className={`w-full rounded-xl px-4 py-3 text-xs font-semibold transition focus:outline-none focus:ring-4 ${
                  plan.name === "Plus"
                    ? "bg-[#1f3768] text-white hover:bg-[#182c55] focus:ring-[#1f3768]/20"
                    : "border border-slate-200 bg-white text-[#1f3768] hover:bg-slate-50 focus:ring-slate-200"
                }`}
              >
                {plan.current ? "แพ็กเกจปัจจุบัน" : "เลือก Plus"}
              </button>
            </article>
          ))}
        </div>

        {selectedPlan && (
          <p role="status" className="mt-4 text-xs text-[#17877e]">
            {selectedPlan} · ยังไม่มีการชำระเงินหรือเปลี่ยนแพ็กเกจจริง
          </p>
        )}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-[#f7f9fc] p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-[#1f3768] shadow-sm">
            <Sparkles size={18} />
          </span>
          <div>
            <p className="text-[10px] font-bold tracking-[.16em] text-[#17877e]">
              ORGANIZATION DEMOS
            </p>
            <h2 className="mt-1 text-lg font-bold text-[#1f3768]">
              ทดลองดูหน้าจำลองสำหรับองค์กร
            </h2>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              เปิดดูแนวคิดการใช้งาน Pro และ Pro Max โดยไม่ต้องเปลี่ยนแพ็กเกจ
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-5">
            <span className="grid size-10 place-items-center rounded-xl bg-[#eaf6f3] text-[#17877e]">
              <Globe2 size={19} />
            </span>
            <h3 className="mt-4 text-base font-bold text-[#1f3768]">Pro</h3>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              ดูตัวอย่างการติดตามแหล่งข้อมูลสาธารณะและพื้นที่ทำงานของทีม
            </p>
            <button
              type="button"
              onClick={() => setDemoPlan("pro")}
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-[#1f3768] transition hover:bg-slate-50"
            >
              ดูตัวอย่าง Pro <ArrowRight size={14} />
            </button>
          </article>

          <article className="rounded-2xl border border-[#1f3768] bg-white p-5 shadow-md shadow-blue-950/5">
            <span className="grid size-10 place-items-center rounded-xl bg-[#1f3768] text-white">
              <Database size={19} />
            </span>
            <h3 className="mt-4 text-base font-bold text-[#1f3768]">
              Pro Max
            </h3>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              ดูตัวอย่างระบบภายในองค์กร การใช้ Ground Truth และการจัดการสิทธิ์
            </p>
            <button
              type="button"
              onClick={() => setDemoPlan("pro-max")}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#1f3768] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#182c55]"
            >
              ดูตัวอย่าง Pro Max <ArrowRight size={14} />
            </button>
          </article>
        </div>
      </section>

      <p className="rounded-xl border border-[#dce9e6] bg-[#f1f8f6] px-4 py-3 text-[10px] leading-5 text-[#315b58]">
        ราคา โควตา และหน้าจอ Pro/Pro Max เป็นข้อมูลจำลองสำหรับต้นแบบ
        ไม่มีการติดตามเว็บหรือเชื่อม Ground Truth จริง
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
                type="button"
                onClick={() => navigate("scan")}
                className="w-fit text-left text-[11px] text-slate-500 transition hover:text-[#17877e]"
              >
                ตรวจความคล้าย
              </button>
              <button
                type="button"
                onClick={() => navigate("reports")}
                className="w-fit text-left text-[11px] text-slate-500 transition hover:text-[#17877e]"
              >
                ผลการตรวจ
              </button>
              <button
                type="button"
                onClick={() => navigate("community-report")}
                className="w-fit text-left text-[11px] text-slate-500 transition hover:text-[#17877e]"
              >
                แจ้งเบาะแส
              </button>
              <button
                type="button"
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
              หน้าจอ Pro และ Pro Max เป็นตัวอย่างแนวคิด
              ผลตรวจไม่ใช่ข้อสรุปทางกฎหมาย
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
