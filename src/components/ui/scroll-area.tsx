/**
 * ============================================
 * SCROLL AREA COMPONENT
 * ============================================
 *
 * A container with custom-styled scrollbars.
 *
 * Why custom scroll areas?
 * - Consistent look across browsers
 * - Match the dark theme aesthetic
 * - Better control over scrollbar appearance
 *
 * This is a simplified version - for more features,
 * consider using Radix UI's ScrollArea component.
 */

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * ScrollAreaProps
 *
 * Extends div props and adds an optional orientation
 */
interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "vertical" | "horizontal" | "both";
}

/**
 * ScrollArea Component
 *
 * Uses CSS overflow properties to enable scrolling.
 * The custom scrollbar styling comes from globals.css
 */
const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, orientation = "vertical", children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        /*
         * Base styles:
         * - relative: For potential absolute-positioned children
         *
         * Overflow:
         * - overflow-auto: Shows scrollbar only when needed
         * - overflow-hidden: Clips content that overflows
         *
         * The actual scrollbar styling is in globals.css using
         * ::-webkit-scrollbar pseudo-elements
         */
        "relative",
        orientation === "vertical" && "overflow-y-auto overflow-x-hidden",
        orientation === "horizontal" && "overflow-x-auto overflow-y-hidden",
        orientation === "both" && "overflow-auto",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
ScrollArea.displayName = "ScrollArea";

export { ScrollArea };
