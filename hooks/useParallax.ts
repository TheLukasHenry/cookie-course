import { useEffect, useRef } from "react";

interface ParallaxOptions {
  speed?: number;
  direction?: "up" | "down";
  disabled?: boolean;
}

export const useParallax = (options: ParallaxOptions = {}) => {
  const { speed = 0.8, direction = "up", disabled = false } = options;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (disabled || !ref.current) return;

    const element = ref.current;
    let animationFrameId: number;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    // Check for mobile devices - still enable but with reduced effect
    const isMobile = window.innerWidth < 768;
    const mobileSpeedReduction = isMobile ? 0.3 : 1;

    const updateParallax = () => {
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const scrollY = window.scrollY;
      const elementTop = rect.top + scrollY;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate if element is in viewport with extended range
      const elementBottom = elementTop + elementHeight;
      const viewportTop = scrollY - windowHeight * 0.5;
      const viewportBottom = scrollY + windowHeight * 1.5;

      if (elementBottom >= viewportTop && elementTop <= viewportBottom) {
        // Enhanced parallax calculation for more obvious effect
        const scrollProgress =
          (scrollY - elementTop + windowHeight) /
          (windowHeight + elementHeight);
        const parallaxOffset =
          scrollProgress * speed * 200 * mobileSpeedReduction; // Increased multiplier

        const finalOffset =
          direction === "up" ? -parallaxOffset : parallaxOffset;

        element.style.transform = `translate3d(0, ${finalOffset}px, 0)`;
        element.style.willChange = "transform";
      }
    };

    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(updateParallax);
    };

    const handleResize = () => {
      updateParallax();
    };

    // Initial call
    updateParallax();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [speed, direction, disabled]);

  return ref;
};

export const useBackgroundParallax = (options: ParallaxOptions = {}) => {
  const { speed = 0.5, direction = "up", disabled = false } = options;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (disabled || !ref.current) return;

    const element = ref.current;
    let animationFrameId: number;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    // Enable on all devices but adjust for mobile
    const isMobile = window.innerWidth < 768;
    const mobileSpeedReduction = isMobile ? 0.4 : 1;

    const updateParallax = () => {
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const scrollY = window.scrollY;
      const elementTop = rect.top + scrollY;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate if element is in viewport with extended range
      const elementBottom = elementTop + elementHeight;
      const viewportTop = scrollY - windowHeight;
      const viewportBottom = scrollY + windowHeight * 2;

      if (elementBottom >= viewportTop && elementTop <= viewportBottom) {
        // More dramatic parallax for background images
        const scrollProgress =
          (scrollY - elementTop + windowHeight) /
          (windowHeight + elementHeight);
        const parallaxOffset =
          scrollProgress * speed * 300 * mobileSpeedReduction; // Increased for more obvious effect

        const finalOffset =
          direction === "up" ? -parallaxOffset : parallaxOffset;

        // Apply transform to background position for more obvious effect
        element.style.backgroundPositionY = `${50 + finalOffset * 0.1}%`;
        element.style.transform = `translate3d(0, ${
          finalOffset * 0.3
        }px, 0) scale(1.1)`;
        element.style.willChange = "transform, background-position";
      }
    };

    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(updateParallax);
    };

    const handleResize = () => {
      updateParallax();
    };

    // Initial call
    updateParallax();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [speed, direction, disabled]);

  return ref;
};
