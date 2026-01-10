/**
 * ============================================
 * BUTTON COMPONENT
 * ============================================
 *
 * A versatile button component with multiple variants and sizes.
 * This is a "compound component" pattern - one component that can
 * look and behave differently based on the props you pass it.
 *
 * Key concepts:
 * - Variants: Different visual styles (primary, secondary, outline, etc.)
 * - CVA (Class Variance Authority): A library for managing variant styles
 * - forwardRef: Allows parent components to get a reference to the DOM button
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * buttonVariants - Defines all possible button styles using CVA
 *
 * CVA works like this:
 * 1. First argument: Base classes that always apply
 * 2. variants: Different style options organized by category
 * 3. defaultVariants: What to use when no variant is specified
 *
 * The function returns a function that you call with variant props
 * to get the appropriate class names.
 */
const buttonVariants = cva(
  /*
   * Base classes - these ALWAYS apply to every button:
   * - inline-flex items-center justify-center: Flexbox for centering content
   * - gap-2: Space between icon and text (if both present)
   * - whitespace-nowrap: Prevent text from wrapping
   * - rounded-md: Medium border radius
   * - text-sm font-medium: Typography settings
   * - transition-colors: Smooth color changes on hover/focus
   * - focus-visible:outline-none: Remove default focus outline
   * - focus-visible:ring-1: Add custom focus ring (accessibility!)
   * - disabled:pointer-events-none disabled:opacity-50: Disabled state
   */
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      /**
       * variant - Controls the visual style/color scheme
       *
       * Each variant defines background, text color, and hover states
       */
      variant: {
        // Primary: Main call-to-action, high emphasis
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        // Destructive: For delete/danger actions (red tones)
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        // Outline: Bordered, transparent background
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        // Secondary: Less prominent than primary
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        // Ghost: No background until hover
        ghost: "hover:bg-accent hover:text-accent-foreground",
        // Link: Looks like a text link
        link: "text-primary underline-offset-4 hover:underline",
      },
      /**
       * size - Controls the button dimensions and padding
       */
      size: {
        default: "h-9 px-4 py-2",     // Standard size
        sm: "h-8 rounded-md px-3 text-xs",  // Small
        lg: "h-10 rounded-md px-8",   // Large
        icon: "h-9 w-9",              // Square, for icon-only buttons
      },
    },
    // What to use when variant/size props aren't provided
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/**
 * ButtonProps - TypeScript interface for the button's props
 *
 * - React.ButtonHTMLAttributes<HTMLButtonElement>: All standard button props
 * - VariantProps<typeof buttonVariants>: The variant and size props from CVA
 * - asChild: When true, renders children as the element (useful for links styled as buttons)
 *
 * The '&' combines these types together (intersection type)
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

/**
 * Button Component
 *
 * forwardRef explained:
 * - Normally, you can't pass a 'ref' prop to a function component
 * - forwardRef lets us "forward" the ref to the underlying DOM element
 * - This is useful when parent components need direct DOM access
 *
 * The generic types <HTMLButtonElement, ButtonProps> specify:
 * - What the ref points to (HTMLButtonElement)
 * - What props the component accepts (ButtonProps)
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    /*
     * Determine what element to render
     * - If asChild is true, we'd use a Slot component (from Radix UI)
     * - For now, we always render a button
     *
     * The Slot pattern is useful for composing components,
     * e.g., making a Link look like a Button
     */
    const Comp = "button";

    return (
      <Comp
        /*
         * cn() merges:
         * 1. buttonVariants({ variant, size }): Generated variant classes
         * 2. className: Any custom classes passed by the user
         *
         * This allows customization while keeping variant styles
         */
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        /*
         * ...props spreads all other props onto the button
         * This includes onClick, disabled, type, etc.
         */
        {...props}
      />
    );
  }
);

/*
 * displayName helps with debugging in React DevTools
 * Without it, the component would show as "ForwardRef"
 */
Button.displayName = "Button";

/*
 * Named exports vs default exports:
 * - Named exports (what we use) allow multiple exports from one file
 * - They also enable better tree-shaking (dead code elimination)
 * - Import like: import { Button, buttonVariants } from "./button"
 */
export { Button, buttonVariants };
