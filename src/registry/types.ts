/**
 * ============================================
 * REGISTRY TYPES
 * ============================================
 *
 * TypeScript type definitions for the component registry system.
 *
 * Think of this as the "blueprint" for how components are structured
 * in your library. Every component you add must follow these rules.
 *
 * Key concepts:
 * - Types: Define the shape of data (what properties exist)
 * - Union types: A value can be one of several types (string | number)
 * - Generics: Flexible types that work with any data (<T>)
 */

import { ReactNode } from "react";

/**
 * PropType - The different kinds of props a component can have
 *
 * This is a "union type" - a PropType can be any ONE of these strings.
 * We use this to determine what kind of control to show in the settings panel.
 *
 * @example
 * - "boolean" → renders a Switch
 * - "string" → renders an Input
 * - "select" → renders a Select dropdown
 * - "number" → renders a Slider or number Input
 * - "color" → renders a color picker (future feature)
 */
export type PropType = "boolean" | "string" | "select" | "number" | "color";

/**
 * PropDefinition - Describes a single prop of a component
 *
 * This tells the settings panel:
 * - What kind of control to render
 * - What values are valid
 * - What the default value is
 * - How to label it
 */
export interface PropDefinition {
  /**
   * The type of control to show
   */
  type: PropType;

  /**
   * Human-readable label shown in the settings panel
   * @example "Button Text", "Variant", "Disabled"
   */
  label: string;

  /**
   * Optional description for more context
   * Shows as helper text under the control
   */
  description?: string;

  /**
   * The default value when component first loads
   * Type varies based on PropType:
   * - boolean: true or false
   * - string: any string
   * - select: one of the options
   * - number: a number
   */
  defaultValue: unknown;

  /**
   * For "select" type: the available options
   * Each option has a value (used in code) and label (shown to user)
   */
  options?: { value: string; label: string }[];

  /**
   * For "number" type: the minimum allowed value
   */
  min?: number;

  /**
   * For "number" type: the maximum allowed value
   */
  max?: number;

  /**
   * For "number" type: the step increment
   * @example step: 0.1 allows 1.1, 1.2, 1.3...
   */
  step?: number;
}

/**
 * ButtonVariant - A specific variant/design of a button
 *
 * Each variant represents a different button design imported from various sources.
 * Variants can have different visual styles while maintaining the same props structure.
 */
export interface ButtonVariant {
  /**
   * Unique identifier for this variant
   * @example "default", "glassmorphism", "neubrutalism"
   */
  id: string;

  /**
   * Display name for the variant
   * @example "Default", "Glassmorphism", "Neubrutalism"
   */
  name: string;

  /**
   * Brief description of the variant style
   */
  description: string;

  /**
   * Render function for this variant
   */
  render: (props: Record<string, unknown>) => ReactNode;

  /**
   * Code generation for this variant
   */
  code: (props: Record<string, unknown>) => string;

  /**
   * Optional preview image URL or thumbnail
   */
  thumbnail?: string;
}

/**
 * ComponentDefinition - The complete definition of a library component
 *
 * This is the main type that describes everything about a component
 * in your library. When you add a new component, you create one of these.
 */
export interface ComponentDefinition {
  /**
   * Unique identifier for the component
   * Used internally for selection and routing
   * @example "button", "card", "badge"
   */
  id: string;

  /**
   * Display name shown in the sidebar
   * @example "Button", "Card", "Badge"
   */
  name: string;

  /**
   * Brief description of what the component does
   * Shown in the settings panel header
   */
  description: string;

  /**
   * Category for grouping in the sidebar
   * @example "Inputs", "Display", "Layout", "Feedback"
   */
  category: string;

  /**
   * The configurable props for this component
   *
   * This is a Record (object/dictionary) where:
   * - Keys are prop names (e.g., "state", "disabled")
   * - Values are PropDefinition objects
   *
   * @example
   * props: {
   *   state: { type: "select", label: "State", options: [...] },
   *   disabled: { type: "boolean", label: "Disabled", defaultValue: false }
   * }
   */
  props: Record<string, PropDefinition>;

  /**
   * Optional variants for components that support multiple designs
   * Currently used for buttons to switch between different design styles
   */
  variants?: ButtonVariant[];

  /**
   * The function that renders the component
   *
   * This is a React functional component that receives the current
   * prop values and returns the rendered component.
   *
   * @param props - The current values of all configurable props
   * @returns The rendered React component
   *
   * @example
   * render: (props) => <Button state={props.state}>{props.children}</Button>
   */
  render: (props: Record<string, unknown>) => ReactNode;

  /**
   * Function that generates the code snippet
   *
   * Takes the current prop values and returns a string of
   * code that can be copied and used elsewhere.
   *
   * @param props - The current values of all configurable props
   * @returns A string of JSX code
   *
   * @example
   * code: (props) => `<Button state="${props.state}">${props.children}</Button>`
   */
  code: (props: Record<string, unknown>) => string;
}

/**
 * ComponentRegistry - A collection of component definitions
 *
 * This is simply an array of ComponentDefinition objects.
 * The registry holds all the components available in your library.
 */
export type ComponentRegistry = ComponentDefinition[];
