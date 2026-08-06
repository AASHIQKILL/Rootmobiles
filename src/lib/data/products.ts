export type ProductCondition = "New" | "Certified Pre-Owned";

export type ProductCategory =
  | "Smartphones"
  | "Laptops"
  | "Accessories"
  | "Gaming";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: ProductCategory;
  condition: ProductCondition;
  price: number;
  mrp?: number;
  emiFrom?: number;
  rating: number;
  reviewCount: number;
  colorSwatches: string[];
  badge?: string;
  specs: { label: string; value: string }[];
}

export const CATEGORY_IMAGE: Record<ProductCategory, string> = {
  Smartphones: "/products/device-phone.svg",
  Laptops: "/products/device-laptop.svg",
  Accessories: "/products/device-accessory.svg",
  Gaming: "/products/device-gaming.svg",
};

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    slug: "iphone-15-pro",
    name: "iPhone 15 Pro",
    brand: "Apple",
    category: "Smartphones",
    condition: "New",
    price: 134900,
    mrp: 139900,
    emiFrom: 5620,
    rating: 4.9,
    reviewCount: 312,
    colorSwatches: ["#3d3833", "#5c5c5c", "#e3d7c3", "#0f2a4a"],
    badge: "New Arrival",
    specs: [
      { label: "Display", value: "6.1\" Super Retina XDR" },
      { label: "Chip", value: "A17 Pro" },
      { label: "Storage", value: "128GB" },
      { label: "Camera", value: "48MP Triple" },
    ],
  },
  {
    id: "p2",
    slug: "samsung-s24-ultra",
    name: "Galaxy S24 Ultra",
    brand: "Samsung",
    category: "Smartphones",
    condition: "New",
    price: 124999,
    mrp: 129999,
    emiFrom: 5210,
    rating: 4.8,
    reviewCount: 268,
    colorSwatches: ["#1a1a1a", "#8a8f98", "#d8c9a3"],
    badge: "Bestseller",
    specs: [
      { label: "Display", value: "6.8\" QHD+ AMOLED" },
      { label: "Chip", value: "Snapdragon 8 Gen 3" },
      { label: "Storage", value: "256GB" },
      { label: "S Pen", value: "Included" },
    ],
  },
  {
    id: "p3",
    slug: "iphone-13-certified",
    name: "iPhone 13",
    brand: "Apple",
    category: "Smartphones",
    condition: "Certified Pre-Owned",
    price: 42999,
    mrp: 59900,
    emiFrom: 1800,
    rating: 4.7,
    reviewCount: 501,
    colorSwatches: ["#0f2a4a", "#e3d7c3", "#1a1a1a"],
    badge: "6-Month Warranty",
    specs: [
      { label: "Battery Health", value: "≥ 90%" },
      { label: "Grade", value: "A / Like New" },
      { label: "Storage", value: "128GB" },
      { label: "Inspection", value: "42-Point Checked" },
    ],
  },
  {
    id: "p4",
    slug: "oneplus-12r",
    name: "OnePlus 12R",
    brand: "OnePlus",
    category: "Smartphones",
    condition: "New",
    price: 39999,
    mrp: 42999,
    emiFrom: 1670,
    rating: 4.6,
    reviewCount: 189,
    colorSwatches: ["#1a1a1a", "#8a6a3a"],
    specs: [
      { label: "Display", value: "6.78\" 120Hz AMOLED" },
      { label: "Chip", value: "Snapdragon 8 Gen 2" },
      { label: "Charging", value: "100W SuperVOOC" },
      { label: "Battery", value: "5500mAh" },
    ],
  },
  {
    id: "p5",
    slug: "macbook-air-m2-certified",
    name: "MacBook Air M2",
    brand: "Apple",
    category: "Laptops",
    condition: "Certified Pre-Owned",
    price: 74999,
    mrp: 99900,
    emiFrom: 3130,
    rating: 4.8,
    reviewCount: 96,
    colorSwatches: ["#8a8f98", "#e3d7c3"],
    badge: "Certified",
    specs: [
      { label: "Chip", value: "Apple M2" },
      { label: "RAM", value: "8GB" },
      { label: "Storage", value: "256GB SSD" },
      { label: "Battery Cycles", value: "< 200" },
    ],
  },
  {
    id: "p6",
    slug: "sony-ps5-slim",
    name: "PlayStation 5 Slim",
    brand: "Sony",
    category: "Gaming",
    condition: "New",
    price: 47990,
    mrp: 54990,
    emiFrom: 1999,
    rating: 4.9,
    reviewCount: 143,
    colorSwatches: ["#e6e6e6", "#1a1a1a"],
    badge: "In Stock",
    specs: [
      { label: "Storage", value: "1TB SSD" },
      { label: "Resolution", value: "Up to 4K/120fps" },
      { label: "Includes", value: "DualSense Controller" },
      { label: "Discs", value: "Disc Edition" },
    ],
  },
  {
    id: "p7",
    slug: "airpods-pro-2",
    name: "AirPods Pro (2nd Gen)",
    brand: "Apple",
    category: "Accessories",
    condition: "New",
    price: 21999,
    mrp: 24900,
    rating: 4.8,
    reviewCount: 421,
    colorSwatches: ["#f2f2f2"],
    specs: [
      { label: "ANC", value: "Adaptive Audio" },
      { label: "Case", value: "MagSafe (USB-C)" },
      { label: "Battery", value: "Up to 6 hrs" },
    ],
  },
  {
    id: "p8",
    slug: "anker-140w-charger",
    name: "Anker 140W GaN Charger",
    brand: "Anker",
    category: "Accessories",
    condition: "New",
    price: 5499,
    mrp: 6999,
    rating: 4.7,
    reviewCount: 88,
    colorSwatches: ["#1a1a1a"],
    specs: [
      { label: "Ports", value: "2x USB-C, 1x USB-A" },
      { label: "Output", value: "140W Max" },
      { label: "GaN", value: "Compact GaN II" },
    ],
  },
] as const;

export const CATEGORIES: { id: ProductCategory; label: string; icon: string; blurb: string }[] = [
  { id: "Smartphones", label: "Smartphones", icon: "smartphone", blurb: "New & certified pre-owned" },
  { id: "Laptops", label: "Laptops", icon: "laptop", blurb: "MacBooks, ultrabooks & more" },
  { id: "Accessories", label: "Accessories", icon: "headphones", blurb: "Genuine, warranty-backed" },
  { id: "Gaming", label: "Gaming Consoles", icon: "gamepad-2", blurb: "PlayStation, Xbox & Switch" },
];
