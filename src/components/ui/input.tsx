/**
 * ============================================
 * INPUT COMPONENT
 * ============================================
 *
 * A styled text input component for forms.
 *
 * Key concepts:
 * - Inherits all native <input> props (type, placeholder, value, onChange, etc.)
 * - Styled to match our dark theme
 * - Includes focus states for accessibility
 * - Handles disabled state
 *
 * This is a "controlled" or "uncontrolled" component depending on how you use it:
 * - Controlled: You provide value and onChange props
 * - Uncontrolled: You let the browser manage the state
 */

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * InputProps - Extends all native input attributes
 *
 * React.ComponentProps<"input"> is a cleaner way to get all the props
 * that a native <input> element accepts (type, value, onChange, placeholder, etc.)
 */
export type InputProps = React.ComponentProps<"input">;

/**
 * Input Component
 *
 * Using forwardRef because:
 * 1. Form libraries (like react-hook-form) need refs to inputs
 * 2. You might want to programmatically focus the input
 * 3. Parent components might need to access the DOM node
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        /*
         * type defaults to "text" but can be overridden
         * Common types: text, email, password, number, search, tel, url
         */
        type={type}
        className={cn(
          /*
           * Input styles explained:
           *
           * Layout:
           * - flex: Flexbox (useful if we add icons inside)
           * - h-9: Fixed height (36px)
           * - w-full: Full width of parent container
           *
           * Spacing:
           * - px-3 py-1: Horizontal and vertical padding
           *
           * Typography:
           * - text-base: Base font size
           * - md:text-sm: Slightly smaller on medium+ screens
           *
           * Visual:
           * - rounded-md: Rounded corners
           * - border border-input: Border using theme color
           * - bg-transparent: See-through background
           * - shadow-sm: Subtle shadow
           *
           * States:
           * - transition-colors: Smooth color changes
           * - placeholder:text-muted-foreground: Dim placeholder text
           *
           * Focus (important for accessibility!):
           * - focus-visible:outline-none: Remove browser default
           * - focus-visible:ring-1 focus-visible:ring-ring: Custom focus ring
           *
           * Disabled:
           * - disabled:cursor-not-allowed: Show "not allowed" cursor
           * - disabled:opacity-50: Dim the input
           *
           * File input:
           * - file:border-0 file:bg-transparent: Style the file picker
           * - file:text-sm file:font-medium: File text styling
           * - file:text-foreground: File text color
           */
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
