/**
 * ============================================
 * SWITCH COMPONENT
 * ============================================
 *
 * A toggle switch for boolean settings.
 * Think of it like a fancy checkbox that looks like a physical switch.
 *
 * When to use Switch vs Checkbox:
 * - Switch: For immediate on/off settings (like dark mode toggle)
 * - Checkbox: For selections that are submitted later (like form fields)
 *
 * This is a custom implementation (not using Radix UI)
 * to keep dependencies minimal and help you understand how it works.
 */

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * SwitchProps - Props for the Switch component
 *
 * We're creating a controlled component that mimics a checkbox:
 * - checked: Whether the switch is on or off
 * - onCheckedChange: Callback when the user toggles it
 * - disabled: Whether the switch can be interacted with
 */
export interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
}

/**
 * Switch Component
 *
 * Internally, this uses a hidden checkbox for accessibility.
 * Screen readers understand checkboxes, so we get accessibility "for free"
 * while still having our custom visual design.
 */
const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked = false, onCheckedChange, disabled = false, className, id }, ref) => {
    return (
      <button
        ref={ref}
        id={id}
        type="button"  /* Prevent form submission if inside a form */
        role="switch"  /* ARIA role tells screen readers this is a switch */
        aria-checked={checked}  /* ARIA attribute for the current state */
        disabled={disabled}
        onClick={() => onCheckedChange?.(!checked)}  /* Toggle on click */
        className={cn(
          /*
           * Switch track (the background pill) styles:
           *
           * Layout:
           * - peer: Enable peer-* styling for siblings
           * - inline-flex: Inline flexbox
           * - h-5 w-9: Height and width (the track size)
           * - shrink-0: Don't shrink in flex layouts
           *
           * Visual:
           * - cursor-pointer: Show pointer on hover
           * - items-center: Center the thumb vertically
           * - rounded-full: Fully rounded (pill shape)
           * - border-2 border-transparent: Border for focus state
           *
           * Colors:
           * - bg-input: Default (off) background color
           * - data-[state=checked]:bg-primary: On state uses primary color
           *
           * States:
           * - transition-colors: Smooth color transition
           * - focus-visible:outline-none focus-visible:ring-2: Focus ring
           * - disabled:cursor-not-allowed disabled:opacity-50: Disabled state
           *
           * data-[state=checked]: This is a data attribute selector
           * We set data-state="checked" when the switch is on
           */
          "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
          checked ? "bg-primary" : "bg-input",
          className
        )}
        data-state={checked ? "checked" : "unchecked"}
      >
        {/*
         * Switch thumb (the circle that moves)
         *
         * - pointer-events-none: Click passes through to the button
         * - block: Display as block
         * - h-4 w-4: Size of the thumb
         * - rounded-full: Circular shape
         * - bg-background: Uses background color (contrasts with track)
         * - shadow-lg: Shadow for depth
         * - ring-0: No ring
         * - transition-transform: Smooth movement animation
         *
         * Position:
         * - translate-x-0: Left position when off
         * - translate-x-4: Right position when on (moves 4 units = 16px)
         *
         * The transition-transform makes the thumb slide smoothly
         */}
        <span
          className={cn(
            "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform",
            checked ? "translate-x-4" : "translate-x-0"
          )}
        />
      </button>
    );
  }
);
Switch.displayName = "Switch";

export { Switch };
