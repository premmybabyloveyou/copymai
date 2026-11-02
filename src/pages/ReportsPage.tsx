import { FileSearch } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { StatusBadge } from "../components/StatusBadge";
import { mockScans } from "../data/mockScans";
import type { PageId, ScanRecord } from "../types/app";

export function ReportsPage({
  open,
  navigate,
}: {
  open: (scan: ScanRecord) => void;
  navigate: (page: PageId) => void;
}) {
  return (
    <div className="space-y-5 sm:space-y-6">
      <PageHeader
        title="ผลการตรวจทั้งหมด"
        description="ประวัติการค้นหาและรายการที่บันทึกไว้"
      />

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_14px_40px_-30px_rgba(31,55,104,.25)]">
        <header className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 sm:px-5">
          <div>
            <h2 className="text-sm font-bold text-[#1f3768]">ประวัติการตรวจ</h2>
            <p className="mt-1 text-[10px] text-slate-400">
              คลิกรายการเพื่อดูรายละเอียดผล
            </p>
          </div>
          <span className="rounded-full bg-[#eaf6f3] px-2.5 py-1 text-[10px] font-semibold text-[#17877e]">
            {mockScans.length} รายการ
          </span>
        </header>

        <div className="hidden overflow-x-auto md:block">
          <div className="grid min-w-[640px] grid-cols-[2fr_.8fr_1fr_1.2fr] gap-3 border-b border-slate-100 bg-slate-50/70 px-5 py-3 text-[10px] font-semibold text-slate-500">
            <span>ผลงาน</span>
            <span>ประเภท</span>
            <span>วันที่</span>
            <span>คะแนน / สถานะ</span>
          </div>
          {mockScans.map((scan) => (
            <button
              key={scan.id}
              onClick={() => open(scan)}
              className="grid w-full min-w-[640px] grid-cols-[2fr_.8fr_1fr_1.2fr] items-center gap-3 border-b border-slate-100 px-5 py-3.5 text-left text-xs text-slate-700 transition last:border-0 hover:bg-[#f8fafc]"
            >
              <span className="min-w-0 truncate font-medium">
                {scan.title}
                <small className="mt-1 block text-[10px] font-normal text-slate-400">
                  #{scan.id}
                </small>
              </span>
              <span className="text-slate-500">{scan.type}</span>
              <span className="text-slate-500">{scan.date}</span>
              <span className="flex items-center gap-2 font-semibold text-[#1f3768]">
                {scan.score}%<StatusBadge status={scan.status} />
              </span>
            </button>
          ))}
        </div>

        <div className="divide-y divide-slate-100 md:hidden">
          {mockScans.map((scan) => (
            <button
              key={scan.id}
              onClick={() => open(scan)}
              className="flex w-full items-center gap-3 px-4 py-4 text-left transition hover:bg-slate-50"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#eaf6f3] text-[#17877e]">
                <FileSearch size={17} />
              </span>
              <span className="min-w-0 flex-1">
                <b className="block truncate text-xs font-semibold text-slate-700">
                  {scan.title}
                </b>
                <small className="mt-1 block truncate text-[10px] text-slate-400">
                  {scan.type} · {scan.date} · #{scan.id}
                </small>
              </span>
              <span className="flex shrink-0 flex-col items-end gap-1.5 text-xs font-bold text-[#1f3768]">
                {scan.score}%<StatusBadge status={scan.status} />
              </span>
            </button>
          ))}
        </div>
      </section>

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
