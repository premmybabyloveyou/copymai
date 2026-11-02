import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type AuthMode = "login" | "register";
interface AuthPageProps {
  mode: AuthMode;
  switchMode: (mode: AuthMode) => void;
  success: () => void;
  backToLanding: () => void;
}

export function AuthPage({
  mode,
  switchMode,
  success,
  backToLanding,
}: AuthPageProps) {
  const isRegister = mode === "register";
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const data = new FormData(event.currentTarget);
    const password = String(data.get("password") ?? "");

    if (isRegister) {
      if (password.length < 8) {
        setMessageType("error");
        setMessage("รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร");
        return;
      }
      if (password !== String(data.get("confirmPassword") ?? "")) {
        setMessageType("error");
        setMessage("รหัสผ่านไม่ตรงกัน");
        return;
      }
      setMessageType("success");
      setMessage("สมัครสำเร็จในโหมดตัวอย่าง — ยังไม่มีการบันทึกบัญชีจริง");
      return;
    }

    const email = String(data.get("email") ?? "").trim();
    const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailLooksValid) {
      setMessageType("error");
      setMessage("รูปแบบอีเมลไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง");
      return;
    }
    if (password.length < 8) {
      setMessageType("error");
      setMessage("รหัสผ่านไม่ถูกต้อง ต้องมีอย่างน้อย 8 ตัวอักษร");
      return;
    }

    setMessageType("success");
    setMessage("เข้าสู่ระบบสำเร็จ กำลังพาไปยัง workspace...");
    window.setTimeout(success, 700);
  }

  const field =
    "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-[#14213d] outline-none transition placeholder:text-slate-400 focus:border-[#17877e] focus:ring-4 focus:ring-[#17877e]/10";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f8fb] px-4 py-8 font-sans text-[#14213d] sm:px-6 sm:py-10">
      <div className="w-full max-w-[460px]">
        <div className="mb-5 flex items-center justify-between gap-3 sm:mb-6">
          <button
            type="button"
            onClick={backToLanding}
            className="flex items-center gap-2 text-left"
            aria-label="กลับหน้าแรก"
          >
            <img src="/copymai-logo.svg" alt="" className="size-10 shrink-0" />
            <span className="flex flex-col leading-tight">
              <b className="text-sm font-extrabold tracking-wide text-[#1f3768]">
                COPYMAI
              </b>
              <small className="mt-1 text-[8px] font-medium tracking-[.14em] text-slate-500">
                COPYRIGHT INTELLIGENCE
              </small>
            </span>
          </button>
          <button
            type="button"
            onClick={backToLanding}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2 py-2 text-xs font-semibold text-slate-500 transition hover:bg-white hover:text-[#1f3768]"
            aria-label="กลับไปหน้า Landing Page"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">กลับหน้าแรก</span>
          </button>
        </div>

        <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_20px_60px_-35px_rgba(31,55,104,.28)] sm:p-8">
          <p className="text-[10px] font-bold tracking-[.16em] text-[#17877e]">
            {isRegister ? "CREATE YOUR ACCOUNT" : "WELCOME BACK"}
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#1f3768] sm:text-[28px]">
            {isRegister ? "สร้างบัญชีของคุณ" : "ยินดีต้อนรับกลับมา"}
          </h1>
          <p className="mt-1.5 text-sm leading-6 text-slate-500">
            {isRegister
              ? "เริ่มต้นดูแลผลงานของคุณ"
              : "เข้าสู่ระบบเพื่อไปยัง workspace"}
          </p>

          <div className="mt-6 grid grid-cols-2 rounded-xl bg-[#f1f4f7] p-1">
            <button
              type="button"
              onClick={() => {
                setMessage("");
                switchMode("login");
              }}
              className={`rounded-lg py-2.5 text-xs font-semibold transition ${
                !isRegister
                  ? "bg-white text-[#1f3768] shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              เข้าสู่ระบบ
            </button>
            <button
              type="button"
              onClick={() => {
                setMessage("");
                switchMode("register");
              }}
              className={`rounded-lg py-2.5 text-xs font-semibold transition ${
                isRegister
                  ? "bg-white text-[#1f3768] shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              สมัครสมาชิก
            </button>
          </div>

          <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
            {isRegister && (
              <label className="block text-xs font-medium text-slate-700">
                ชื่อที่ใช้แสดง
                <input
                  className={field}
                  name="displayName"
                  autoComplete="name"
                  placeholder="ชื่อและนามสกุล"
                  required
                />
              </label>
            )}
            <label className="block text-xs font-medium text-slate-700">
              อีเมล
              <input
                className={field}
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
              />
            </label>

            <label className="block text-xs font-medium text-slate-700">
              รหัสผ่าน
              <input
                className={field}
                name="password"
                type="password"
                autoComplete={isRegister ? "new-password" : "current-password"}
                minLength={isRegister ? 8 : undefined}
                placeholder={
                  isRegister ? "อย่างน้อย 8 ตัวอักษร" : "กรอกรหัสผ่าน"
                }
                required
              />
            </label>
            {isRegister && (
              <label className="block text-xs font-medium text-slate-700">
                ยืนยันรหัสผ่าน
                <input
                  className={field}
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                />
              </label>
            )}
            {isRegister && (
              <label className="flex items-start gap-2 text-xs leading-5 text-slate-500">
                <input
                  className="mt-1 size-4 shrink-0 accent-[#17877e]"
                  type="checkbox"
                  required
                />
                ยอมรับเงื่อนไขการใช้บริการและนโยบายความเป็นส่วนตัว
              </label>
            )}
            {message && (
              <p
                role={messageType === "error" ? "alert" : "status"}
                className={`rounded-xl px-3.5 py-2.5 text-xs leading-5 ${
                  messageType === "error"
                    ? "bg-rose-50 text-rose-700"
                    : "bg-emerald-50 text-emerald-800"
                }`}
              >
                {message}
              </p>
            )}
            {!isRegister && (
              <>
                <div className="flex items-center justify-between text-xs text-slate-500">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-[#17877e]" />
                  จดจำฉัน
                </label>
                <button
                  type="button"
                  className="font-semibold text-[#17877e] hover:text-[#126b65]"
                >
                  ลืมรหัสผ่าน?
                </button>
                </div>
              </>
            )}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1f3768] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#182c55] focus:outline-none focus:ring-4 focus:ring-[#1f3768]/20"
            >
              {isRegister ? "สร้างบัญชี" : "เข้าสู่ระบบ"}
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-5 border-t border-slate-100 pt-4 text-[10px] leading-5 text-slate-400">
            ตรวจรูปแบบข้อมูลเท่านั้น ยังไม่ได้ตรวจบัญชีกับระบบจริง
          </div>
        </section>
      </div>
    </main>
  );
}
