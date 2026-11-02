import type { ReactNode } from "react";
export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="mb-1 text-[10px] font-bold tracking-[.14em] text-ip-teal">
          COPYMAI · COPYRIGHT INTELLIGENCE
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-ip-navy">
          {title}
        </h1>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
      {action}
    </header>
  );
}
