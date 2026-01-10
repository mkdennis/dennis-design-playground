/**
 * ============================================
 * ALERT COMPONENT
 * ============================================
 *
 * A component for displaying important messages to users.
 *
 * Alerts are used for:
 * - Success messages ("Your changes have been saved")
 * - Error messages ("Something went wrong")
 * - Warnings ("This action cannot be undone")
 * - Informational messages ("New features available")
 *
 * Unlike notifications/toasts, alerts are inline and don't auto-dismiss.
 * Use them for messages that should persist until acknowledged.
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * alertVariants - Defines the different alert styles
 *
 * Each variant has specific colors that convey meaning:
 * - default: Neutral, informational
 * - destructive: Error, danger, critical
 */
const alertVariants = cva(
  /*
   * Base alert styles:
   * - relative: For positioning icons or close buttons
   * - w-full: Full width of container
   * - rounded-lg: Rounded corners
   * - border: Border around the alert
   * - px-4 py-3: Horizontal and vertical padding
   * - text-sm: Small text
   *
   * Child selectors:
   * - [&>svg]: Styles for direct child SVG icons
   * - [&>svg~*]: Styles for elements after the icon
   */
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        /*
         * Default: Subtle background with theme colors
         */
        default: "bg-background text-foreground",
        /*
         * Destructive: Red/danger colors
         * Uses darker red for border and text
         */
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Alert - Main container component
 */
const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    /*
     * role="alert" tells screen readers this is important
     * The screen reader will announce this content immediately
     */
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

/**
 * AlertTitle - The heading of the alert
 */
const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      /*
       * - mb-1: Margin bottom for spacing from description
       * - font-medium: Medium weight
       * - leading-none: Tight line height
       * - tracking-tight: Slightly tight letter spacing
       */
      "mb-1 font-medium leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

/**
 * AlertDescription - Supporting text in the alert
 */
const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      /*
       * - text-sm: Small text
       * - [&_p]: Styles for nested paragraphs
       * - leading-relaxed: More readable line height
       */
      "text-sm [&_p]:leading-relaxed",
      className
    )}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
