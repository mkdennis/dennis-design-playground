/**
 * ============================================
 * ALERT - Registry Component Definition
 * ============================================
 *
 * Alert component for the registry.
 * Displays important messages that need user attention.
 */

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react";
import { ComponentDefinition } from "../types";

/**
 * Icon mapping - maps variant names to their icons
 *
 * This demonstrates a common React pattern:
 * Store components in an object and look them up by key
 */
const iconMap = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
};

export const alertComponent: ComponentDefinition = {
  id: "alert",
  name: "Alert",
  description: "A component for displaying important messages like errors, warnings, success confirmations, or informational notices. Alerts are inline and persist until dismissed.",
  category: "Feedback",

  props: {
    /*
     * Alert title - main heading
     */
    title: {
      type: "string",
      label: "Title",
      description: "The main heading of the alert",
      defaultValue: "Heads up!",
    },

    /*
     * Alert description - supporting text
     */
    description: {
      type: "string",
      label: "Description",
      description: "Supporting text with more details",
      defaultValue: "You can add components to your app using the CLI.",
    },

    /*
     * Alert type - determines icon and semantics
     */
    alertType: {
      type: "select",
      label: "Type",
      description: "The type of alert (affects icon and color)",
      defaultValue: "info",
      options: [
        { value: "info", label: "Info" },
        { value: "success", label: "Success" },
        { value: "warning", label: "Warning" },
        { value: "error", label: "Error" },
      ],
    },

    /*
     * Show icon - toggle the icon display
     */
    showIcon: {
      type: "boolean",
      label: "Show Icon",
      description: "Display an icon in the alert",
      defaultValue: true,
    },
  },

  render: (props) => {
    /*
     * Dynamic icon selection
     * Get the icon component from our iconMap based on alertType
     * The fallback (Info) handles any unexpected values
     */
    const IconComponent = iconMap[props.alertType as keyof typeof iconMap] || Info;

    /*
     * Map alertType to the Alert's variant prop
     * Error uses "destructive" variant for red styling
     * All others use "default"
     */
    const variant = props.alertType === "error" ? "destructive" : "default";

    return (
      <Alert variant={variant} className="max-w-md">
        {/*
         * Conditional icon rendering
         * h-4 w-4 sets the icon size (16x16 pixels)
         * Cast to boolean to satisfy TypeScript
         */}
        {(props.showIcon as boolean) && <IconComponent className="h-4 w-4" />}
        <AlertTitle>{props.title as string}</AlertTitle>
        <AlertDescription>{props.description as string}</AlertDescription>
      </Alert>
    );
  },

  code: (props) => {
    /*
     * Map alertType to the icon component name
     * This will be shown in the generated code
     */
    const iconNames: Record<string, string> = {
      info: "Info",
      success: "CheckCircle2",
      warning: "AlertTriangle",
      error: "AlertCircle",
    };

    const iconName = iconNames[props.alertType as string] || "Info";
    const variant = props.alertType === "error" ? ' variant="destructive"' : "";

    const lines: string[] = [];
    lines.push(`<Alert${variant}>`);

    if (props.showIcon) {
      lines.push(`  <${iconName} className="h-4 w-4" />`);
    }

    lines.push(`  <AlertTitle>${props.title}</AlertTitle>`);
    lines.push(`  <AlertDescription>${props.description}</AlertDescription>`);
    lines.push("</Alert>");

    return lines.join("\n");
  },
};
