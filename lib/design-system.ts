import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Design System Color Palette
 * Pastel-accented colors for the cookie course application
 */
export const colors = {
  // Primary pastel colors
  lavender: {
    DEFAULT: "hsl(var(--lavender))",
    foreground: "hsl(var(--lavender-foreground))",
  },
  mint: {
    DEFAULT: "hsl(var(--mint))",
    foreground: "hsl(var(--mint-foreground))",
  },
  softBlue: {
    DEFAULT: "hsl(var(--soft-blue))",
    foreground: "hsl(var(--soft-blue-foreground))",
  },
  peach: {
    DEFAULT: "hsl(var(--peach))",
    foreground: "hsl(var(--peach-foreground))",
  },
  rose: {
    DEFAULT: "hsl(var(--rose))",
    foreground: "hsl(var(--rose-foreground))",
  },
  cream: {
    DEFAULT: "hsl(var(--cream))",
    foreground: "hsl(var(--cream-foreground))",
  },
} as const;

/**
 * Design System Spacing Scale
 */
export const spacing = {
  xs: "var(--spacing-xs)", // 0.25rem
  sm: "var(--spacing-sm)", // 0.5rem
  md: "var(--spacing-md)", // 1rem
  lg: "var(--spacing-lg)", // 1.5rem
  xl: "var(--spacing-xl)", // 2rem
  "2xl": "var(--spacing-2xl)", // 3rem
  "3xl": "var(--spacing-3xl)", // 4rem
} as const;

/**
 * Design System Typography Scale
 */
export const typography = {
  xs: "var(--font-size-xs)",
  sm: "var(--font-size-sm)",
  base: "var(--font-size-base)",
  lg: "var(--font-size-lg)",
  xl: "var(--font-size-xl)",
  "2xl": "var(--font-size-2xl)",
  "3xl": "var(--font-size-3xl)",
  "4xl": "var(--font-size-4xl)",
  "5xl": "var(--font-size-5xl)",
  "6xl": "var(--font-size-6xl)",
  "7xl": "var(--font-size-7xl)",
} as const;

/**
 * Design System Border Radius Scale
 */
export const borderRadius = {
  xs: "var(--radius-xs)",
  sm: "var(--radius-sm)",
  md: "var(--radius-md)",
  lg: "var(--radius-lg)",
  xl: "var(--radius-xl)",
  "2xl": "var(--radius-2xl)",
  "3xl": "var(--radius-3xl)",
} as const;

/**
 * Metric Tile Component Variants
 * Large colorful tiles for displaying metrics and statistics
 */
export const metricTileVariants = cva(
  [
    "relative overflow-hidden rounded-lg p-6 transition-all duration-300",
    "shadow-lg hover:shadow-xl",
    "border border-white/20",
    "backdrop-blur-sm",
    "group cursor-pointer",
  ],
  {
    variants: {
      variant: {
        lavender:
          "bg-gradient-to-br from-lavender/80 to-lavender/60 hover:from-lavender/90 hover:to-lavender/70",
        mint: "bg-gradient-to-br from-mint/80 to-mint/60 hover:from-mint/90 hover:to-mint/70",
        softBlue:
          "bg-gradient-to-br from-soft-blue/80 to-soft-blue/60 hover:from-soft-blue/90 hover:to-soft-blue/70",
        peach:
          "bg-gradient-to-br from-peach/80 to-peach/60 hover:from-peach/90 hover:to-peach/70",
        rose: "bg-gradient-to-br from-rose/80 to-rose/60 hover:from-rose/90 hover:to-rose/70",
        cream:
          "bg-gradient-to-br from-cream/80 to-cream/60 hover:from-cream/90 hover:to-cream/70",
      },
      size: {
        sm: "p-4 min-h-[120px]",
        md: "p-6 min-h-[160px]",
        lg: "p-8 min-h-[200px]",
        xl: "p-10 min-h-[240px]",
      },
      emphasis: {
        subtle: "shadow-md hover:shadow-lg",
        medium: "shadow-lg hover:shadow-xl",
        strong: "shadow-xl hover:shadow-2xl transform hover:scale-105",
      },
    },
    defaultVariants: {
      variant: "lavender",
      size: "md",
      emphasis: "medium",
    },
  }
);

/**
 * Value Proposition Component Variants
 * Components for displaying key value propositions
 */
export const valuePropositionVariants = cva(
  [
    "relative p-6 rounded-xl border backdrop-blur-sm",
    "transition-all duration-300 hover:shadow-lg",
    "group",
  ],
  {
    variants: {
      variant: {
        card: "bg-card/50 border-border/50 hover:bg-card/70",
        filled: "bg-gradient-to-br text-white border-white/20",
        ghost: "bg-transparent border-border/30 hover:bg-accent/10",
        outline: "bg-transparent border-2 hover:bg-accent/5",
      },
      color: {
        lavender: "from-lavender to-lavender/80",
        mint: "from-mint to-mint/80",
        softBlue: "from-soft-blue to-soft-blue/80",
        peach: "from-peach to-peach/80",
        rose: "from-rose to-rose/80",
        cream: "from-cream to-cream/80",
      },
      size: {
        sm: "p-4 text-sm",
        md: "p-6 text-base",
        lg: "p-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "card",
      color: "lavender",
      size: "md",
    },
  }
);

/**
 * Enhanced Button Variants with Pastel Colors
 */
export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium",
    "transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Pastel variants
        lavender:
          "bg-lavender text-lavender-foreground shadow hover:bg-lavender/90",
        mint: "bg-mint text-mint-foreground shadow hover:bg-mint/90",
        softBlue:
          "bg-soft-blue text-soft-blue-foreground shadow hover:bg-soft-blue/90",
        peach: "bg-peach text-peach-foreground shadow hover:bg-peach/90",
        rose: "bg-rose text-rose-foreground shadow hover:bg-rose/90",
        cream: "bg-cream text-cream-foreground shadow hover:bg-cream/90",
        // Gradient variants
        gradientLavender:
          "bg-gradient-to-r from-lavender to-lavender/80 text-lavender-foreground shadow-lg hover:shadow-xl transition-all duration-300",
        gradientMint:
          "bg-gradient-to-r from-mint to-mint/80 text-mint-foreground shadow-lg hover:shadow-xl transition-all duration-300",
        gradientSoftBlue:
          "bg-gradient-to-r from-soft-blue to-soft-blue/80 text-soft-blue-foreground shadow-lg hover:shadow-xl transition-all duration-300",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        xl: "h-12 rounded-lg px-10 text-lg",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/**
 * Badge Variants with Pastel Colors
 */
export const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        // Pastel variants
        lavender:
          "border-transparent bg-lavender text-lavender-foreground shadow hover:bg-lavender/80",
        mint: "border-transparent bg-mint text-mint-foreground shadow hover:bg-mint/80",
        softBlue:
          "border-transparent bg-soft-blue text-soft-blue-foreground shadow hover:bg-soft-blue/80",
        peach:
          "border-transparent bg-peach text-peach-foreground shadow hover:bg-peach/80",
        rose: "border-transparent bg-rose text-rose-foreground shadow hover:bg-rose/80",
        cream:
          "border-transparent bg-cream text-cream-foreground shadow hover:bg-cream/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Card Variants with Enhanced Styling
 */
export const cardVariants = cva(
  "rounded-xl border bg-card text-card-foreground shadow",
  {
    variants: {
      variant: {
        default: "border-border",
        elevated: "shadow-lg border-border/50",
        glass: "bg-card/50 backdrop-blur-sm border-white/20",
        gradient: "bg-gradient-to-br border-white/20",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
        xl: "p-12",
      },
      color: {
        default: "",
        lavender: "from-lavender/10 to-lavender/5",
        mint: "from-mint/10 to-mint/5",
        softBlue: "from-soft-blue/10 to-soft-blue/5",
        peach: "from-peach/10 to-peach/5",
        rose: "from-rose/10 to-rose/5",
        cream: "from-cream/10 to-cream/5",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
      color: "default",
    },
  }
);

export type MetricTileVariants = VariantProps<typeof metricTileVariants>;
export type ValuePropositionVariants = VariantProps<
  typeof valuePropositionVariants
>;
export type ButtonVariants = VariantProps<typeof buttonVariants>;
export type BadgeVariants = VariantProps<typeof badgeVariants>;
export type CardVariants = VariantProps<typeof cardVariants>;
