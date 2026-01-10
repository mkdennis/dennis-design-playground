/**
 * ============================================
 * BADGE - Registry Component Definition
 * ============================================
 *
 * Badge component for the registry.
 * Badges are small labels for displaying status, categories, or counts.
 */

import { Badge } from "@/components/ui/badge";
import { ComponentDefinition } from "../types";

export const badgeComponent: ComponentDefinition = {
  id: "badge",
  name: "Badge",
  description: "A small label component for displaying status indicators, categories, tags, or counts. Great for highlighting information at a glance.",
  category: "Display",

  props: {
    /*
     * Badge text content
     */
    children: {
      type: "string",
      label: "Text",
      description: "The text displayed in the badge",
      defaultValue: "Badge",
    },

    /*
     * Badge variant - visual style
     */
    variant: {
      type: "select",
      label: "Variant",
      description: "The visual style of the badge",
      defaultValue: "default",
      options: [
        { value: "default", label: "Default" },
        { value: "secondary", label: "Secondary" },
        { value: "destructive", label: "Destructive" },
        { value: "outline", label: "Outline" },
      ],
    },
  },

  render: (props) => (
    <Badge
      variant={props.variant as "default" | "secondary" | "destructive" | "outline"}
    >
      {props.children as string}
    </Badge>
  ),

  code: (props) => {
    const variantProp = props.variant !== "default"
      ? ` variant="${props.variant}"`
      : "";

    return `<Badge${variantProp}>${props.children}</Badge>`;
  },
};
