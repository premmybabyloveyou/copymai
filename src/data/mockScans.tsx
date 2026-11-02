import type { ScanRecord } from "../types/app";
export const mockScans: ScanRecord[] = [
  {
    id: "IP-240128",
    title: "ภาพประกอบ — สวนหลังฝน",
    type: "ภาพ",
    date: "28 ต.ค. 2026",
    score: 78,
    status: "high",
  },
  {
    id: "IP-240121",
    title: "นิยาย — ฤดูที่เราพบกัน",
    type: "ข้อความ",
    date: "25 ต.ค. 2026",
    score: 34,
    status: "low",
  },
  {
    id: "IP-240115",
    title: "เพลงเดโม — คืนที่ดาวเต็มฟ้า",
    type: "เสียง",
    date: "21 ต.ค. 2026",
    score: 52,
    status: "review",
  },
];
