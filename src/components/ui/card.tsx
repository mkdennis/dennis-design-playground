/**
 * ============================================
 * CARD COMPONENT
 * ============================================
 *
 * A container component for grouping related content.
 * Cards are one of the most common UI patterns - they create
 * visual hierarchy and organize information into digestible chunks.
 *
 * This file exports multiple sub-components:
 * - Card: The main container
 * - CardHeader: Top section (usually contains title)
 * - CardTitle: The heading
 * - CardDescription: Subtitle/supporting text
 * - CardContent: Main content area
 * - CardFooter: Bottom section (usually contains actions)
 *
 * This is the "Compound Component" pattern - related components
 * that are designed to work together.
 */

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Card - The main container component
 *
 * HTMLDivElement & HTMLAttributes:
 * - This means the Card accepts all props that a normal <div> would accept
 * - TypeScript will give you autocomplete for things like onClick, style, etc.
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      /*
       * Card base styles explained:
       * - rounded-xl: Extra-large border radius for modern look
       * - border: Thin border using theme color
       * - bg-card: Background color from our theme variables
       * - text-card-foreground: Text color for content inside
       * - shadow: Subtle shadow for depth/elevation
       */
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

/**
 * CardHeader - Container for title and description
 *
 * Provides consistent spacing at the top of the card
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      /*
       * flex flex-col: Stack children vertically
       * space-y-1.5: Add small gap between title and description
       * p-6: Padding on all sides
       */
      "flex flex-col space-y-1.5 p-6",
      className
    )}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

/**
 * CardTitle - The main heading of the card
 *
 * Uses semantic HTML - renders as an h3 by default
 * This is important for accessibility (screen readers use headings for navigation)
 */
const CardTitle = React.forwardRef<
  HTMLHeadingElement,  // Note: This is a heading element, not a div
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      /*
       * font-semibold: Bold but not too heavy
       * leading-none: Line height of 1 (tight)
       * tracking-tight: Slightly tighter letter spacing
       */
      "font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

/**
 * CardDescription - Supporting text below the title
 *
 * Rendered as a paragraph (<p>) for semantic correctness
 * Uses muted color to create visual hierarchy
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      /*
       * text-sm: Smaller text size
       * text-muted-foreground: Dimmed color from theme
       */
      "text-sm text-muted-foreground",
      className
    )}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

/**
 * CardContent - Main content area of the card
 *
 * Has padding on sides and bottom, but not top
 * (the header already has bottom padding)
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      /*
       * p-6: Padding all around
       * pt-0: But remove top padding to avoid double spacing with header
       */
      "p-6 pt-0",
      className
    )}
    {...props}
  />
));
CardContent.displayName = "CardContent";

/**
 * CardFooter - Bottom section, typically for action buttons
 *
 * Uses flexbox for easy button alignment
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      /*
       * flex: Enable flexbox
       * items-center: Vertically center children
       * p-6 pt-0: Padding without top (same pattern as CardContent)
       */
      "flex items-center p-6 pt-0",
      className
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

/*
 * Export all sub-components
 * Usage example:
 *
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card description here</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     Main content goes here
 *   </CardContent>
 *   <CardFooter>
 *     <Button>Action</Button>
 *   </CardFooter>
 * </Card>
 */
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
