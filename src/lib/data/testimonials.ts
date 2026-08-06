export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatarInitials: string;
  videoUrl?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Priya Ramesh",
    role: "Bought iPhone 15 Pro",
    quote:
      "Best mobile store in Gandhipuram, hands down. Got a genuine iPhone with proper billing and the EMI process took ten minutes.",
    rating: 5,
    avatarInitials: "PR",
  },
  {
    id: "t2",
    name: "Arun Kumar",
    role: "Screen repair, 45 minutes",
    quote:
      "Cracked my screen the night before an exam. Root Mobiles fixed it while I waited — genuine display, no shortcuts.",
    rating: 5,
    avatarInitials: "AK",
  },
  {
    id: "t3",
    name: "Divya Shankar",
    role: "Sold her old Galaxy S21",
    quote:
      "The trade-in estimator quoted almost exactly what I got in-store. No haggling, no lowballing — just an honest price.",
    rating: 5,
    avatarInitials: "DS",
  },
  {
    id: "t4",
    name: "Mohammed Faiz",
    role: "Certified pre-owned buyer",
    quote:
      "Was skeptical about a used phone, but the 42-point report and 6-month warranty won me over. Battery health was exactly as promised.",
    rating: 4.5,
    avatarInitials: "MF",
  },
  {
    id: "t5",
    name: "Sneha Vijayan",
    role: "Laptop + trade-in",
    quote:
      "Traded my old laptop in and walked out with a certified MacBook Air the same afternoon. Smooth, transparent, and fast.",
    rating: 5,
    avatarInitials: "SV",
  },
];
