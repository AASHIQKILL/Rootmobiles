import { AnimatedCounter } from "@/components/motion/animated-counter";
import { Reveal } from "@/components/motion/reveal";

const STATS = [
  { value: 5000, suffix: "+", label: "Happy customers served" },
  { value: 4.8, decimals: 1, suffix: "★", label: "Average Google rating" },
  { value: 45, suffix: " min", label: "Average repair turnaround" },
  { value: 42, label: "Point certified inspection" },
];

export function Stats() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass-strong grid grid-cols-2 gap-8 rounded-3xl p-8 sm:p-12 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08} className="text-center lg:text-left">
              <p className="font-display text-4xl font-semibold text-gradient-gold sm:text-5xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals ?? 0} />
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
