import { useState, type FormEvent } from "react";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  FileSearch,
  Camera,
  Send,
  ShieldCheck,
} from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import type { PageId } from "../types/app";

export function CommunityReportPage({
  navigate,
}: {
  navigate: (page: PageId) => void;
}) {
  const [sent, setSent] = useState(false);
  const [reportId, setReportId] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageError, setImageError] = useState("");

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setImageError("");
    setImagePreview("");

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImageError("กรุณาเลือกไฟล์รูปภาพ");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError("ไฟล์ภาพต้องมีขนาดไม่เกิน 5 MB");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setReportId(`CM-${Math.floor(1000 + Math.random() * 9000)}`);
    setSent(true);
  }

  const field =
    "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-[#14213d] outline-none transition placeholder:text-slate-400 focus:border-[#17877e] focus:ring-4 focus:ring-[#17877e]/10";

  return (
    <div className="space-y-6">
      <PageHeader
        title="แจ้งเบาะแส"
        description="ส่งข้อมูลสินค้า/เนื้อหาที่สงสัยให้ทีมตรวจสอบ"
      />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_280px]">
        <form
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_14px_40px_-30px_rgba(31,55,104,.25)]"
          onSubmit={submit}
        >
          <div className="flex items-center gap-3 border-b border-slate-100 bg-white px-4 py-4 sm:px-7 sm:py-5">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#e9f5f2] text-[#17877e]">
              <Camera size={20} />
            </span>

            <div>
              <h2 className="text-sm font-bold text-[#1f3768]">ข้อมูลเบาะแส</h2>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                ใส่รายละเอียดเท่าที่มี เพื่อช่วยให้ตรวจสอบแหล่งที่พบได้ง่ายขึ้น
              </p>
            </div>
          </div>

          <div className="grid gap-x-5 gap-y-4 p-4 sm:grid-cols-2 sm:p-7">
            <label className="block text-xs font-semibold text-slate-700">
              URL ที่พบ{" "}
              <span className="font-normal text-slate-400">(ถ้ามี)</span>
              <input
                className={field}
                type="url"
                name="url"
                placeholder="https://..."
              />
            </label>
            <label className="block text-xs font-semibold text-slate-700">
              แพลตฟอร์มหรือร้านค้า
              <input
                className={field}
                name="platform"
                placeholder="เช่น Marketplace, Facebook"
              />
            </label>
            <label className="block text-xs font-semibold text-slate-700">
              ประเภทที่พบ
              <select
                className={field}
                name="type"
                defaultValue="สินค้า/ภาพพิมพ์"
              >
                <option>สินค้า/ภาพพิมพ์</option>
                <option>ภาพ/งานศิลปะ</option>
                <option>ข้อความ/นิยาย</option>
                <option>เสียง/เพลง</option>
                <option>วิดีโอ/การแสดง</option>
              </select>
            </label>
            <label className="block text-xs font-semibold text-slate-700">
              อีเมลติดตาม{" "}
              <span className="font-normal text-slate-400">(ไม่บังคับ)</span>
              <input
                className={field}
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
              />
            </label>
            <label className="block text-xs font-semibold text-slate-700 sm:col-span-2">
              รายละเอียด
              <textarea
                className={`${field} min-h-32 resize-y`}
                name="details"
                required
                placeholder="อธิบายสิ่งที่พบ เช่น ชื่อสินค้า บัญชีผู้ขาย หรือวันที่พบ"
              />
            </label>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700">
                ภาพประกอบ
                <span className="ml-1 font-normal text-slate-400">
                  (ไม่บังคับ · PNG, JPG, WEBP · สูงสุด 5 MB)
                </span>
              </label>

              <label className="mt-2 flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#b9d9d4] bg-[#f8fbfa] p-4 text-center transition hover:bg-[#eef7f5]">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="ตัวอย่างภาพที่เลือก"
                    className="max-h-56 max-w-full rounded-lg object-contain"
                  />
                ) : (
                  <>
                    <Camera size={24} className="text-[#17877e]" />
                    <span className="mt-2 text-xs font-semibold text-[#1f3768]">
                      เลือกภาพหลักฐาน
                    </span>
                    <span className="mt-1 text-[10px] text-slate-400">
                      คลิกเพื่อเลือกภาพจากอุปกรณ์
                    </span>
                  </>
                )}

                <input
                  className="sr-only"
                  type="file"
                  name="evidenceImage"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImageChange}
                />
              </label>

              {imageError && (
                <p role="alert" className="mt-2 text-xs text-red-600">
                  {imageError}
                </p>
              )}
            </div>
            <label className="flex items-start gap-2.5 text-xs leading-5 text-slate-600 sm:col-span-2">
              <input
                type="checkbox"
                required
                className="mt-1 size-4 shrink-0 accent-[#17877e]"
              />
              <span>
                เข้าใจว่ารายงานนี้เป็นเพียงเบาะแส
                และข้อมูลจะต้องผ่านการตรวจสอบก่อนดำเนินการต่อ
              </span>
            </label>

            {sent && (
              <div
                role="status"
                className="flex items-start gap-2.5 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-xs leading-5 text-emerald-800 sm:col-span-2"
              >
                <CheckCircle2 size={17} className="mt-0.5 shrink-0" />
                <span>
                  <b className="block">รับรายงานตัวอย่างแล้ว</b>หมายเลขอ้างอิง{" "}
                  {reportId} · DEMO
                </span>
              </div>
            )}

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-1.5 text-[10px] leading-4 text-slate-400">
                <ShieldCheck size={14} /> ส่งเฉพาะข้อมูลที่จำเป็นต่อการตรวจสอบ
              </p>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1f3768] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#182c55] focus:outline-none focus:ring-4 focus:ring-[#1f3768]/20"
              >
                {sent ? "ส่งรายงานอีกครั้ง" : "ส่งรายงาน"}{" "}
                {sent ? <ArrowRight size={15} /> : <Send size={15} />}
              </button>
            </div>
          </div>
        </form>

        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <span className="grid size-10 place-items-center rounded-xl bg-white text-[#17877e] shadow-sm">
            <AlertCircle size={19} />
          </span>
          <h2 className="mt-4 text-sm font-bold text-[#1f3768]">
            ก่อนส่งรายงาน
          </h2>
          <ul className="mt-3 space-y-3 text-xs leading-5 text-slate-600">
            <li className="flex gap-2">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#17877e]" />
              ระบุลิงก์หรือชื่อแพลตฟอร์มที่พบ ถ้าทราบ
            </li>
            <li className="flex gap-2">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#17877e]" />
              บรรยายสิ่งที่เห็นตามข้อเท็จจริง
            </li>
            <li className="flex gap-2">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#17877e]" />
              ผลรายงานเป็นข้อมูลให้ตรวจสอบ ไม่ใช่ข้อสรุปการละเมิด
            </li>
          </ul>
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
