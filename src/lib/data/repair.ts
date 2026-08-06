export interface RepairService {
  id: string;
  label: string;
  description: string;
  etaMinutes: number;
  priceFrom: number;
}

export const REPAIR_SERVICES: RepairService[] = [
  { id: "screen", label: "Screen Replacement", description: "Cracked, unresponsive, or discolored display", etaMinutes: 60, priceFrom: 2499 },
  { id: "battery", label: "Battery Replacement", description: "Drains fast, swollen, or won't hold charge", etaMinutes: 45, priceFrom: 1499 },
  { id: "charging-port", label: "Charging Port Repair", description: "Loose connection or won't charge at all", etaMinutes: 50, priceFrom: 999 },
  { id: "camera", label: "Camera Module", description: "Blurry, cracked lens, or app crashes", etaMinutes: 60, priceFrom: 1999 },
  { id: "water-damage", label: "Water Damage Diagnosis", description: "Liquid exposure inspection & recovery", etaMinutes: 1440, priceFrom: 799 },
  { id: "motherboard", label: "Motherboard Repair", description: "Won't power on, boot loops, chip-level faults", etaMinutes: 2880, priceFrom: 2999 },
  { id: "speaker-mic", label: "Speaker / Mic", description: "Muffled audio, no sound, or mic not detected", etaMinutes: 45, priceFrom: 899 },
  { id: "software", label: "Software / OS Issue", description: "Slow performance, boot issues, virus removal", etaMinutes: 60, priceFrom: 599 },
];

export const DEVICE_BRANDS = ["Apple", "Samsung", "OnePlus", "Xiaomi", "Vivo", "Oppo", "Realme", "Google"] as const;

export type RepairStatusStage =
  | "received"
  | "diagnosing"
  | "in-repair"
  | "quality-check"
  | "ready"
  | "completed";

export interface RepairTicket {
  ticketId: string;
  customerName: string;
  device: string;
  issue: string;
  stage: RepairStatusStage;
  createdAt: string;
  estimatedCompletion: string;
  technician: string;
  timeline: { stage: RepairStatusStage; label: string; timestamp: string; note?: string }[];
}

export const REPAIR_STAGE_META: Record<RepairStatusStage, { label: string; progress: number }> = {
  received: { label: "Device Received", progress: 10 },
  diagnosing: { label: "Diagnosing Issue", progress: 30 },
  "in-repair": { label: "Repair in Progress", progress: 55 },
  "quality-check": { label: "Quality Check", progress: 80 },
  ready: { label: "Ready for Pickup", progress: 95 },
  completed: { label: "Completed", progress: 100 },
};

// Deterministic mock lookup so the tracking demo is stable without a backend.
export function getMockRepairTicket(ticketId: string): RepairTicket | null {
  const normalized = ticketId.trim().toUpperCase();
  if (!normalized) return null;

  const seed = Array.from(normalized).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const stages: RepairStatusStage[] = ["received", "diagnosing", "in-repair", "quality-check", "ready"];
  const stage = stages[seed % stages.length];
  const devices = ["iPhone 13", "Galaxy S22", "OnePlus 11", "iPhone 12 Pro", "Redmi Note 12"];
  const issues = ["Screen Replacement", "Battery Replacement", "Charging Port Repair", "Camera Module"];

  const stageIndex = stages.indexOf(stage);
  const timeline = stages.slice(0, stageIndex + 1).map((s, i) => ({
    stage: s,
    label: REPAIR_STAGE_META[s].label,
    timestamp: `Day ${i + 1}, ${9 + i * 2}:${(seed * (i + 1)) % 60 < 10 ? "0" : ""}${(seed * (i + 1)) % 60} AM`,
  }));

  return {
    ticketId: normalized,
    customerName: "Valued Customer",
    device: devices[seed % devices.length],
    issue: issues[seed % issues.length],
    stage,
    createdAt: "Day 1, 9:15 AM",
    estimatedCompletion: stage === "ready" ? "Ready now" : `Day ${stageIndex + 2}, 6:00 PM`,
    technician: ["Karthik R.", "Suresh M.", "Priyanka S."][seed % 3],
    timeline,
  };
}
