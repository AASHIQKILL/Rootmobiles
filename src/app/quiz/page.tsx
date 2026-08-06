import type { Metadata } from "next";

import { RecommendationQuiz } from "@/components/tools/recommendation-quiz";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Find My Phone — AI Recommendation Quiz",
  description: "Answer four quick questions and get personalized smartphone recommendations from Root Mobiles.",
};

export default function QuizPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-24 pt-32 sm:px-6 sm:pt-40 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Find My Phone</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Let&apos;s find your perfect match
        </h1>
        <p className="mt-4 text-muted-foreground">Four quick questions, personalized picks from our current stock.</p>
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <RecommendationQuiz />
      </Reveal>
    </div>
  );
}
