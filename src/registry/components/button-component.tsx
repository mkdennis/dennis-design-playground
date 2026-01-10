/**
 * ============================================
 * BUTTON - Registry Component Definition
 * ============================================
 *
 * This file defines the Button component for the registry.
 *
 * Notice this is different from the UI component (components/ui/button.tsx):
 * - UI component: The actual reusable Button component
 * - Registry component: Metadata about how to display and configure it
 *
 * The registry component wraps the UI component and adds:
 * - Prop definitions for the settings panel
 * - Code generation for export
 * - Description and categorization
 */

import { Button } from "@/components/ui/button";
import { ComponentDefinition } from "../types";

/**
 * buttonComponent - Complete definition for the Button
 *
 * This object follows the ComponentDefinition interface.
 * It tells the playground everything it needs to know about the Button.
 */
export const buttonComponent: ComponentDefinition = {
  /*
   * Unique ID - used for internal selection and routing
   */
  id: "button",

  /*
   * Display name - shown in the sidebar and header
   */
  name: "Button",

  /*
   * Description - helps users understand what this component is for
   */
  description: "A clickable button with multiple variants and sizes. Use buttons for actions like submitting forms, opening dialogs, or triggering operations.",

  /*
   * Category - groups related components in the sidebar
   */
  category: "Inputs",

  /*
   * Props - defines all the configurable properties
   *
   * Each prop becomes a control in the settings panel.
   * The key (e.g., "children") is the actual prop name.
   */
  props: {
    /*
     * children - The text inside the button
     * Using "string" type renders a text Input
     */
    children: {
      type: "string",
      label: "Button Text",
      description: "The text displayed inside the button",
      defaultValue: "Click me",
    },

    /*
     * variant - Visual style of the button
     * Using "select" type renders a dropdown
     */
    variant: {
      type: "select",
      label: "Variant",
      description: "The visual style of the button",
      defaultValue: "default",
      options: [
        { value: "default", label: "Default" },
        { value: "secondary", label: "Secondary" },
        { value: "destructive", label: "Destructive" },
        { value: "outline", label: "Outline" },
        { value: "ghost", label: "Ghost" },
        { value: "link", label: "Link" },
      ],
    },

    /*
     * size - Button dimensions
     */
    size: {
      type: "select",
      label: "Size",
      description: "The size of the button",
      defaultValue: "default",
      options: [
        { value: "default", label: "Default" },
        { value: "sm", label: "Small" },
        { value: "lg", label: "Large" },
        { value: "icon", label: "Icon" },
      ],
    },

    /*
     * disabled - Whether button is interactive
     * Using "boolean" type renders a Switch
     */
    disabled: {
      type: "boolean",
      label: "Disabled",
      description: "When true, the button cannot be clicked",
      defaultValue: false,
    },
  },

  /*
   * render - Function that creates the actual component
   *
   * This receives the current prop values from the settings panel
   * and returns the rendered Button component.
   *
   * Note: We cast props to their expected types since they come as "unknown"
   */
  render: (props) => (
    <Button
      variant={props.variant as "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"}
      size={props.size as "default" | "sm" | "lg" | "icon"}
      disabled={props.disabled as boolean}
    >
      {props.children as string}
    </Button>
  ),

  /*
   * code - Generates copyable code snippet
   *
   * This creates a string representation of the JSX
   * that users can copy and paste into their projects.
   *
   * Template literals (``) allow multi-line strings and ${} interpolation.
   */
  code: (props) => {
    /*
     * Build an array of prop strings
     * Only include props that aren't their default values
     * This keeps the generated code clean
     */
    const propsArray: string[] = [];

    if (props.variant !== "default") {
      propsArray.push(`variant="${props.variant}"`);
    }
    if (props.size !== "default") {
      propsArray.push(`size="${props.size}"`);
    }
    if (props.disabled) {
      propsArray.push("disabled");
    }

    /*
     * Join props with spaces and add to the component
     */
    const propsString = propsArray.length > 0 ? ` ${propsArray.join(" ")}` : "";

    return `<Button${propsString}>${props.children}</Button>`;
  },
};
