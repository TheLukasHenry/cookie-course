"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/design-system";

interface NavItem {
  id: string;
  label: string;
  href: string;
}

interface NavigationBarProps {
  items?: NavItem[];
  className?: string;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  items = [
    { id: "hero", label: "Home", href: "#hero" },
    { id: "participants", label: "Participants", href: "#participants" },
    { id: "lessons", label: "Lessons", href: "#lessons" },
    { id: "about", label: "About", href: "#about" },
    { id: "contact", label: "Contact", href: "#contact" },
  ],
  className = "",
}) => {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Update scroll state
    setIsScrolled(scrollPosition > 50);

    // Calculate scroll progress
    const progress = Math.min(
      100,
      (scrollPosition / (documentHeight - windowHeight)) * 100
    );
    setScrollProgress(progress);

    // Find active section based on scroll position with optimized logic
    const sections = items.map((item) => item.id);
    let currentSection = "hero";

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        // More accurate detection: section is active when its center is in viewport
        if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
          currentSection = sectionId;
        }
      }
    }

    setActiveSection(currentSection);
  }, [items]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleScroll]);

  const scrollToSection = useCallback((href: string) => {
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      const offsetTop = element.offsetTop - 80;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        window.scrollTo(0, offsetTop);
      } else {
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }

    setIsMobileMenuOpen(false);
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, href: string) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        scrollToSection(href);
      }
    },
    [scrollToSection]
  );

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled
          ? "bg-background/90 backdrop-blur-lg border-b border-border/50 shadow-lg"
          : "bg-gradient-to-b from-background/20 to-transparent",
        className
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo with enhanced styling */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection("#hero")}
              onKeyDown={(e) => handleKeyDown(e, "#hero")}
              className={cn(
                "text-xl lg:text-2xl font-bold transition-all duration-200 group",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-lavender focus-visible:ring-offset-2",
                "focus-visible:ring-offset-background rounded-lg px-3 py-2",
                "hover:scale-105 transform",
                isScrolled
                  ? "text-foreground hover:text-lavender-foreground"
                  : "text-white hover:text-lavender drop-shadow-md"
              )}
              aria-label="Cookie Course - Go to home"
            >
              <span className="inline-flex items-center gap-2">
                <span className="text-2xl group-hover:animate-bounce">🍪</span>
                <span className="bg-gradient-to-r from-lavender-foreground to-mint-foreground bg-clip-text text-transparent">
                  Cookie Course
                </span>
              </span>
            </button>
          </div>

          {/* Desktop Navigation with enhanced styling */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              {items.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.href)}
                  onKeyDown={(e) => handleKeyDown(e, item.href)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm lg:text-base font-medium transition-all duration-200 ease-in-out",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-lavender focus-visible:ring-offset-2",
                    "focus-visible:ring-offset-background relative overflow-hidden group",
                    "transform hover:scale-105",
                    activeSection === item.id
                      ? isScrolled
                        ? "bg-lavender/20 text-lavender-foreground border border-lavender/30 shadow-md"
                        : "bg-white/20 text-white border border-white/30 backdrop-blur-sm shadow-lg"
                      : isScrolled
                      ? "text-foreground/80 hover:text-foreground hover:bg-lavender/10 border border-transparent hover:border-lavender/20"
                      : "text-white/90 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20 backdrop-blur-sm"
                  )}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                  aria-current={activeSection === item.id ? "page" : undefined}
                  aria-label={`Navigate to ${item.label} section`}
                >
                  {/* Hover effect background */}
                  <span className="absolute inset-0 bg-gradient-to-r from-lavender/20 to-mint/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <span className="relative">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "transition-all duration-200 transform hover:scale-110",
                    "focus-visible:ring-2 focus-visible:ring-lavender",
                    isScrolled
                      ? "text-foreground hover:text-lavender hover:bg-lavender/10"
                      : "text-white hover:text-lavender hover:bg-white/10 backdrop-blur-sm"
                  )}
                  aria-label="Open mobile menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] bg-background/95 backdrop-blur-xl border-l border-border/50"
              >
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="text-lg font-semibold text-foreground mb-6 px-2 flex items-center gap-2">
                    <span className="text-2xl">🍪</span>
                    <span className="bg-gradient-to-r from-lavender-foreground to-mint-foreground bg-clip-text text-transparent">
                      Cookie Course
                    </span>
                  </div>
                  {items.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.href)}
                      onKeyDown={(e) => handleKeyDown(e, item.href)}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ease-in-out group",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-lavender focus-visible:ring-offset-2",
                        "focus-visible:ring-offset-background transform hover:scale-105 relative overflow-hidden",
                        activeSection === item.id
                          ? "bg-lavender/20 text-lavender-foreground border border-lavender/30 shadow-md"
                          : "text-foreground/80 hover:text-foreground hover:bg-lavender/10 border border-transparent hover:border-lavender/20"
                      )}
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: "slideInRight 0.5s ease-out forwards",
                      }}
                      aria-current={
                        activeSection === item.id ? "page" : undefined
                      }
                      aria-label={`Navigate to ${item.label} section`}
                    >
                      {/* Mobile hover effect */}
                      <span className="absolute inset-0 bg-gradient-to-r from-lavender/10 to-mint/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      <span className="relative">{item.label}</span>
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Enhanced Progress indicator with gradient */}
      <div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-lavender via-mint to-soft-blue transition-all duration-300 ease-out shadow-sm"
        style={{
          width: `${scrollProgress}%`,
        }}
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuenow={scrollProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Subtle glow effect when scrolled */}
      {isScrolled && (
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lavender/50 to-transparent" />
      )}
    </nav>
  );
};

export default NavigationBar;
