import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { Services } from "@/components/sections/services";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { RepairShowcase } from "@/components/sections/repair-showcase";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { StoreLocator } from "@/components/sections/store-locator";
import { CtaBanner } from "@/components/sections/cta-banner";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <FeaturedProducts />
      <RepairShowcase />
      <Testimonials />
      <Faq />
      <StoreLocator />
      <CtaBanner />
    </>
  );
}
