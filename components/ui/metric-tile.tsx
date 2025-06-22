"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";
import {
  cn,
  metricTileVariants,
  type MetricTileVariants,
} from "@/lib/design-system";

interface CountAnimationProps {
  number: number;
  className?: string;
  duration?: number;
}

function CountAnimation({
  number,
  className,
  duration = 2,
}: CountAnimationProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, number, { duration });
    return animation.stop;
  }, [number, duration, count]);

  return <motion.span className={cn(className)}>{rounded}</motion.span>;
}

interface MetricTileProps extends MetricTileVariants {
  title: string;
  value: number | string;
  prefix?: string;
  suffix?: string;
  change?: {
    value: number;
    type: "increase" | "decrease";
  };
  icon?: LucideIcon;
  className?: string;
  animate?: boolean;
}

export function MetricTile({
  title,
  value,
  prefix = "",
  suffix = "",
  change,
  icon: Icon,
  variant = "lavender",
  size = "md",
  emphasis = "medium",
  className,
  animate = true,
}: MetricTileProps) {
  const isNumericValue = typeof value === "number";

  const sizeClasses = {
    sm: {
      title: "text-sm",
      value: "text-2xl",
      change: "text-xs",
      icon: "w-4 h-4",
    },
    md: {
      title: "text-base",
      value: "text-3xl",
      change: "text-sm",
      icon: "w-5 h-5",
    },
    lg: {
      title: "text-lg",
      value: "text-4xl",
      change: "text-base",
      icon: "w-6 h-6",
    },
    xl: {
      title: "text-xl",
      value: "text-5xl",
      change: "text-lg",
      icon: "w-8 h-8",
    },
  };

  const currentSize = sizeClasses[size || "md"];

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20 } : false}
      animate={animate ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.5 }}
      whileHover={
        emphasis === "strong"
          ? { scale: 1.05 }
          : emphasis === "medium"
          ? { scale: 1.03 }
          : { scale: 1.02 }
      }
      className={cn(metricTileVariants({ variant, size, emphasis }), className)}
    >
      {/* Glass morphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Header with title and icon */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3
              className={cn(
                "font-medium text-white/90 tracking-tight",
                currentSize.title
              )}
            >
              {title}
            </h3>
          </div>
          {Icon && (
            <Icon
              className={cn(
                "text-white/80 flex-shrink-0 ml-2",
                currentSize.icon
              )}
            />
          )}
        </div>

        {/* Value and change */}
        <div className="space-y-2">
          <div
            className={cn(
              "font-bold text-white tracking-tight flex items-baseline gap-1",
              currentSize.value
            )}
          >
            {prefix && <span className="text-white/70">{prefix}</span>}
            {isNumericValue && animate ? (
              <CountAnimation number={value} duration={2} />
            ) : (
              <span>{value}</span>
            )}
            {suffix && <span className="text-white/70">{suffix}</span>}
          </div>

          {change && (
            <div className={cn("flex items-center gap-1", currentSize.change)}>
              {change.type === "increase" ? (
                <TrendingUp className="w-3 h-3 text-emerald-200" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-200" />
              )}
              <span
                className={cn(
                  change.type === "increase"
                    ? "text-emerald-200"
                    : "text-red-200"
                )}
              >
                {change.type === "increase" ? "+" : ""}
                {change.value}%
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
