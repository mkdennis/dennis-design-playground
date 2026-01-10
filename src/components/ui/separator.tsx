/**
 * ============================================
 * SEPARATOR COMPONENT
 * ============================================
 *
 * A visual divider between sections of content.
 *
 * Separators help:
 * - Create visual hierarchy
 * - Group related content
 * - Improve scannability of interfaces
 *
 * Can be horizontal (default) or vertical.
 */

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * SeparatorProps
 *
 * - orientation: "horizontal" or "vertical"
 * - decorative: If true, separator is purely visual (not announced by screen readers)
 */
interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

/**
 * Separator Component
 *
 * Uses ARIA role="separator" for accessibility
 * Screen readers will announce this as a separator between content
 */
const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <div
      ref={ref}
      /*
       * ARIA attributes:
       * - role="none" (decorative) or role="separator" (meaningful)
       * - aria-orientation: Tells screen readers the direction
       *
       * Decorative separators are ignored by screen readers.
       * Use decorative=false when the separator conveys meaning,
       * like separating groups in a menu.
       */
      role={decorative ? "none" : "separator"}
      aria-orientation={orientation}
      className={cn(
        /*
         * Base styles:
         * - shrink-0: Don't shrink in flex layouts
         * - bg-border: Uses border color from theme
         *
         * Orientation-specific styles:
         * - Horizontal: h-[1px] (thin line) w-full (full width)
         * - Vertical: h-full (full height) w-[1px] (thin line)
         */
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = "Separator";

export { Separator };
