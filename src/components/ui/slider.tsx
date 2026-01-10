/**
 * ============================================
 * SLIDER COMPONENT
 * ============================================
 *
 * A range input for selecting numeric values.
 *
 * Use sliders when:
 * - The user needs to select from a continuous range
 * - The exact value is less important than the general range
 * - You want an interactive, visual way to adjust values
 *
 * Examples: Volume control, opacity, font size
 *
 * This wraps the native <input type="range"> for accessibility
 * while providing custom styling.
 */

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * SliderProps - Props for the Slider component
 *
 * Extends native input props but overrides some:
 * - value: Current value (number, not string)
 * - onValueChange: Custom callback with number
 * - min, max, step: Range configuration
 */
interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

/**
 * Slider Component
 *
 * Wraps a native range input with custom styling.
 * Native range inputs have great accessibility:
 * - Keyboard support (arrow keys)
 * - Screen reader support
 * - Touch support on mobile
 */
const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, value = 0, onValueChange, min = 0, max = 100, step = 1, ...props }, ref) => {
    /*
     * Calculate the fill percentage for the visual track
     * This creates the "filled" portion of the slider
     */
    const percentage = ((value - min) / (max - min)) * 100;

    return (
      <div className="relative flex w-full touch-none select-none items-center">
        <input
          type="range"
          ref={ref}
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onValueChange?.(Number(e.target.value))}
          className={cn(
            /*
             * Slider styles:
             *
             * Layout:
             * - w-full: Full width
             * - h-1.5: Track height
             *
             * Visual:
             * - appearance-none: Remove browser default styling
             * - bg-primary/20: Track background (20% opacity primary color)
             * - rounded-full: Fully rounded
             * - cursor-pointer: Pointer cursor
             *
             * Thumb (the draggable handle):
             * - [&::-webkit-slider-thumb]: WebKit browsers
             * - [&::-moz-range-thumb]: Firefox
             *
             * Thumb styles:
             * - appearance-none: Remove default
             * - h-4 w-4: Thumb size
             * - rounded-full: Circular
             * - bg-primary: Primary color
             * - border-0: No border
             * - shadow: Small shadow for depth
             * - cursor-pointer: Pointer cursor
             * - transition-transform: Smooth scaling
             * - hover:scale-110: Grow slightly on hover
             *
             * Focus styles:
             * - focus:outline-none: Remove default focus
             * - focus-visible:ring-2: Custom focus ring
             */
            "w-full h-1.5 appearance-none bg-primary/20 rounded-full cursor-pointer",
            "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:shadow [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110",
            "[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow [&::-moz-range-thumb]:cursor-pointer",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            className
          )}
          /*
           * CSS custom property for the fill
           * This is used by the track gradient to show progress
           */
          style={{
            background: `linear-gradient(to right, hsl(var(--primary)) ${percentage}%, hsl(var(--primary) / 0.2) ${percentage}%)`
          }}
          {...props}
        />
      </div>
    );
  }
);
Slider.displayName = "Slider";

export { Slider };
