import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { supabase } from "../lib/supabase";

type AuthMode = "login" | "register" | "reset";

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
  const isReset = mode === "reset";

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success",
  );
  const [submitting, setSubmitting] = useState(false);

  async function handleForgotPassword() {
    if (!email.trim()) {
      setMessageType("error");
      setMessage("กรอกอีเมลก่อน แล้วกดลืมรหัสผ่านอีกครั้ง");
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        { redirectTo: window.location.origin },
      );

      if (error) {
        setMessageType("error");
        setMessage(`ส่งลิงก์ไม่สำเร็จ: ${error.message}`);
      } else {
        setMessageType("success");
        setMessage(
          "ถ้าอีเมลนี้มีบัญชีอยู่ ระบบจะส่งลิงก์รีเซ็ตให้ โปรดตรวจใน Email",
        );
      }
    } catch {
      setMessageType("error");
      setMessage("เชื่อมต่อระบบไม่ได้ กรุณาลองใหม่");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const data = new FormData(event.currentTarget);
    const password = String(data.get("password") ?? "");

    if (
      (isRegister || isReset) &&
      password !== String(data.get("confirmPassword") ?? "")
    ) {
      setMessageType("error");
      setMessage("รหัสผ่านไม่ตรงกัน");
      return;
    }

    setSubmitting(true);

    try {
      if (isReset) {
        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
          setMessageType("error");
          setMessage(`เปลี่ยนรหัสผ่านไม่สำเร็จ: ${error.message}`);
          return;
        }

        setMessageType("success");
        setMessage("เปลี่ยนรหัสผ่านสำเร็จ กำลังเข้าสู่ระบบ...");
        window.setTimeout(success, 700);
        return;
      }

      const formEmail = String(data.get("email") ?? "").trim();

      if (isRegister) {
        const { data: authData, error } = await supabase.auth.signUp({
          email: formEmail,
          password,
          options: {
            data: {
              display_name: String(data.get("displayName") ?? "").trim(),
              account_type: String(data.get("accountType") ?? "personal"),
            },
            emailRedirectTo: window.location.origin,
          },
        });

        if (error) {
          setMessageType("error");
          setMessage(`สมัครไม่สำเร็จ: ${error.message}`);
          return;
        }

        setEmail(formEmail);

        if (authData.session) {
          await supabase.auth.signOut();
        }

        const confirmationMessage = authData.session
          ? "สมัครสำเร็จ กรุณาเข้าสู่ระบบด้วยอีเมลและรหัสผ่านที่ใช้สมัคร"
          : "สมัครสำเร็จ กรุณายืนยันอีเมลจากกล่องจดหมาย แล้วเข้าสู่ระบบ";

        setMessageType("success");
        setMessage("สมัครสำเร็จ กำลังพาไปหน้าเข้าสู่ระบบ...");

        window.setTimeout(() => {
          switchMode("login");
          setMessage(confirmationMessage);
        }, 700);

        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: formEmail,
        password,
      });

      if (error) {
        setMessageType("error");
        setMessage(
          "เข้าสู่ระบบไม่สำเร็จ ตรวจอีเมล รหัสผ่าน และการยืนยันอีเมล แล้วลองอีกครั้ง",
        );
        return;
      }

      setMessageType("success");
      setMessage("เข้าสู่ระบบสำเร็จ กำลังพาไปยัง workspace...");
      window.setTimeout(success, 500);
    } catch {
      setMessageType("error");
      setMessage("เชื่อมต่อระบบไม่ได้ กรุณาตรวจอินเทอร์เน็ตแล้วลองใหม่");
    } finally {
      setSubmitting(false);
    }
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
            {isRegister
              ? "CREATE YOUR ACCOUNT"
              : isReset
                ? "PASSWORD RECOVERY"
                : "WELCOME BACK"}
          </p>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#1f3768] sm:text-[28px]">
            {isRegister
              ? "สร้างบัญชีของคุณ"
              : isReset
                ? "ตั้งรหัสผ่านใหม่"
                : "ยินดีต้อนรับกลับมา"}
          </h1>

          <p className="mt-1.5 text-sm leading-6 text-slate-500">
            {isRegister
              ? "เริ่มต้นดูแลผลงานของคุณ"
              : isReset
                ? "กรอกรหัสผ่านใหม่และยืนยันรหัสผ่าน"
                : "เข้าสู่ระบบเพื่อไปยัง workspace"}
          </p>

          {!isReset ? (
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
          ) : (
            <button
              type="button"
              onClick={() => switchMode("login")}
              className="mt-5 text-xs font-semibold text-[#17877e] hover:text-[#126b65]"
            >
              กลับไปหน้าเข้าสู่ระบบ
            </button>
          )}

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

            {!isReset && (
              <label className="block text-xs font-medium text-slate-700">
                อีเมล
                <input
                  className={field}
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </label>
            )}

            {isRegister && (
              <label className="block text-xs font-medium text-slate-700">
                ประเภทบัญชี
                <select
                  className={field}
                  name="accountType"
                  defaultValue="personal"
                >
                  <option value="personal">บุคคล / ผู้สร้างสรรค์</option>
                  <option value="company">บริษัท / องค์กร</option>
                </select>
              </label>
            )}

            <label className="block text-xs font-medium text-slate-700">
              {isReset ? "รหัสผ่านใหม่" : "รหัสผ่าน"}
              <input
                className={field}
                name="password"
                type="password"
                autoComplete={
                  isRegister || isReset ? "new-password" : "current-password"
                }
                minLength={isRegister || isReset ? 8 : undefined}
                placeholder={
                  isRegister || isReset
                    ? "อย่างน้อย 8 ตัวอักษร"
                    : "กรอกรหัสผ่าน"
                }
                required
              />
            </label>

            {(isRegister || isReset) && (
              <label className="block text-xs font-medium text-slate-700">
                ยืนยันรหัสผ่าน
                <input
                  className={field}
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  minLength={8}
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

            {!isRegister && !isReset && (
              <div className="flex items-center justify-between gap-3 text-xs text-slate-500">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-[#17877e]" />
                  จดจำฉัน
                </label>

                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => void handleForgotPassword()}
                  className="font-semibold text-[#17877e] hover:text-[#126b65] disabled:opacity-60"
                >
                  ลืมรหัสผ่าน?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1f3768] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#182c55] focus:outline-none focus:ring-4 focus:ring-[#1f3768]/20 disabled:cursor-wait disabled:opacity-60"
            >
              {submitting
                ? "กำลังดำเนินการ..."
                : isRegister
                  ? "สร้างบัญชี"
                  : isReset
                    ? "บันทึกรหัสผ่านใหม่"
                    : "เข้าสู่ระบบ"}
              {!submitting && <ArrowRight size={16} />}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}