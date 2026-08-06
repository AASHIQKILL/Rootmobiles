export const BUSINESS = {
  name: "Root Mobiles",
  tagline: "Your Trusted Mobile Store in Coimbatore",
  legalName: "Root Mobiles",
  founded: "2018",
  address: {
    line1: "No.338 Gandhipuram 7th Street",
    city: "Coimbatore",
    state: "Tamil Nadu",
    postalCode: "641012",
    country: "IN",
  },
  phone: "+91 70928 77739",
  phoneRaw: "7092877739",
  email: "rootmobilescoimbatore@gmail.com",
  whatsapp: "917092877739",
  hours: [
    { days: "Monday – Saturday", time: "10:00 AM – 9:00 PM" },
    { days: "Sunday", time: "11:00 AM – 8:00 PM" },
  ],
  rating: 4.8,
  reviewCount: 1240,
  happyCustomers: "5000+",
  social: {
    instagram: "https://instagram.com/rootmobiles",
    facebook: "https://facebook.com/rootmobiles",
  },
  geo: {
    lat: 11.0169,
    lng: 76.9558,
  },
  mapsEmbedSrc:
    "https://www.google.com/maps?q=No.338+Gandhipuram+7th+Street+Coimbatore+641012&output=embed",
  mapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=No.338+Gandhipuram+7th+Street+Coimbatore+641012",
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/sell", label: "Sell / Trade-in" },
  { href: "/repair", label: "Repair" },
  { href: "/compare", label: "Compare" },
  { href: "/quiz", label: "Find My Phone" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const FOOTER_LINKS = {
  company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/repair/track", label: "Track a Repair" },
    { href: "/quiz", label: "Find My Phone" },
  ],
  services: [
    { href: "/shop", label: "New & Certified Phones" },
    { href: "/sell", label: "Sell / Trade-in" },
    { href: "/repair", label: "Repair Booking" },
    { href: "/compare", label: "Compare Devices" },
  ],
  legal: [
    { href: "/terms", label: "Terms & Conditions" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/warranty", label: "Warranty Support" },
  ],
} as const;
