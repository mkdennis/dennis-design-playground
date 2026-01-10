/**
 * ============================================
 * CARD - Registry Component Definition
 * ============================================
 *
 * Card component for the registry.
 * Cards are versatile containers for grouping related content.
 */

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ComponentDefinition } from "../types";

export const cardComponent: ComponentDefinition = {
  id: "card",
  name: "Card",
  description: "A container for grouping related content with optional header, content, and footer sections. Perfect for displaying information in a structured, scannable way.",
  category: "Layout",

  props: {
    /*
     * Card title - the main heading
     */
    title: {
      type: "string",
      label: "Title",
      description: "The main heading of the card",
      defaultValue: "Card Title",
    },

    /*
     * Card description - supporting text below title
     */
    description: {
      type: "string",
      label: "Description",
      description: "Supporting text shown below the title",
      defaultValue: "Card description goes here.",
    },

    /*
     * Card content - the main body text
     */
    content: {
      type: "string",
      label: "Content",
      description: "The main content of the card",
      defaultValue: "This is the card content area where you can place any information or components.",
    },

    /*
     * Show footer - toggle the footer section
     */
    showFooter: {
      type: "boolean",
      label: "Show Footer",
      description: "Display the footer with action buttons",
      defaultValue: true,
    },

    /*
     * Primary action text
     */
    primaryAction: {
      type: "string",
      label: "Primary Action",
      description: "Text for the primary action button",
      defaultValue: "Save",
    },

    /*
     * Secondary action text
     */
    secondaryAction: {
      type: "string",
      label: "Secondary Action",
      description: "Text for the secondary action button",
      defaultValue: "Cancel",
    },
  },

  render: (props) => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{props.title as string}</CardTitle>
        <CardDescription>{props.description as string}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {props.content as string}
        </p>
      </CardContent>
      {/*
       * Conditional rendering with &&
       * If showFooter is true, render the CardFooter
       * If false, this whole expression returns false (renders nothing)
       * Cast to boolean to satisfy TypeScript
       */}
      {(props.showFooter as boolean) && (
        <CardFooter className="flex justify-between">
          <Button variant="outline">{props.secondaryAction as string}</Button>
          <Button>{props.primaryAction as string}</Button>
        </CardFooter>
      )}
    </Card>
  ),

  code: (props) => {
    const lines = [
      "<Card>",
      "  <CardHeader>",
      `    <CardTitle>${props.title}</CardTitle>`,
      `    <CardDescription>${props.description}</CardDescription>`,
      "  </CardHeader>",
      "  <CardContent>",
      `    <p>${props.content}</p>`,
      "  </CardContent>",
    ];

    if (props.showFooter) {
      lines.push(
        "  <CardFooter className=\"flex justify-between\">",
        `    <Button variant="outline">${props.secondaryAction}</Button>`,
        `    <Button>${props.primaryAction}</Button>`,
        "  </CardFooter>"
      );
    }

    lines.push("</Card>");

    return lines.join("\n");
  },
};
