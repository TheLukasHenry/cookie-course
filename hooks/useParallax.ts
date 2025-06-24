import { useEffect, useRef } from "react";

interface BackgroundParallaxOptions {
  speed?: number;
  disabled?: boolean;
}

export const useParallax = (options: BackgroundParallaxOptions = {}) => {
  const { speed = 0.8, disabled = false } = options;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (disabled || !ref.current) return;

    const element = ref.current;
    let animationFrameId: number;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const updateParallax = () => {
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const finalOffset = rect.top * speed;
      element.style.transform = `translate3d(0, ${finalOffset}px, 0)`;
      element.style.willChange = "transform";
    };

    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [speed, disabled]);

  return ref;
};

export const useBackgroundParallax = (
  options: BackgroundParallaxOptions = {}
) => {
  const { disabled = false } = options;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || disabled) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    element.style.position = "relative";
    element.style.isolation = "isolate";
    element.style.backgroundSize = "auto 125%";
    element.style.backgroundPosition = "center 0%";

    const update = () => {
      const { top, height } = element.getBoundingClientRect();
      const progress = Math.min(
        1,
        Math.max(0, (window.innerHeight - top) / (window.innerHeight + height))
      );
      const yPos = progress * 100;
      element.style.backgroundPosition = `center ${yPos.toFixed(2)}%`;
      element.style.willChange = "background-position";
    };

    const handleScroll = () => {
      window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [disabled]);

  return ref;
};
