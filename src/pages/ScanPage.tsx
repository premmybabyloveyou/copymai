import { useState } from "react";
import {
  BookOpen,
  FileSearch,
  FileUp,
  Image,
  Music2,
  ShieldCheck,
} from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import type { PageId, UploadedWork } from "../types/app";

export function ScanPage({
  done,
  navigate,
}: {
  done: (work?: UploadedWork) => void;
  navigate: (page: PageId) => void;
}) {
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [category, setCategory] = useState("ภาพ / กราฟิก");
  const [scanMode, setScanMode] = useState<"infringement" | "pre-registration">(
    "infringement"
  );
  const [message, setMessage] = useState("");
  const field =
    "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-[#14213d] outline-none transition placeholder:text-slate-400 focus:border-[#17877e] focus:ring-4 focus:ring-[#17877e]/10";

  function startScan(file = selectedFile, workCategory = category) {
    if (!file) {
      setMessage("เลือกไฟล์หรือกดปุ่มตัวอย่างด้านล่างก่อนเริ่มตรวจ");
      return;
    }
    const previewUrl = file.type.startsWith("image/")
      ? URL.createObjectURL(file)
      : undefined;
    const audioUrl = file.type.startsWith("audio/")
      ? URL.createObjectURL(file)
      : undefined;
    const isText =
      file.type === "text/plain" || file.name.toLowerCase().endsWith(".txt");
    if (isText) {
      void file.text().then((text) =>
        done({
          name: file.name,
          category: workCategory,
          previewUrl,
          audioUrl,
          excerpt: text.slice(0, 1500),
        })
      );
    } else {
      done({ name: file.name, category: workCategory, previewUrl, audioUrl });
    }
  }

  async function showNovelDemo() {
    const response = await fetch("/samples/copymai-novel-demo.txt");
    const excerpt = response.ok
      ? (await response.text()).slice(0, 1500)
      : "หลังฝนหยุด สวนก็ยังเก็บความชื้นเอาไว้บนใบไม้ ทุกย่างก้าวพาให้เธอนึกถึงเรื่องราวที่เคยเกิดขึ้นในฤดูฝนที่ผ่านมา…";
    startScan(
      new File([excerpt], "สวนหลังฝน-ตัวอย่างนิยาย.txt", {
        type: "text/plain",
      }),
      "ข้อความ / วรรณกรรม"
    );
  }

  function showImageDemo() {
    done({
      name: "สวนหลังฝน-demo.svg",
      category: "ภาพ / กราฟิก",
      previewUrl: "/images/uploaded-work-demo.svg",
    });
  }

  function showAudioDemo() {
    done({
      name: "ทำนองสวนหลังฝน-demo.wav",
      category: "เสียง / เพลง",
      audioUrl: "/samples/audio-work-demo.wav",
    });
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      <PageHeader
        title="ตรวจสอบความคล้าย"
        description="อัปโหลดผลงานเพื่อค้นหาคู่เทียบในแหล่งข้อมูลที่เชื่อมต่อ"
      />
      {message && (
        <p
          role="status"
          className="rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-xs text-amber-900"
        >
          {message}
        </p>
      )}

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_280px]">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_14px_40px_-30px_rgba(31,55,104,.25)]">
          <div className="flex items-start gap-3 border-b border-slate-100 px-5 py-4 sm:px-7">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-slate-100 text-[#1f3768]">
              <FileSearch size={19} />
            </span>
            <div>
              <h2 className="text-sm font-bold text-[#1f3768]">
                รายละเอียดผลงาน
              </h2>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                เลือกประเภทผลงานและไฟล์ที่ต้องการตรวจ
              </p>
            </div>
          </div>
          <div className="p-5 sm:p-7">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              <label className="block text-xs font-semibold text-slate-700">
                ชื่อผลงาน{" "}
                <span className="font-normal text-slate-400">(ไม่บังคับ)</span>
                <input className={field} placeholder="เช่น ภาพสวนหลังฝน" />
              </label>
              <label className="block text-xs font-semibold text-slate-700">
                ประเภทผลงาน
                <select
                  className={`${field} cursor-pointer`}
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  <option>ภาพ / กราฟิก</option>
                  <option>ข้อความ / วรรณกรรม</option>
                  <option>เสียง / เพลง</option>
                  <option>วิดีโอ / การแสดง</option>
                </select>
              </label>
              <label className="group col-span-full flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-[#fbfcfd] p-5 text-center transition hover:border-[#17877e] hover:bg-[#f5faf9] sm:min-h-48">
                <span className="grid size-12 place-items-center rounded-2xl bg-[#eaf6f3] text-[#17877e]">
                  <FileUp size={22} />
                </span>
                <b className="mt-3 max-w-full truncate text-sm text-[#1f3768]">
                  {fileName || "เลือกไฟล์ผลงาน"}
                </b>
                <small className="mt-1 text-[10px] leading-5 text-slate-500">
                  PNG, JPG, TXT, PDF, MP3, WAV · สูงสุด 25 MB
                </small>
                <input
                  className="mt-3 max-w-full text-[10px] text-slate-500 file:mr-2 file:rounded-lg file:border-0 file:bg-[#1f3768] file:px-3 file:py-2 file:text-[10px] file:font-semibold file:text-white hover:file:bg-[#182c55]"
                  type="file"
                  accept="image/png,image/jpeg,image/webp,.txt,text/plain,application/pdf,audio/mpeg,audio/wav,.mp3,.wav"
                  onChange={(event) => {
                    const file = event.target.files?.[0] ?? null;
                    setSelectedFile(file);
                    setFileName(file?.name ?? "");
                    setMessage("");
                  }}
                />
              </label>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
              <button
                type="button"
                onClick={showImageDemo}
                className="inline-flex items-center gap-1.5 py-1 text-[10px] font-medium text-[#17877e] hover:text-[#126b65]"
              >
                <Image size={13} />
                ลองภาพตัวอย่าง
              </button>
              <button
                type="button"
                onClick={showNovelDemo}
                className="inline-flex items-center gap-1.5 py-1 text-[10px] font-medium text-[#17877e] hover:text-[#126b65]"
              >
                <BookOpen size={13} />
                ลองนิยายตัวอย่าง
              </button>
              <button
                type="button"
                onClick={showAudioDemo}
                className="inline-flex items-center gap-1.5 py-1 text-[10px] font-medium text-[#17877e] hover:text-[#126b65]"
              >
                <Music2 size={13} />
                ลองเสียงตัวอย่าง
              </button>
              <a
                href="/samples/copymai-novel-demo.txt"
                download
                className="py-1 text-[10px] font-medium text-slate-500 underline decoration-slate-300 underline-offset-4 hover:text-[#1f3768]"
              >
                ดาวน์โหลดนิยายตัวอย่าง
              </a>
            </div>

            <div className="inline-flex max-w-full rounded-xl border border-slate-200 bg-slate-50 p-1">
              <button
                type="button"
                aria-pressed={scanMode === "infringement"}
                onClick={() => setScanMode("infringement")}
                className={`rounded-lg px-3 py-2 text-xs font-semibold transition sm:px-4 ${
                  scanMode === "infringement"
                    ? "bg-[#1f3768] text-white shadow-sm"
                    : "text-slate-600 hover:bg-white hover:text-[#1f3768]"
                }`}
              >
                ตรวจสอบการละเมิด
              </button>

              <button
                type="button"
                aria-pressed={scanMode === "pre-registration"}
                onClick={() => setScanMode("pre-registration")}
                className={`rounded-lg px-3 py-2 text-xs font-semibold transition sm:px-4 ${
                  scanMode === "pre-registration"
                    ? "bg-[#1f3768] text-white shadow-sm"
                    : "text-slate-600 hover:bg-white hover:text-[#1f3768]"
                }`}
              >
                เช็กก่อนยื่นจดสิทธิ์
              </button>
            </div>

            <button
              type="button"
              onClick={() => startScan()}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1f3768] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#182c55] focus:outline-none focus:ring-4 focus:ring-[#17877e]/20"
            >
              {scanMode === "infringement"
                ? "เริ่มตรวจสอบการละเมิด"
                : "ตรวจผลงานก่อนยื่นจดสิทธิ์"}
            </button>
          </div>
        </section>

        <aside className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <span className="grid size-10 place-items-center rounded-xl bg-[#eaf6f3] text-[#17877e]">
            <ShieldCheck size={19} />
          </span>
          <h2 className="mt-4 text-sm font-bold text-[#1f3768]">
            ก่อนเริ่มตรวจ
          </h2>
          <ul className="mt-3 space-y-3 text-xs leading-5 text-slate-600">
            <li className="flex gap-2.5">
              <Image size={15} className="mt-0.5 shrink-0 text-[#17877e]" />
              เลือกประเภทให้ตรงกับไฟล์
            </li>
            <li className="flex gap-2.5">
              <BookOpen size={15} className="mt-0.5 shrink-0 text-[#17877e]" />
              ไฟล์นิยายตัวอย่างรองรับ .txt
            </li>
            <li className="flex gap-2.5">
              <Music2 size={15} className="mt-0.5 shrink-0 text-[#17877e]" />
              ไฟล์เสียงตัวอย่างรองรับ MP3/WAV
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
