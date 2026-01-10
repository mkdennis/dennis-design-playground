/**
 * ============================================
 * SELECT COMPONENT
 * ============================================
 *
 * A styled dropdown select component.
 *
 * This is a simple wrapper around the native <select> element.
 * Native selects are:
 * - Fully accessible out of the box
 * - Work great on mobile (native pickers)
 * - Keyboard navigable
 *
 * For more complex dropdowns (with icons, groups, search),
 * you'd use a library like Radix UI or Headless UI.
 */

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * SelectProps - Extends native select attributes
 *
 * Everything a native <select> can do, our Select can do too:
 * - value: The currently selected value
 * - onChange: Called when selection changes
 * - disabled: Whether the select is disabled
 * - children: The <option> elements
 */
export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

/**
 * Select Component
 *
 * Wrapped in a div to position the custom arrow icon
 * The native arrow is hidden with CSS (appearance-none)
 */
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      /*
       * Wrapper div:
       * - relative: Creates positioning context for the arrow icon
       * - w-full: Full width
       */
      <div className="relative w-full">
        <select
          className={cn(
            /*
             * Select styles:
             *
             * Layout:
             * - flex h-9 w-full: Full width, fixed height
             * - items-center: Vertically center text
             *
             * Spacing:
             * - px-3 py-2: Padding
             * - pr-8: Extra right padding for the arrow icon
             *
             * Visual:
             * - rounded-md: Rounded corners
             * - border border-input: Border
             * - bg-transparent: Transparent background
             * - text-sm: Small text
             *
             * Behavior:
             * - appearance-none: Removes native browser styling
             *   This is crucial! It removes the default arrow
             *   so we can add our own custom one
             *
             * States:
             * - focus:outline-none focus:ring-1: Focus ring
             * - disabled:cursor-not-allowed disabled:opacity-50: Disabled
             *
             * Why appearance-none?
             * Each browser styles <select> differently. By removing
             * the default appearance, we get consistent styling across browsers.
             */
            "flex h-9 w-full items-center rounded-md border border-input bg-transparent px-3 py-2 pr-8 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 appearance-none",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        {/*
         * Custom arrow icon
         *
         * - absolute: Position relative to the wrapper div
         * - right-3 top-1/2: Right side, vertically centered
         * - -translate-y-1/2: Offset by half its height to truly center
         * - pointer-events-none: Clicks pass through to the select
         * - h-4 w-4: Icon size
         * - opacity-50: Slightly dimmed
         *
         * ChevronDown is from lucide-react, a popular icon library
         */}
        <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50 pointer-events-none" />
      </div>
    );
  }
);
Select.displayName = "Select";

/**
 * SelectOption Component
 *
 * A styled option for the select.
 * This is mostly for semantic clarity - native options work fine too.
 */
const SelectOption = React.forwardRef<
  HTMLOptionElement,
  React.OptionHTMLAttributes<HTMLOptionElement>
>(({ className, ...props }, ref) => (
  <option
    ref={ref}
    className={cn("bg-background", className)}
    {...props}
  />
));
SelectOption.displayName = "SelectOption";

export { Select, SelectOption };
