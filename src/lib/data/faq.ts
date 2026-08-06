export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "Buying" | "Selling" | "Repair" | "Warranty & EMI";
}

export const FAQS: FaqItem[] = [
  {
    id: "f1",
    category: "Buying",
    question: "Are your certified pre-owned phones genuine and safe to buy?",
    answer:
      "Every certified pre-owned device passes a 42-point inspection covering battery health, display, cameras, network, and IMEI verification against theft/blacklist databases before it reaches our shelf. Each unit ships with a store warranty and its inspection report.",
  },
  {
    id: "f2",
    category: "Buying",
    question: "Do new phones come with full manufacturer warranty?",
    answer:
      "Yes. Every new smartphone, laptop, and accessory we sell is sourced through authorized distribution and carries the full manufacturer warranty, honored at official service centers pan-India.",
  },
  {
    id: "f3",
    category: "Selling",
    question: "How is my trade-in / sell value calculated?",
    answer:
      "Our estimator factors in model, storage, condition (screen, body, battery), age, and current market resale rates. The in-store quote may adjust slightly after a physical inspection, but it's rarely more than 3-5% off the online estimate.",
  },
  {
    id: "f4",
    category: "Selling",
    question: "Do I get paid immediately when I sell my phone?",
    answer:
      "Yes — once you accept our in-store quote, payment is made instantly via cash or direct bank/UPI transfer. No waiting periods.",
  },
  {
    id: "f5",
    category: "Repair",
    question: "How long does a typical screen or battery repair take?",
    answer:
      "Most screen, battery, and charging port repairs are completed within 45-60 minutes while you wait, since we stock genuine parts for popular models. Motherboard-level repairs may take 24-48 hours.",
  },
  {
    id: "f6",
    category: "Repair",
    question: "Will I lose my data during a repair?",
    answer:
      "Standard screen/battery repairs don't touch your data. For motherboard or software-level repairs, we strongly recommend backing up beforehand — we are not responsible for data loss, as outlined in our terms.",
  },
  {
    id: "f7",
    category: "Warranty & EMI",
    question: "What EMI options are available?",
    answer:
      "We offer no-cost EMI through Bajaj Finserv and most major banks and card networks, with tenures from 3 to 24 months. EMI can be arranged in-store in under 10 minutes with basic KYC documents.",
  },
  {
    id: "f8",
    category: "Warranty & EMI",
    question: "What warranty do repairs come with?",
    answer:
      "All repairs carry a warranty specific to the service performed (typically 30-90 days) covering the replaced part and workmanship — ask our technician for exact terms on your repair type.",
  },
];
