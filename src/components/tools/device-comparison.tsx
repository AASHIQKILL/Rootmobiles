"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

import { COMPARE_DEVICES, type CompareDevice } from "@/lib/data/compare";
import { formatINR } from "@/lib/format";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const SPEC_ROWS: { key: keyof CompareDevice["specs"]; label: string }[] = [
  { key: "display", label: "Display" },
  { key: "chip", label: "Chip" },
  { key: "ram", label: "RAM" },
  { key: "storage", label: "Storage" },
  { key: "battery", label: "Battery" },
  { key: "camera", label: "Camera" },
  { key: "charging", label: "Charging" },
  { key: "weight", label: "Weight" },
];

const MAX_SLOTS = 3;

export function DeviceComparison() {
  const [selectedIds, setSelectedIds] = useState<(string | null)[]>([
    COMPARE_DEVICES[0].id,
    COMPARE_DEVICES[1].id,
    null,
  ]);

  const devices = selectedIds.map((id) => COMPARE_DEVICES.find((d) => d.id === id) ?? null);

  function setSlot(index: number, id: string | null) {
    setSelectedIds((prev) => prev.map((v, i) => (i === index ? id : v)));
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[720px]">
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: `10rem repeat(${MAX_SLOTS}, minmax(0, 1fr))` }}
        >
          <div />
          {devices.map((device, i) => (
            <div key={i} className="glass rounded-2xl p-5">
              {device ? (
                <div>
                  <button
                    onClick={() => setSlot(i, null)}
                    aria-label="Remove device"
                    className="float-right text-muted-foreground transition-colors hover:text-destructive cursor-pointer"
                  >
                    <X className="size-4" />
                  </button>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={device.image} alt={device.name} className="mx-auto h-24 object-contain" />
                  <p className="mt-3 text-center font-display text-sm font-semibold">{device.name}</p>
                  <p className="text-center text-xs text-accent">{formatINR(device.price)}</p>
                </div>
              ) : (
                <SelectDeviceSlot
                  usedIds={selectedIds.filter((id): id is string => Boolean(id))}
                  onSelect={(id) => setSlot(i, id)}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 divide-y divide-border rounded-2xl border border-border">
          {SPEC_ROWS.map((row) => (
            <div key={row.key} className="grid" style={{ gridTemplateColumns: `10rem repeat(${MAX_SLOTS}, minmax(0, 1fr))` }}>
              <div className="flex items-center bg-white/[0.02] px-4 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {row.label}
              </div>
              {devices.map((device, i) => (
                <div
                  key={i}
                  className={cn(
                    "px-4 py-3 text-sm",
                    device ? "text-foreground/90" : "text-muted-foreground/40"
                  )}
                >
                  {device ? device.specs[row.key] : "—"}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SelectDeviceSlot({ usedIds, onSelect }: { usedIds: string[]; onSelect: (id: string) => void }) {
  const available = COMPARE_DEVICES.filter((d) => !usedIds.includes(d.id));

  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger className="!h-auto flex-col gap-2 border-dashed py-8 text-muted-foreground">
        <Plus className="size-5" />
        <SelectValue placeholder="Add a device" />
      </SelectTrigger>
      <SelectContent>
        {available.map((d) => (
          <SelectItem key={d.id} value={d.id}>
            {d.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
