export interface TradeInModel {
  id: string;
  brand: string;
  model: string;
  baseValue: number;
  storageOptions: { label: string; multiplier: number }[];
}

export const TRADE_IN_BRANDS = ["Apple", "Samsung", "OnePlus", "Xiaomi", "Vivo", "Oppo", "Google"] as const;

export const TRADE_IN_MODELS: TradeInModel[] = [
  { id: "iphone-15-pro", brand: "Apple", model: "iPhone 15 Pro", baseValue: 78000, storageOptions: [{ label: "128GB", multiplier: 1 }, { label: "256GB", multiplier: 1.12 }, { label: "512GB", multiplier: 1.28 }] },
  { id: "iphone-14", brand: "Apple", model: "iPhone 14", baseValue: 48000, storageOptions: [{ label: "128GB", multiplier: 1 }, { label: "256GB", multiplier: 1.1 }] },
  { id: "iphone-13", brand: "Apple", model: "iPhone 13", baseValue: 34000, storageOptions: [{ label: "128GB", multiplier: 1 }, { label: "256GB", multiplier: 1.1 }] },
  { id: "iphone-12", brand: "Apple", model: "iPhone 12", baseValue: 24000, storageOptions: [{ label: "64GB", multiplier: 1 }, { label: "128GB", multiplier: 1.08 }] },
  { id: "iphone-11", brand: "Apple", model: "iPhone 11", baseValue: 16000, storageOptions: [{ label: "64GB", multiplier: 1 }, { label: "128GB", multiplier: 1.08 }] },
  { id: "s24-ultra", brand: "Samsung", model: "Galaxy S24 Ultra", baseValue: 68000, storageOptions: [{ label: "256GB", multiplier: 1 }, { label: "512GB", multiplier: 1.15 }] },
  { id: "s23", brand: "Samsung", model: "Galaxy S23", baseValue: 38000, storageOptions: [{ label: "128GB", multiplier: 1 }, { label: "256GB", multiplier: 1.1 }] },
  { id: "s21", brand: "Samsung", model: "Galaxy S21", baseValue: 18000, storageOptions: [{ label: "128GB", multiplier: 1 }] },
  { id: "oneplus-12", brand: "OnePlus", model: "OnePlus 12", baseValue: 42000, storageOptions: [{ label: "256GB", multiplier: 1 }] },
  { id: "oneplus-11", brand: "OnePlus", model: "OnePlus 11", baseValue: 28000, storageOptions: [{ label: "128GB", multiplier: 1 }, { label: "256GB", multiplier: 1.1 }] },
  { id: "redmi-note-12", brand: "Xiaomi", model: "Redmi Note 12", baseValue: 9000, storageOptions: [{ label: "128GB", multiplier: 1 }] },
  { id: "pixel-8", brand: "Google", model: "Pixel 8", baseValue: 32000, storageOptions: [{ label: "128GB", multiplier: 1 }, { label: "256GB", multiplier: 1.1 }] },
];

export type TradeInCondition = "Like New" | "Good" | "Fair" | "Poor";

export const CONDITION_MULTIPLIERS: Record<TradeInCondition, { multiplier: number; description: string }> = {
  "Like New": { multiplier: 1, description: "No scratches, flawless screen, battery health 90%+" },
  Good: { multiplier: 0.85, description: "Minor wear, fully functional, battery health 80%+" },
  Fair: { multiplier: 0.65, description: "Visible scratches/dents, screen intact, works fine" },
  Poor: { multiplier: 0.4, description: "Heavy wear, cracked screen or battery/functional issues" },
};

export function estimateTradeInValue(modelId: string, storageLabel: string, condition: TradeInCondition) {
  const model = TRADE_IN_MODELS.find((m) => m.id === modelId);
  if (!model) return 0;
  const storage = model.storageOptions.find((s) => s.label === storageLabel) ?? model.storageOptions[0];
  const conditionInfo = CONDITION_MULTIPLIERS[condition];
  const value = model.baseValue * storage.multiplier * conditionInfo.multiplier;
  return Math.round(value / 100) * 100;
}
