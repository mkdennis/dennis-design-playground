/**
 * ============================================
 * TEXTAREA COMPONENT
 * ============================================
 *
 * A multi-line text input component.
 *
 * Use textarea instead of input when:
 * - Users need to enter multiple lines of text
 * - Content might be longer (comments, descriptions, code)
 * - You want to show more context in the input
 *
 * This is a styled wrapper around the native <textarea> element.
 */

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * TextareaProps - All native textarea attributes
 *
 * Includes props like:
 * - rows: Number of visible text lines
 * - cols: Visible width in character columns
 * - placeholder: Placeholder text
 * - value/onChange: For controlled inputs
 * - maxLength: Maximum character count
 * - readOnly: Makes it non-editable but selectable
 */
export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

/**
 * Textarea Component
 *
 * forwardRef is used so parent components can:
 * - Focus the textarea programmatically
 * - Access the DOM node for measurements
 * - Integrate with form libraries
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          /*
           * Textarea styles (similar to Input):
           *
           * Layout:
           * - flex: Flexbox
           * - min-h-[60px]: Minimum height
           * - w-full: Full width
           *
           * Spacing:
           * - px-3 py-2: Padding
           *
           * Visual:
           * - rounded-md: Rounded corners
           * - border border-input: Border
           * - bg-transparent: Transparent background
           * - text-base md:text-sm: Responsive font size
           *
           * Placeholder:
           * - placeholder:text-muted-foreground: Dimmed placeholder
           *
           * Focus:
           * - focus-visible:outline-none: Remove default outline
           * - focus-visible:ring-1 focus-visible:ring-ring: Custom focus ring
           *
           * Disabled:
           * - disabled:cursor-not-allowed: Not-allowed cursor
           * - disabled:opacity-50: Reduced opacity
           *
           * Resize behavior:
           * By default, textareas are resizable. You can control this
           * by passing className="resize-none" (no resize)
           * or className="resize-y" (vertical only)
           */
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
