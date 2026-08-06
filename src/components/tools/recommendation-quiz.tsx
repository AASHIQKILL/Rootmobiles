"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, RotateCcw, MessageCircle } from "lucide-react";

import { QUIZ_QUESTIONS, recommendProducts } from "@/lib/data/quiz";
import { whatsappLink } from "@/lib/constants";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export function RecommendationQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [done, setDone] = useState(false);

  const question = QUIZ_QUESTIONS[step];
  const progress = (step / QUIZ_QUESTIONS.length) * 100;

  const results = useMemo(() => (done ? recommendProducts(answers) : []), [done, answers]);

  function selectOption(tags: string[]) {
    const next = { ...answers, [question.id]: tags };
    setAnswers(next);

    if (step < QUIZ_QUESTIONS.length - 1) {
      setStep((s) => s + 1);
    } else {
      setDone(true);
    }
  }

  function reset() {
    setStep(0);
    setAnswers({});
    setDone(false);
  }

  if (done) {
    return (
      <div>
        <div className="text-center">
          <Sparkles className="mx-auto size-8 text-accent" />
          <h3 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">Your top matches</h3>
          <p className="mt-2 text-muted-foreground">Based on your answers, these fit you best.</p>
          <button
            onClick={reset}
            className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-accent cursor-pointer"
          >
            <RotateCcw className="size-3.5" /> Retake the quiz
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="whatsapp" size="lg" asChild>
            <a
              href={whatsappLink(
                `Hi Root Mobiles! The phone quiz recommended: ${results.map((r) => r.name).join(", ")}. Can you help me choose?`
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="size-4" /> Ask an expert to confirm
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-strong mx-auto max-w-2xl rounded-3xl p-6 sm:p-10">
      <Progress value={progress} className="mb-8" />
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Question {step + 1} of {QUIZ_QUESTIONS.length}
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">{question.question}</h3>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {question.options.map((option) => (
              <button
                key={option.id}
                onClick={() => selectOption(option.tags)}
                className={cn(
                  "rounded-xl border border-border-strong px-5 py-4 text-left text-sm font-medium transition-colors cursor-pointer",
                  "hover:border-accent hover:bg-accent/5"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
