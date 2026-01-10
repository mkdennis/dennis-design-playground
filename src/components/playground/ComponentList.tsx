/**
 * ============================================
 * COMPONENT LIST - Left Sidebar
 * ============================================
 *
 * This component displays the list of available components
 * organized by category. Users click on a component to select it.
 *
 * Key features:
 * - Grouped by category (Inputs, Layout, Display, etc.)
 * - Visual feedback for selected component
 * - Responsive design (collapses on mobile)
 *
 * Props pattern:
 * This component receives data and callbacks from its parent.
 * It doesn't manage its own state for selection - the parent does.
 * This is called "lifting state up" and makes the component reusable.
 */

"use client"; // This marks the component as a Client Component (needed for interactivity)

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  componentRegistry,
  getCategories,
  getComponentsByCategory,
} from "@/registry";

/**
 * ComponentListProps - Props interface
 *
 * @param selectedId - The ID of the currently selected component
 * @param onSelect - Callback when a component is clicked
 */
interface ComponentListProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

/**
 * ComponentList Component
 *
 * Note: This is NOT using forwardRef because it doesn't need
 * to expose a DOM ref to its parent.
 */
export function ComponentList({ selectedId, onSelect }: ComponentListProps) {
  /*
   * Get all unique categories from the registry
   * This automatically updates when you add new components
   */
  const categories = getCategories();

  return (
    <div className="flex h-full flex-col">
      {/*
       * Header section
       * px-4 py-3: Padding
       * border-b: Bottom border for visual separation
       */}
      <div className="px-4 py-3 border-b">
        <h2 className="font-semibold text-sm">Components</h2>
        <p className="text-xs text-muted-foreground mt-1">
          {componentRegistry.length} components
        </p>
      </div>

      {/*
       * ScrollArea contains the scrollable list
       * flex-1 makes it take remaining height
       */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {/*
           * Map over categories to create grouped sections
           *
           * map() is a core React pattern:
           * - Takes an array and transforms each item
           * - Returns a new array of elements to render
           *
           * The key prop is REQUIRED when mapping - React uses it
           * to efficiently update the DOM when items change
           */}
          {categories.map((category, index) => (
            <div key={category}>
              {/*
               * Category header
               * text-xs: Extra small text
               * text-muted-foreground: Dimmed color
               * uppercase tracking-wider: All caps with letter spacing
               */}
              <div className="px-2 py-2">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {category}
                </h3>
              </div>

              {/*
               * List of components in this category
               * space-y-1: Small gap between items
               */}
              <div className="space-y-1">
                {getComponentsByCategory(category).map((component) => (
                  <button
                    key={component.id}
                    /*
                     * onClick calls the parent's onSelect with this component's ID
                     * This "bubbles up" the selection to the parent component
                     */
                    onClick={() => onSelect(component.id)}
                    className={cn(
                      /*
                       * Base button styles:
                       * - w-full: Full width
                       * - text-left: Left-align text
                       * - px-2 py-1.5: Padding
                       * - rounded-md: Rounded corners
                       * - text-sm: Small text
                       * - transition-colors: Smooth color changes
                       * - hover:bg-accent: Highlight on hover
                       */
                      "w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      /*
                       * Conditional selected state:
                       * If this component is selected, apply active styles
                       * Otherwise, apply muted text color
                       *
                       * selectedId === component.id evaluates to true/false
                       * The ternary (?:) chooses between the two class strings
                       */
                      selectedId === component.id
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-muted-foreground"
                    )}
                  >
                    {component.name}
                  </button>
                ))}
              </div>

              {/*
               * Add separator between categories, but not after the last one
               * index < categories.length - 1 checks if this isn't the last category
               */}
              {index < categories.length - 1 && (
                <Separator className="my-2" />
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
