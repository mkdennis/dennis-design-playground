/**
 * ============================================
 * COMPONENT VIEWER - Center Panel
 * ============================================
 *
 * This is where the selected component is rendered and previewed.
 * It's the main stage of the playground where users see their component
 * with current prop values applied.
 *
 * Features:
 * - Renders the component with current props
 * - Centered display with visual canvas/stage effect
 * - Empty state when no component is selected
 * - Live updates when props change
 *
 * Key concept: React's reactivity
 * When props change, React automatically re-renders this component.
 * The component.render(currentProps) call uses the new props,
 * and the preview updates instantly.
 */

"use client";

import { ComponentDefinition } from "@/registry/types";
import { cn } from "@/lib/utils";
import { VariantGallery } from "./VariantGallery";

/**
 * ComponentViewerProps - Props interface
 *
 * @param component - The selected component definition (or null)
 * @param currentProps - The current values of all configurable props
 * @param selectedVariantId - The currently selected variant ID
 * @param onSelectVariant - Callback when a variant is selected
 */
interface ComponentViewerProps {
  component: ComponentDefinition | null;
  currentProps: Record<string, unknown>;
  selectedVariantId?: string;
  onSelectVariant?: (variantId: string) => void;
}

/**
 * ComponentViewer Component
 *
 * This component handles two states:
 * 1. No component selected: Shows an empty state prompt
 * 2. Component selected: Renders the component in a preview area
 *
 * Now includes variant gallery support for switching between different designs
 */
export function ComponentViewer({
  component,
  currentProps,
  selectedVariantId,
  onSelectVariant,
}: ComponentViewerProps) {
  // Get the selected variant or use the default render function
  const selectedVariant = component?.variants?.find(
    (v) => v.id === selectedVariantId
  );

  // Use variant render if available, otherwise use component render
  const renderFunction = selectedVariant?.render || component?.render;
  return (
    /*
     * Main container:
     * - h-full: Full height of parent
     * - flex flex-col: Stack children vertically
     * - bg-background: Uses theme background
     */
    <div className="h-full flex flex-col bg-background">
      {/*
       * Header with component name
       * border-b: Bottom border for separation
       */}
      <div className="px-4 py-3 border-b flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-sm">
            {component ? component.name : "Preview"}
          </h2>
          {component && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {component.category}
            </p>
          )}
        </div>
      </div>

      {/*
       * Preview area
       * flex-1: Takes remaining vertical space
       * This is where the magic happens!
       */}
      <div className="flex-1 flex items-center justify-center p-8">
        {/*
         * Conditional rendering based on whether a component is selected
         *
         * Pattern: condition ? <TruthyJSX /> : <FalsyJSX />
         *
         * If component exists, render the preview area
         * If not, show the empty state
         */}
        {component ? (
          /*
           * Preview container - the "canvas" for the component
           *
           * This creates a subtle visual boundary to frame the component:
           * - relative: Positioning context for potential overlays
           * - flex items-center justify-center: Center the component
           * - min-h-[200px]: Minimum height so small components don't look cramped
           * - w-full: Full width
           * - rounded-lg: Rounded corners
           * - border border-dashed: Dashed border for visual indication
           * - bg-muted/30: Very subtle background
           *
           * The dotted background pattern helps distinguish
           * the preview area from the component itself
           */
          <div
            className={cn(
              "relative flex items-center justify-center",
              "min-h-[200px] w-full max-w-2xl",
              "rounded-lg border border-dashed border-border",
              "bg-muted/30"
            )}
            /*
             * CSS background pattern: Dots
             * This creates a subtle dot grid pattern like design tools
             * backgroundImage: radial-gradient creates the dots
             * backgroundSize: controls the spacing
             */
            style={{
              backgroundImage: `radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)`,
              backgroundSize: "16px 16px",
            }}
          >
            {/*
             * Inner container for the actual component
             * p-8: Padding around the component
             *
             * component.render(currentProps) calls the render function
             * from the ComponentDefinition and passes the current props
             *
             * This is where the component preview is actually rendered!
             */}
            <div className="p-8">
              {renderFunction && renderFunction(currentProps)}
            </div>
          </div>
        ) : (
          /*
           * Empty state - shown when no component is selected
           *
           * Good UX practice: Never show a blank screen.
           * Guide users on what to do next.
           */
          <div className="text-center">
            <div
              className={cn(
                "mx-auto w-16 h-16 rounded-full",
                "bg-muted flex items-center justify-center mb-4"
              )}
            >
              {/*
               * SVG icon for the empty state
               * This is a simple "component/box" icon
               */}
              <svg
                className="w-8 h-8 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-1">
              No component selected
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Select a component from the sidebar to preview and customize it.
            </p>
          </div>
        )}
      </div>

      {/*
       * Variant Gallery - shown below the preview when variants are available
       */}
      {component && component.variants && component.variants.length > 0 && (
        <VariantGallery
          variants={component.variants}
          selectedVariantId={selectedVariantId || component.variants[0].id}
          onSelectVariant={onSelectVariant || (() => {})}
          currentProps={currentProps}
        />
      )}
    </div>
  );
}
