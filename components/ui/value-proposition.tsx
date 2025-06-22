"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import {
  cn,
  valuePropositionVariants,
  type ValuePropositionVariants,
} from "@/lib/design-system";

interface ValuePropositionProps extends ValuePropositionVariants {
  title: string;
  description: string;
  icon?: LucideIcon;
  features?: string[];
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
  animate?: boolean;
  index?: number;
}

export function ValueProposition({
  title,
  description,
  icon: Icon,
  features,
  action,
  variant = "card",
  color = "lavender",
  size = "md",
  className,
  animate = true,
  index = 0,
}: ValuePropositionProps) {
  const isFilled = variant === "filled";

  const textColorClass = isFilled ? "text-white" : "text-foreground";
  const mutedTextColorClass = isFilled
    ? "text-white/80"
    : "text-muted-foreground";

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 30 } : false}
      animate={animate ? { opacity: 1, y: 0 } : false}
      transition={{
        duration: 0.6,
        delay: animate ? index * 0.1 : 0,
        ease: "easeOut",
      }}
      whileHover={{ y: -5 }}
      className={cn(
        valuePropositionVariants({ variant, color, size }),
        isFilled &&
          color === "lavender" &&
          "bg-gradient-to-br from-lavender to-lavender/80",
        isFilled &&
          color === "mint" &&
          "bg-gradient-to-br from-mint to-mint/80",
        isFilled &&
          color === "softBlue" &&
          "bg-gradient-to-br from-soft-blue to-soft-blue/80",
        isFilled &&
          color === "peach" &&
          "bg-gradient-to-br from-peach to-peach/80",
        isFilled &&
          color === "rose" &&
          "bg-gradient-to-br from-rose to-rose/80",
        isFilled &&
          color === "cream" &&
          "bg-gradient-to-br from-cream to-cream/80",
        className
      )}
    >
      {/* Icon */}
      {Icon && (
        <motion.div
          initial={animate ? { scale: 0 } : false}
          animate={animate ? { scale: 1 } : false}
          transition={{ duration: 0.5, delay: animate ? index * 0.1 + 0.2 : 0 }}
          className={cn(
            "mb-4 p-3 rounded-xl w-fit",
            isFilled
              ? "bg-white/20 backdrop-blur-sm"
              : color === "lavender" && "bg-lavender/20",
            color === "mint" && "bg-mint/20",
            color === "softBlue" && "bg-soft-blue/20",
            color === "peach" && "bg-peach/20",
            color === "rose" && "bg-rose/20",
            color === "cream" && "bg-cream/20"
          )}
        >
          <Icon
            className={cn(
              "w-6 h-6",
              isFilled
                ? "text-white"
                : color === "lavender" && "text-lavender-foreground",
              color === "mint" && "text-mint-foreground",
              color === "softBlue" && "text-soft-blue-foreground",
              color === "peach" && "text-peach-foreground",
              color === "rose" && "text-rose-foreground",
              color === "cream" && "text-cream-foreground"
            )}
          />
        </motion.div>
      )}

      {/* Content */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h3
            className={cn(
              "font-bold tracking-tight",
              textColorClass,
              size === "sm" && "text-lg",
              size === "md" && "text-xl",
              size === "lg" && "text-2xl"
            )}
          >
            {title}
          </h3>

          <p
            className={cn(
              "leading-relaxed",
              mutedTextColorClass,
              size === "sm" && "text-sm",
              size === "md" && "text-base",
              size === "lg" && "text-lg"
            )}
          >
            {description}
          </p>
        </div>

        {/* Features list */}
        {features && features.length > 0 && (
          <ul className="space-y-2">
            {features.map((feature, idx) => (
              <motion.li
                key={idx}
                initial={animate ? { opacity: 0, x: -20 } : false}
                animate={animate ? { opacity: 1, x: 0 } : false}
                transition={{
                  duration: 0.4,
                  delay: animate ? index * 0.1 + 0.3 + idx * 0.1 : 0,
                }}
                className={cn("flex items-center text-sm", mutedTextColorClass)}
              >
                <span
                  className={cn(
                    "w-1.5 h-1.5 rounded-full mr-3 flex-shrink-0",
                    isFilled
                      ? "bg-white/60"
                      : color === "lavender" && "bg-lavender",
                    color === "mint" && "bg-mint",
                    color === "softBlue" && "bg-soft-blue",
                    color === "peach" && "bg-peach",
                    color === "rose" && "bg-rose",
                    color === "cream" && "bg-cream"
                  )}
                />
                {feature}
              </motion.li>
            ))}
          </ul>
        )}

        {/* Action button */}
        {action && (
          <motion.div
            initial={animate ? { opacity: 0 } : false}
            animate={animate ? { opacity: 1 } : false}
            transition={{
              duration: 0.4,
              delay: animate ? index * 0.1 + 0.5 : 0,
            }}
            className="pt-2"
          >
            {action.href ? (
              <a
                href={action.href}
                className={cn(
                  "inline-flex items-center text-sm font-medium transition-colors",
                  isFilled
                    ? "text-white hover:text-white/80"
                    : color === "lavender" &&
                        "text-lavender-foreground hover:text-lavender-foreground/80",
                  color === "mint" &&
                    "text-mint-foreground hover:text-mint-foreground/80",
                  color === "softBlue" &&
                    "text-soft-blue-foreground hover:text-soft-blue-foreground/80",
                  color === "peach" &&
                    "text-peach-foreground hover:text-peach-foreground/80",
                  color === "rose" &&
                    "text-rose-foreground hover:text-rose-foreground/80",
                  color === "cream" &&
                    "text-cream-foreground hover:text-cream-foreground/80"
                )}
              >
                {action.label} →
              </a>
            ) : (
              <button
                onClick={action.onClick}
                className={cn(
                  "inline-flex items-center text-sm font-medium transition-colors",
                  isFilled
                    ? "text-white hover:text-white/80"
                    : color === "lavender" &&
                        "text-lavender-foreground hover:text-lavender-foreground/80",
                  color === "mint" &&
                    "text-mint-foreground hover:text-mint-foreground/80",
                  color === "softBlue" &&
                    "text-soft-blue-foreground hover:text-soft-blue-foreground/80",
                  color === "peach" &&
                    "text-peach-foreground hover:text-peach-foreground/80",
                  color === "rose" &&
                    "text-rose-foreground hover:text-rose-foreground/80",
                  color === "cream" &&
                    "text-cream-foreground hover:text-cream-foreground/80"
                )}
              >
                {action.label} →
              </button>
            )}
          </motion.div>
        )}
      </div>

      {/* Background decoration for filled variant */}
      {isFilled && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-xl" />
      )}
    </motion.div>
  );
}
