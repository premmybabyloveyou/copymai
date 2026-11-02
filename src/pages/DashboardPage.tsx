import {
  ArrowRight,
  FileSearch,
  Image,
  Plus,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { StatusBadge } from "../components/StatusBadge";
import { mockScans } from "../data/mockScans";
import type { PageId } from "../types/app";

export function DashboardPage({
  navigate,
}: {
  navigate: (page: PageId) => void;
}) {
  const stats = [
    {
      label: "การตรวจทั้งหมด",
      value: "12",
      note: "+3 ในเดือนนี้",
      color: "text-[#1f3768]",
      marker: "bg-[#eaf0f8]",
    },
    {
      label: "ควรตรวจสอบ",
      value: "3",
      note: "มี candidate ที่น่าสนใจ",
      color: "text-amber-700",
      marker: "bg-amber-50",
    },
    {
      label: "รายงานที่ส่ง",
      value: "2",
      note: "1 เรื่องอยู่ระหว่างตรวจ",
      color: "text-[#17877e]",
      marker: "bg-[#eaf6f3]",
    },
    {
      label: "โควตาคงเหลือ",
      value: "5 ครั้ง",
      note: "รีเซ็ตวันที่ 1 พ.ย.",
      color: "text-[#1f3768]",
      marker: "bg-[#eaf0f8]",
    },
  ];

  return (
    <div className="space-y-5 sm:space-y-6">
      <PageHeader
        title="สวัสดีค่ะ/ครับ "
        description="ติดตามผลงานและตรวจสอบความคล้ายได้จากที่นี่"
        action={
          <button
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1f3768] px-4 py-3 text-xs font-semibold text-white shadow-sm transition hover:bg-[#182c55]"
            onClick={() => navigate("scan")}
          >
            <Plus size={15} />
            เริ่มตรวจผลงาน
          </button>
        }
      />

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 sm:gap-4">
        {stats.map(({ label, value, note, color, marker }) => (
          <article
            key={label}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_12px_32px_-28px_rgba(31,55,104,.35)] sm:p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="text-xs font-medium text-slate-500">
                {label}
              </span>
              <span
                className={`grid size-8 place-items-center rounded-lg ${marker}`}
              >
                <Sparkles size={15} className={color} />
              </span>
            </div>
            <b
              className={`my-2 block text-2xl font-bold tracking-tight ${color}`}
            >
              {value}
            </b>
            <span className="text-[11px] leading-4 text-slate-400">{note}</span>
          </article>
        ))}
      </section>

      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_32px_-28px_rgba(31,55,104,.3)]">
          <header className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 sm:px-5">
            <div>
              <h2 className="text-sm font-bold text-[#1f3768]">
                กิจกรรมล่าสุด
              </h2>
              <p className="mt-1 text-[10px] text-slate-400">
                รายการตรวจสอบผลงานของคุณ
              </p>
            </div>
            <button
              className="flex shrink-0 items-center gap-1 text-xs font-semibold text-[#17877e] transition hover:text-[#126b65]"
              onClick={() => navigate("reports")}
            >
              ดูผลทั้งหมด <ArrowRight size={14} />
            </button>
          </header>
          <div className="px-4 sm:px-5">
            {mockScans.map((scan) => (
              <div
                key={scan.id}
                className="grid grid-cols-[36px_minmax(0,1fr)_auto] items-center gap-3 border-b border-slate-100 py-3.5 last:border-b-0 sm:gap-4"
              >
                <span className="grid size-9 place-items-center rounded-xl bg-[#eaf6f3] text-[#17877e]">
                  <Image size={16} />
                </span>
                <span className="min-w-0">
                  <b className="block truncate text-xs font-semibold text-slate-700">
                    {scan.title}
                  </b>
                  <small className="mt-1 block truncate text-[10px] text-slate-400">
                    {scan.type} · {scan.date}
                  </small>
                </span>
                <span className="flex min-w-[62px] flex-col items-end gap-1.5 text-xs font-bold text-[#1f3768]">
                  {scan.score}%<StatusBadge status={scan.status} />
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-100 bg-slate-50/70 px-4 py-3 text-center sm:px-5">
            <button
              onClick={() => navigate("scan")}
              className="text-[11px] font-semibold text-[#17877e] hover:text-[#126b65]"
            >
              ตรวจผลงานใหม่ +
            </button>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-2xl bg-gradient-to-br from-[#1f3768] to-[#176c68] p-5 text-white shadow-lg shadow-[#1f3768]/10 sm:p-6">
            <span className="grid size-10 place-items-center rounded-xl bg-white/10 text-emerald-200">
              <FileSearch size={19} />
            </span>
            <h2 className="mt-4 text-base font-bold">เริ่มตรวจผลงานของคุณ</h2>
            <p className="mt-2 text-xs leading-5 text-blue-100">
              อัปโหลดไฟล์เพื่อตรวจสอบความคล้ายกับผลงานอ้างอิงในระบบ
            </p>
            <button
              onClick={() => navigate("scan")}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-[#1f3768] transition hover:bg-blue-50"
            >
              เริ่มตรวจ <ArrowRight size={14} />
            </button>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-[#dce9e6] bg-[#f1f8f6] p-4">
            <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#17877e]" />
            <p className="text-[11px] leading-5 text-[#315b58]">
              คะแนนความคล้ายทางเทคนิคเป็นข้อมูลคัดกรอง
              ไม่ใช่ข้อสรุปว่ามีการละเมิดลิขสิทธิ์
            </p>
          </div>
        </aside>
      </div>

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
              คะแนนความคล้ายเป็นข้อมูลคัดกรอง
              ไม่ใช่ข้อสรุปว่ามีการละเมิดลิขสิทธิ์
              และไม่ใช้แทนการพิจารณาของมนุษย์
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
