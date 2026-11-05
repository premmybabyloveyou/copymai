import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  Download,
  ScanSearch,
  ShieldCheck,
} from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import type { PageId, ScanRecord, UploadedWork } from "../types/app";

const demoNovelWork =
  "หลังฝนหยุด สวนก็ยังเก็บความชื้นเอาไว้บนใบไม้ ทุกย่างก้าวพาให้เธอนึกถึงเรื่องราวที่เคยเกิดขึ้นในฤดูฝนที่ผ่านมา…";
const demoNovelReference =
  "ในเช้าวันหนึ่งหลังพายุผ่านไป ลลินเดินกลับมายังสวนพฤกษาที่เคยมาเยือนเมื่อตอนเด็ก หยดฝนยังเกาะตามกลีบดอกไม้และส่งประกายเมื่อแสงอาทิตย์ลอดผ่านกิ่งไม้\n\nข้างบ่อน้ำมีต้นมะลิออกดอกสีขาว กลิ่นของมันทำให้เธอนึกถึงคำสัญญาที่เคยให้ไว้กับเพื่อนคนหนึ่ง ว่าสักวันทั้งคู่จะกลับมาที่สวนแห่งนี้อีกครั้ง";

export function ResultsPage({
  back,
  navigate,
  uploadedWork,
  scanRecord,
}: {
  back: () => void;
  navigate: (page: PageId) => void;
  uploadedWork?: UploadedWork;
  scanRecord?: ScanRecord;
}) {
  const category =
    uploadedWork?.category ??
    (scanRecord?.type === "ข้อความ"
      ? "ข้อความ / วรรณกรรม"
      : scanRecord?.type === "เสียง"
      ? "เสียง / เพลง"
      : "ภาพ / กราฟิก");
  const isNovel = category === "ข้อความ / วรรณกรรม";
  const isAudio = category === "เสียง / เพลง";
  const title = isNovel
    ? "นิยาย / ข้อความ"
    : isAudio
    ? "เสียง / เพลง"
    : "ภาพ / กราฟิก";
  const score = scanRecord
    ? `${scanRecord.score}%`
    : isNovel
    ? "68%"
    : isAudio
    ? "73%"
    : "78%";
  const workTitle = uploadedWork?.name ?? scanRecord?.title ?? "สวนหลังฝน";
  const [baseValue, setBaseValue] = useState(1000);
  const [foundCount, setFoundCount] = useState(5);
  const [durationMultiplier, setDurationMultiplier] = useState(1.2);

  const estimatedAmount = Math.round(
    baseValue * foundCount * durationMultiplier,
  );

  return (
    <div className="space-y-5 sm:space-y-6">
      <PageHeader
        title="ผลการตรวจสอบ"
        description={`ผลเปรียบเทียบสำหรับประเภท ${title}`}
        action={
          <button
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-[#1f3768] transition hover:bg-slate-50"
            onClick={back}
          >
            <ArrowLeft size={14} />
            ตรวจงานอื่น
          </button>
        }
      />

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_14px_40px_-30px_rgba(31,55,104,.25)]">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 sm:px-5">
          <div>
            <p className="text-[9px] font-bold tracking-[.14em] text-[#17877e]">
              {isNovel
                ? "TEXT COMPARISON"
                : isAudio
                ? "AUDIO COMPARISON"
                : "IMAGE COMPARISON"}
            </p>
            <h2 className="mt-1 text-sm font-bold text-[#1f3768]">
              ผลเปรียบเทียบ{title}
            </h2>
          </div>
          <span className="rounded-full bg-amber-50 px-3 py-1.5 text-[10px] font-bold text-amber-700">
            คะแนนตัวอย่าง {score}
          </span>
        </header>

        {isNovel ? (
          <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5">
            <article className="min-w-0 rounded-xl border border-slate-200 bg-[#fffefa] p-4">
              <p className="text-[9px] font-bold tracking-wide text-[#17877e]">
                {uploadedWork?.excerpt
                  ? `ต้นฉบับ · ${uploadedWork.name}`
                  : `ต้นฉบับ · ${workTitle}`}
              </p>
              <p className="mt-3 max-h-72 overflow-y-auto whitespace-pre-wrap break-words text-xs leading-6 text-slate-700">
                {uploadedWork?.excerpt || demoNovelWork}
              </p>
            </article>
            <article className="min-w-0 rounded-xl border border-slate-200 bg-[#fffefa] p-4">
              <p className="text-[9px] font-bold tracking-wide text-[#17877e]">
                ข้อความอ้างอิงตัวอย่าง
              </p>
              <p className="mt-3 max-h-72 overflow-y-auto whitespace-pre-wrap break-words text-xs leading-6 text-slate-700">
                {demoNovelReference}
              </p>
            </article>
          </div>
        ) : isAudio ? (
          <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5">
            <article className="rounded-xl border border-slate-200 bg-[#f8fafc] p-4">
              <p className="text-[9px] font-bold tracking-wide text-[#17877e]">
                {isAudio && uploadedWork?.audioUrl
                  ? `เสียงจากผลงาน · ${uploadedWork.name}`
                  : `เสียงตัวอย่าง · ${workTitle}`}
              </p>
              <audio
                controls
                preload="metadata"
                src={uploadedWork?.audioUrl ?? "/samples/audio-work-demo.wav"}
                className="mt-3 h-10 w-full"
                aria-label="เล่นเสียงจากผลงาน"
              />
            </article>
            <article className="rounded-xl border border-slate-200 bg-[#f8fafc] p-4">
              <p className="text-[9px] font-bold tracking-wide text-[#17877e]">
                เสียงอ้างอิงตัวอย่าง
              </p>
              <audio
                controls
                preload="metadata"
                src="/samples/audio-reference-demo.wav"
                className="mt-3 h-10 w-full"
                aria-label="เล่นเสียงอ้างอิง"
              />
            </article>
          </div>
        ) : (
          <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5">
            <article className="min-w-0">
              <p className="mb-2 text-[10px] font-semibold text-slate-500">
                {uploadedWork?.previewUrl
                  ? `ผลงานของคุณ · ${uploadedWork.name}`
                  : "ผลงานตัวอย่าง · สวนหลังฝน"}
              </p>
              <div className="aspect-[8/5] overflow-hidden rounded-xl bg-slate-100">
                {uploadedWork?.previewUrl ? (
                  <img
                    src={uploadedWork.previewUrl}
                    alt="ผลงานภาพที่อัปโหลด"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src="/images/uploaded-work-demo.svg"
                    alt="ภาพผลงานตัวอย่างสวนหลังฝน"
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </article>
            <article className="min-w-0">
              <p className="mb-2 text-[10px] font-semibold text-slate-500">
                ภาพอ้างอิงตัวอย่าง · สวนพฤกษาในฤดูฝน
              </p>
              <div className="aspect-[8/5] overflow-hidden rounded-xl bg-slate-100">
                <img
                  src="/images/reference-work-demo.svg"
                  alt="ภาพอ้างอิงตัวอย่างสวนพฤกษาในฤดูฝน"
                  className="h-full w-full object-cover"
                />
              </div>
            </article>
          </div>
        )}
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_14px_40px_-30px_rgba(31,55,104,.2)] sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold tracking-[.14em] text-[#17877e]">
                SIMILARITY OVERVIEW
              </p>
              <h2 className="mt-1 text-sm font-bold text-[#1f3768]">
                ระดับความคล้ายทางเทคนิค
              </h2>
            </div>
            <b className="text-2xl font-bold text-amber-700">{score}</b>
          </div>
          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full bg-gradient-to-r from-amber-300 to-amber-600 ${
                isNovel ? "w-[68%]" : isAudio ? "w-[73%]" : "w-[78%]"
              }`}
            />
          </div>
          <p className="mt-3 text-[10px] leading-5 text-slate-500">
            คะแนนนี้เป็นข้อมูลตัวอย่างเพื่อสาธิต UI ไม่ใช่ผลจากโมเดลจริง
          </p>
        </div>
        <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
          <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#17877e]" />
          <p className="text-[11px] leading-5 text-slate-600">
            ควรตรวจคู่เทียบ แหล่งที่มา
            และบริบทของผลงานโดยผู้เชี่ยวชาญก่อนดำเนินการต่อ
          </p>
        </div>
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_14px_40px_-30px_rgba(31,55,104,.2)] sm:p-5">
        <div className="flex items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#eef5f4] text-[#17877e]">
            <Calculator size={19} />
          </span>
          <div>
            <p className="text-[10px] font-bold tracking-[.14em] text-[#17877e]">
              DEMO ESTIMATE
            </p>
            <h2 className="mt-1 text-sm font-bold text-[#1f3768]">
              ประเมินมูลค่าความเสียหายเบื้องต้น
            </h2>
            <p className="mt-1 text-[10px] leading-5 text-slate-500">
              ปรับสมมติฐานเพื่อดูตัวอย่างการคำนวณ ตัวเลขนี้ไม่ได้คำนวณจากคะแนนความคล้าย
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <label className="text-[11px] font-medium text-slate-600">
            มูลค่าฐานต่อครั้ง (บาท)
            <input
              type="number"
              min="0"
              value={baseValue}
              onChange={(event) =>
                setBaseValue(Math.max(0, Number(event.target.value)))
              }
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#17877e] focus:ring-4 focus:ring-[#17877e]/10"
            />
          </label>

          <label className="text-[11px] font-medium text-slate-600">
            จำนวนครั้ง/รายการที่พบ
            <input
              type="number"
              min="0"
              value={foundCount}
              onChange={(event) =>
                setFoundCount(Math.max(0, Number(event.target.value)))
              }
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#17877e] focus:ring-4 focus:ring-[#17877e]/10"
            />
          </label>

          <label className="text-[11px] font-medium text-slate-600">
            ตัวคูณระยะเวลา
            <input
              type="number"
              min="0"
              step="0.1"
              value={durationMultiplier}
              onChange={(event) =>
                setDurationMultiplier(Math.max(0, Number(event.target.value)))
              }
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#17877e] focus:ring-4 focus:ring-[#17877e]/10"
            />
          </label>
        </div>

        <div className="mt-4 rounded-xl bg-[#f5f8fa] p-4">
          <p className="text-[10px] text-slate-500">
            สูตรตัวอย่าง: มูลค่าฐาน × จำนวนที่พบ × ตัวคูณระยะเวลา
          </p>
          <p className="mt-1 text-xl font-bold text-[#1f3768]">
            ฿{estimatedAmount.toLocaleString("th-TH")}
          </p>
        </div>

        <p className="mt-3 text-[10px] leading-5 text-amber-800">
          เป็นตัวเลขจำลองเพื่อประกอบการคัดกรอง ไม่ใช่การประเมินทางกฎหมาย
          หรือยอดเรียกร้องจริง ควรให้ผู้เชี่ยวชาญพิจารณาข้อเท็จจริงและหลักฐาน
        </p>
      </section>

      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-[#1f3768] transition hover:bg-slate-50"
        >
          <Download size={15} />
          ดาวน์โหลดรายงาน
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1f3768] px-4 py-3 text-xs font-semibold text-white transition hover:bg-[#182c55]"
        >
          <ScanSearch size={15} />
          ส่งให้ผู้เชี่ยวชาญตรวจ
          <ArrowRight size={14} />
        </button>
      </div>
      <div className="flex items-start gap-3 rounded-xl border border-amber-100 bg-amber-50/70 p-4 text-[11px] leading-5 text-amber-900">
        <ShieldCheck size={16} className="mt-0.5 shrink-0" />
        ผลและคะแนนในหน้านี้เป็นข้อมูลจำลองสำหรับ mockup ไม่ใช่ผลจาก AI
        หรือข้อสรุปทางกฎหมาย
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
                className="w-fit text-left text-[11px] text-slate-500 hover:text-[#17877e]"
              >
                ตรวจความคล้าย
              </button>
              <button
                onClick={() => navigate("reports")}
                className="w-fit text-left text-[11px] text-slate-500 hover:text-[#17877e]"
              >
                ผลการตรวจ
              </button>
              <button
                onClick={() => navigate("community-report")}
                className="w-fit text-left text-[11px] text-slate-500 hover:text-[#17877e]"
              >
                แจ้งเบาะแส
              </button>
              <button
                onClick={() => navigate("plans")}
                className="w-fit text-left text-[11px] text-slate-500 hover:text-[#17877e]"
              >
                แพ็กเกจ
              </button>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-[#1f3768]">ข้อควรทราบ</h3>
            <p className="mt-3 text-[10px] leading-5 text-slate-500">
              ระบบต้นแบบแสดงตัวอย่างการเปรียบเทียบ
              ไม่ได้ประเมินการละเมิดลิขสิทธิ์จริง
            </p>
            <div className="mt-4 flex flex-col gap-1 border-t border-slate-200 pt-3 text-[9px] text-slate-400">
              <span>© 2026 COPYMAI · Prototype</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
