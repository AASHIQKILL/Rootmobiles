"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Star, ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";

import { TESTIMONIALS } from "@/lib/data/testimonials";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selected, setSelected] = useState(0);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const raf = requestAnimationFrame(onSelect);
    emblaApi.on("select", onSelect);
    return () => {
      cancelAnimationFrame(raf);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="relative py-20 sm:py-28" id="testimonials">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Voices of trust</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            What Coimbatore says about us
          </h2>
        </Reveal>

        <div className="relative mt-14">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {TESTIMONIALS.map((t) => (
                <div key={t.id} className="min-w-0 flex-[0_0_100%] px-2 sm:flex-[0_0_60%] lg:flex-[0_0_38%]">
                  <div className="glass flex h-full flex-col rounded-2xl p-7">
                    <div className="mb-4 flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "size-4",
                            i < Math.round(t.rating) ? "fill-accent text-accent" : "text-white/15"
                          )}
                        />
                      ))}
                    </div>
                    <p className="flex-1 text-[15px] leading-relaxed text-foreground/90">&ldquo;{t.quote}&rdquo;</p>
                    <div className="mt-6 flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{t.avatarInitials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                      {t.videoUrl && (
                        <button
                          type="button"
                          onClick={() => setPlayingVideo(t.videoUrl!)}
                          aria-label={`Play video testimonial from ${t.name}`}
                          className="ml-auto flex size-9 items-center justify-center rounded-full bg-accent/10 text-accent transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer"
                        >
                          <PlayCircle className="size-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => emblaApi?.scrollPrev()}
              className="flex size-10 items-center justify-center rounded-full border border-border-strong text-foreground/70 transition-colors hover:border-accent hover:text-accent cursor-pointer"
            >
              <ChevronLeft className="size-4" />
            </button>
            <div className="flex items-center gap-1.5">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.id}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all cursor-pointer",
                    i === selected ? "w-6 bg-accent" : "w-1.5 bg-white/15"
                  )}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => emblaApi?.scrollNext()}
              className="flex size-10 items-center justify-center rounded-full border border-border-strong text-foreground/70 transition-colors hover:border-accent hover:text-accent cursor-pointer"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {playingVideo && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setPlayingVideo(null)}
          role="dialog"
          aria-modal
        >
          <video
            src={playingVideo}
            controls
            autoPlay
            className="max-h-[80vh] w-full max-w-2xl rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
