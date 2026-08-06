import { PRODUCTS, type Product } from "@/lib/data/products";

export interface QuizOption {
  id: string;
  label: string;
  tags: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "budget",
    question: "What's your budget range?",
    options: [
      { id: "budget-low", label: "Under ₹40,000", tags: ["budget-low"] },
      { id: "budget-mid", label: "₹40,000 – ₹80,000", tags: ["budget-mid"] },
      { id: "budget-high", label: "Above ₹80,000", tags: ["budget-high"] },
    ],
  },
  {
    id: "priority",
    question: "What matters most to you?",
    options: [
      { id: "camera", label: "Camera quality", tags: ["camera"] },
      { id: "performance", label: "Gaming & performance", tags: ["performance"] },
      { id: "battery", label: "Battery life", tags: ["battery"] },
      { id: "value", label: "Best value for money", tags: ["value"] },
    ],
  },
  {
    id: "ecosystem",
    question: "Which ecosystem do you prefer?",
    options: [
      { id: "ios", label: "Apple / iOS", tags: ["Apple"] },
      { id: "android", label: "Android", tags: ["Samsung", "OnePlus", "Google"] },
      { id: "no-pref", label: "No preference", tags: [] },
    ],
  },
  {
    id: "condition",
    question: "New or certified pre-owned?",
    options: [
      { id: "new-only", label: "Brand new, sealed box", tags: ["New"] },
      { id: "open-refurb", label: "Open to certified pre-owned for savings", tags: ["Certified Pre-Owned"] },
      { id: "either", label: "Either works", tags: [] },
    ],
  },
];

const PRIORITY_BOOST: Record<string, string[]> = {
  camera: ["p1", "p2"],
  performance: ["p2", "p4"],
  battery: ["p4", "p2"],
  value: ["p3", "p4"],
};

export function recommendProducts(answers: Record<string, string[]>): Product[] {
  const budgetTag = answers.budget?.[0];
  const priorityTag = answers.priority?.[0];
  const ecosystemTags = answers.ecosystem ?? [];
  const conditionTag = answers.condition?.[0];

  const candidates = PRODUCTS.filter((p) => p.category === "Smartphones");

  const scored = candidates.map((product) => {
    let score = 0;

    if (budgetTag === "budget-low" && product.price < 40000) score += 40;
    else if (budgetTag === "budget-mid" && product.price >= 40000 && product.price <= 80000) score += 40;
    else if (budgetTag === "budget-high" && product.price > 80000) score += 40;
    else if (budgetTag) score -= 15;

    if (priorityTag && PRIORITY_BOOST[priorityTag]?.includes(product.id)) score += 30;

    if (ecosystemTags.length > 0 && ecosystemTags.includes(product.brand)) score += 25;

    if (conditionTag && product.condition === conditionTag) score += 20;

    score += product.rating;

    return { product, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((s) => s.product);
}
