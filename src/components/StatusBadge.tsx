import type { SimilarityStatus } from "../types/app";
const styles: Record<SimilarityStatus, string> = {
  high: "bg-orange-50 text-orange-700 ring-orange-200",
  review: "bg-amber-50 text-amber-700 ring-amber-200",
  low: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};
const labels: Record<SimilarityStatus, string> = {
  high: "ควรตรวจสอบ",
  review: "ตรวจเพิ่ม",
  low: "สัญญาณต่ำ",
};
export function StatusBadge({ status }: { status: SimilarityStatus }) {
  return (
    <span
      className={`inline-flex rounded-md px-2 py-1 text-[10px] font-medium ring-1 ring-inset ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
