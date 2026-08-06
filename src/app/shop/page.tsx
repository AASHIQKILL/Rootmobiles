import type { Metadata } from "next";
import { Suspense } from "react";

import { ShopClient } from "./shop-client";

export const metadata: Metadata = {
  title: "Shop New & Certified Pre-Owned Devices",
  description:
    "Browse new and certified pre-owned smartphones, laptops, accessories, and gaming consoles at Root Mobiles, Coimbatore. EMI available on every purchase.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopClient />
    </Suspense>
  );
}
