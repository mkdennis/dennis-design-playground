/**
 * ============================================
 * BADGE COMPONENT
 * ============================================
 *
 * A small label component for displaying status, categories, or counts.
 * Badges are great for:
 * - Status indicators (Active, Pending, Closed)
 * - Categories or tags
 * - Notification counts
 * - Feature labels (New, Beta, Pro)
 *
 * Like Button, this uses CVA for variant management.
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * badgeVariants - Define all badge styles
 *
 * Notice how badges are simpler than buttons:
 * - No size variants (badges are typically one size)
 * - Fewer style variants
 * - No interactive states (badges are usually not clickable)
 */
const badgeVariants = cva(
  /*
   * Base styles:
   * - inline-flex items-center: Inline with content, centered
   * - rounded-md: Slightly rounded corners
   * - border: Thin border
   * - px-2.5 py-0.5: Horizontal padding > vertical (pill-like shape)
   * - text-xs font-semibold: Small, bold text
   * - transition-colors: Smooth color transitions
   * - focus:outline-none focus:ring-2: Focus styles for accessibility
   */
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        // Default: Solid primary background
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        // Secondary: Muted, less prominent
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        // Destructive: Red/danger styling
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        // Outline: Just a border, no fill
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * BadgeProps interface
 *
 * Extends HTMLDivElement because badges are typically non-interactive
 * If you need clickable badges, you could extend HTMLButtonElement instead
 */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * Badge Component
 *
 * Note: This is NOT using forwardRef because badges rarely need refs
 * It's a simpler function component pattern
 */
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
