export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  stat: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "buy-new",
    title: "Buy New Smartphones",
    description:
      "The latest flagships from Apple, Samsung, OnePlus & more — sealed-box, full manufacturer warranty.",
    icon: "smartphone",
    href: "/shop?condition=New",
    stat: "50+ models in stock",
  },
  {
    id: "certified",
    title: "Certified Pre-Owned",
    description:
      "42-point inspected, battery-health verified devices at up to 40% off — backed by our own warranty.",
    icon: "shield-check",
    href: "/shop?condition=Certified",
    stat: "42-point inspection",
  },
  {
    id: "sell",
    title: "Sell Used Phones",
    description:
      "Get an instant, fair market valuation and same-day cash or account transfer for your old device.",
    icon: "hand-coins",
    href: "/sell",
    stat: "Instant valuation",
  },
  {
    id: "repair",
    title: "Mobile Repair Services",
    description:
      "Screen, battery, charging port & motherboard repairs with genuine parts and certified technicians.",
    icon: "wrench",
    href: "/repair",
    stat: "Most repairs in 60 min",
  },
  {
    id: "laptops",
    title: "Laptops",
    description:
      "New and certified laptops from Apple, Dell, HP & Lenovo for work, study, and creativity.",
    icon: "laptop",
    href: "/shop?category=Laptops",
    stat: "All major brands",
  },
  {
    id: "accessories",
    title: "Accessories",
    description:
      "Genuine cases, chargers, earphones, and screen protectors — nothing counterfeit, ever.",
    icon: "headphones",
    href: "/shop?category=Accessories",
    stat: "100% genuine",
  },
  {
    id: "gaming",
    title: "Gaming Consoles",
    description:
      "PlayStation, Xbox & Nintendo Switch consoles, controllers, and the latest game titles.",
    icon: "gamepad-2",
    href: "/shop?category=Gaming",
    stat: "PS5 · Xbox · Switch",
  },
  {
    id: "emi",
    title: "EMI Options",
    description:
      "No-cost EMI via Bajaj Finserv and leading banks — take your device home today, pay monthly.",
    icon: "credit-card",
    href: "/emi",
    stat: "From ₹1,670/mo",
  },
  {
    id: "exchange",
    title: "Device Exchange",
    description:
      "Trade in your current phone and upgrade instantly — we adjust the value straight off your bill.",
    icon: "repeat",
    href: "/sell",
    stat: "Upgrade same day",
  },
  {
    id: "warranty",
    title: "Warranty Support",
    description:
      "Dedicated after-sales support for every device we sell — new, certified, or repaired.",
    icon: "badge-check",
    href: "/warranty",
    stat: "Local, real support",
  },
];
