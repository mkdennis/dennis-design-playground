/**
 * ============================================
 * LABEL COMPONENT
 * ============================================
 *
 * A styled label for form inputs.
 *
 * Why labels are important:
 * 1. Accessibility: Screen readers use labels to describe inputs
 * 2. UX: Clicking a label focuses its associated input
 * 3. Context: Labels tell users what information to enter
 *
 * The htmlFor prop on <label> should match the id prop on the input
 * This creates the association between them.
 *
 * @example
 * <Label htmlFor="email">Email Address</Label>
 * <Input id="email" type="email" />
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * labelVariants - Style definitions for the label
 *
 * Labels are simpler than buttons - usually just one style
 * But using CVA keeps our pattern consistent across components
 */
const labelVariants = cva(
  /*
   * Label styles:
   * - text-sm: Small text size
   * - font-medium: Medium weight (not too bold, not too light)
   * - leading-none: Line height of 1
   * - peer-disabled:cursor-not-allowed: Change cursor when sibling input is disabled
   * - peer-disabled:opacity-70: Dim label when sibling input is disabled
   *
   * "peer" is a Tailwind feature:
   * When you add className="peer" to an input, you can style
   * siblings based on the input's state using peer-* classes
   *
   * @example
   * <Input className="peer" disabled />
   * <Label>This will be dimmed because of peer-disabled:opacity-70</Label>
   */
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

/**
 * LabelProps interface
 *
 * Extends native <label> attributes which includes:
 * - htmlFor: The id of the associated input
 * - All standard HTML attributes
 */
export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {}

/**
 * Label Component
 *
 * Using forwardRef for consistency with other form components
 * and in case parent needs DOM access
 */
const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(labelVariants(), className)}
      {...props}
    />
  )
);
Label.displayName = "Label";

export { Label };
