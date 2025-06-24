"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);

      // Find active section based on scroll position
      const sections = items.map((item) => item.id);
      let currentSection = "hero";

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = sectionId;
          }
        }
      }

      setActiveSection(currentSection);

      // Calculate scroll progress
      const totalScrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollHeight > 0) {
        setScrollProgress((scrollPosition / totalScrollHeight) * 100);
      } else {
        setScrollProgress(0);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [items]);

  const scrollToSection = (href: string) => {
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
  };

  const handleKeyDown = (event: React.KeyboardEvent, href: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      scrollToSection(href);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm"
          : "bg-transparent"
      } ${className}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection("#hero")}
              onKeyDown={(e) => handleKeyDown(e, "#hero")}
              className="text-xl lg:text-2xl font-bold text-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-md px-2 py-1"
              aria-label="Cookie Course - Go to home"
            >
              🍪 Cookie Course
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.href)}
                  onKeyDown={(e) => handleKeyDown(e, item.href)}
                  className={`px-4 py-2 rounded-md text-sm lg:text-base font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${
                    activeSection === item.id
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-foreground/80 hover:text-foreground hover:bg-foreground/5 border border-transparent hover:border-border/30"
                  }`}
                  aria-current={activeSection === item.id ? "page" : undefined}
                  aria-label={`Navigate to ${item.label} section`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-foreground hover:text-primary hover:bg-foreground/5 focus:ring-2 focus:ring-primary"
                  aria-label="Open mobile menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[280px] bg-background/95 backdrop-blur-md border-l border-border/50"
              >
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="text-lg font-semibold text-foreground mb-4 px-2">
                    🍪 Cookie Course
                  </div>
                  {items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.href)}
                      onKeyDown={(e) => handleKeyDown(e, item.href)}
                      className={`w-full text-left px-4 py-3 rounded-md text-base font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${
                        activeSection === item.id
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "text-foreground/80 hover:text-foreground hover:bg-foreground/5 border border-transparent hover:border-border/30"
                      }`}
                      aria-current={
                        activeSection === item.id ? "page" : undefined
                      }
                      aria-label={`Navigate to ${item.label} section`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ease-out"
        style={{
          width: `${scrollProgress}%`,
        }}
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuenow={scrollProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </nav>
  );
};

export default NavigationBar;
