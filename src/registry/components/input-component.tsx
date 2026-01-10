/**
 * ============================================
 * INPUT - Registry Component Definition
 * ============================================
 *
 * Input component for the registry.
 * A form input for collecting text data from users.
 */

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ComponentDefinition } from "../types";

export const inputComponent: ComponentDefinition = {
  id: "input",
  name: "Input",
  description: "A text input field for forms. Supports various input types like text, email, password, and more. Can be combined with a Label for accessibility.",
  category: "Inputs",

  props: {
    /*
     * Placeholder text - shown when input is empty
     */
    placeholder: {
      type: "string",
      label: "Placeholder",
      description: "Placeholder text shown when the input is empty",
      defaultValue: "Enter text...",
    },

    /*
     * Input type - determines keyboard on mobile and validation
     */
    inputType: {
      type: "select",
      label: "Type",
      description: "The type of input (affects mobile keyboard and validation)",
      defaultValue: "text",
      options: [
        { value: "text", label: "Text" },
        { value: "email", label: "Email" },
        { value: "password", label: "Password" },
        { value: "number", label: "Number" },
        { value: "search", label: "Search" },
        { value: "tel", label: "Telephone" },
        { value: "url", label: "URL" },
      ],
    },

    /*
     * Show label - toggle the label above the input
     */
    showLabel: {
      type: "boolean",
      label: "Show Label",
      description: "Display a label above the input",
      defaultValue: true,
    },

    /*
     * Label text
     */
    labelText: {
      type: "string",
      label: "Label Text",
      description: "The text shown in the label",
      defaultValue: "Email",
    },

    /*
     * Disabled state
     */
    disabled: {
      type: "boolean",
      label: "Disabled",
      description: "When true, the input cannot be edited",
      defaultValue: false,
    },
  },

  render: (props) => (
    /*
     * Wrapper div with flex column layout
     * gap-2 adds space between label and input
     */
    <div className="flex flex-col gap-2 w-full max-w-sm">
      {/*
       * Conditional rendering: only show Label if showLabel is true
       * Cast to boolean to satisfy TypeScript
       */}
      {(props.showLabel as boolean) && (
        <Label htmlFor="demo-input">{props.labelText as string}</Label>
      )}
      <Input
        id="demo-input"
        type={props.inputType as string}
        placeholder={props.placeholder as string}
        disabled={props.disabled as boolean}
      />
    </div>
  ),

  code: (props) => {
    const lines: string[] = [];

    if (props.showLabel) {
      lines.push(`<Label htmlFor="input">${props.labelText}</Label>`);
    }

    /*
     * Build the Input props string
     */
    const inputProps: string[] = ['id="input"'];

    if (props.inputType !== "text") {
      inputProps.push(`type="${props.inputType}"`);
    }

    inputProps.push(`placeholder="${props.placeholder}"`);

    if (props.disabled) {
      inputProps.push("disabled");
    }

    lines.push(`<Input ${inputProps.join(" ")} />`);

    return lines.join("\n");
  },
};
