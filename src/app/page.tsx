/**
 * ============================================
 * HOME PAGE - Main Playground Interface
 * ============================================
 *
 * This is the main page of the Design Playground app.
 * It orchestrates the three-panel layout and manages the
 * application state.
 *
 * Architecture:
 * - This page is the "smart" component that holds state
 * - The child components (panels) are "presentational" - they
 *   receive data via props and communicate changes via callbacks
 *
 * This pattern is called "lifting state up" - the shared state
 * lives in the nearest common ancestor of the components that need it.
 *
 * State managed here:
 * 1. selectedComponentId - which component is currently selected
 * 2. currentProps - the current values of all component props
 * 3. sidebarOpen/settingsOpen - mobile panel visibility
 */

"use client";  // This page needs to be a Client Component for useState

import { useState, useEffect, useCallback } from "react";
import { Menu, Settings, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { getComponentById, componentRegistry } from "@/registry";
import { ComponentList, ComponentViewer, SettingsPanel } from "@/components/playground";
import { Button } from "@/components/ui/button";

/**
 * Home Page Component
 *
 * This is the default export, which Next.js uses as the page component.
 * The file location (app/page.tsx) makes this the home page (/).
 */
export default function Home() {
  /*
   * =========================================
   * STATE DECLARATIONS
   * =========================================
   *
   * useState is React's way of adding state to function components.
   * Each call returns [currentValue, setterFunction].
   *
   * When you call the setter, React re-renders the component
   * with the new value.
   */

  /**
   * Selected component ID
   * - null when no component is selected
   * - string ID when a component is selected
   */
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);

  /**
   * Current prop values for the selected component
   * This object holds all the configurable prop values
   *
   * Record<string, unknown> means: an object with string keys and any values
   */
  const [currentProps, setCurrentProps] = useState<Record<string, unknown>>({});

  /**
   * Selected variant ID for components that support variants
   * Defaults to the first variant when a component is selected
   */
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);

  /**
   * Mobile responsive state
   * - sidebarOpen: Controls left sidebar visibility on mobile
   * - settingsOpen: Controls right settings panel visibility on mobile
   *
   * On desktop, these panels are always visible (controlled by CSS)
   */
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  /*
   * =========================================
   * DERIVED STATE
   * =========================================
   *
   * Derived state is computed from other state.
   * It doesn't need useState because it's calculated fresh on each render.
   */

  /**
   * Get the full component definition for the selected ID
   * Returns undefined if no component is selected or ID is invalid
   */
  const selectedComponent = selectedComponentId
    ? getComponentById(selectedComponentId)
    : null;

  /*
   * =========================================
   * CALLBACKS
   * =========================================
   *
   * useCallback memoizes functions so they don't get recreated on every render.
   * This is important for:
   * 1. Performance (prevents unnecessary re-renders of child components)
   * 2. useEffect dependencies (stable function references)
   *
   * The dependency array [] means the function never changes.
   */

  /**
   * Handle component selection
   *
   * When a user clicks on a component in the list:
   * 1. Update the selected component ID
   * 2. Initialize the props with default values from the definition
   * 3. Set the default variant (first variant if available)
   * 4. Close mobile panels (better UX on small screens)
   */
  const handleSelectComponent = useCallback((id: string) => {
    setSelectedComponentId(id);

    /*
     * Find the component definition to get default prop values
     */
    const component = getComponentById(id);
    if (component) {
      /*
       * Build initial props object from the component's prop definitions
       *
       * Object.entries converts { state: {...}, size: {...} }
       * to [["state", {...}], ["size", {...}]]
       *
       * reduce() builds a new object by iterating through the entries
       * acc is the "accumulator" - the object we're building
       */
      const initialProps = Object.entries(component.props).reduce(
        (acc, [propName, propDef]) => {
          acc[propName] = propDef.defaultValue;
          return acc;
        },
        {} as Record<string, unknown>
      );
      setCurrentProps(initialProps);

      /*
       * Set default variant to the first one if variants exist
       */
      if (component.variants && component.variants.length > 0) {
        setSelectedVariantId(component.variants[0].id);
      } else {
        setSelectedVariantId(null);
      }
    }

    /*
     * Close mobile panels after selection
     * On mobile, users select a component then see the preview
     */
    setSidebarOpen(false);
  }, []);

  /**
   * Handle prop changes from the settings panel
   *
   * Simply updates the currentProps state.
   * React's reactivity ensures the preview updates automatically.
   */
  const handlePropsChange = useCallback((newProps: Record<string, unknown>) => {
    setCurrentProps(newProps);
  }, []);

  /**
   * Handle variant selection from the gallery
   *
   * Updates the selected variant ID, which changes the preview
   */
  const handleSelectVariant = useCallback((variantId: string) => {
    setSelectedVariantId(variantId);
  }, []);

  /*
   * =========================================
   * EFFECTS
   * =========================================
   *
   * useEffect runs side effects after render.
   * Side effects are things that happen "outside" React:
   * - API calls, timers, DOM manipulation, subscriptions
   *
   * The dependency array controls when the effect runs:
   * - []: Only on mount (once)
   * - [dep]: When dep changes
   * - No array: Every render (rarely wanted)
   */

  /**
   * Auto-select first component on mount
   *
   * This provides a better initial experience by showing
   * a component preview immediately instead of an empty state.
   */
  useEffect(() => {
    if (componentRegistry.length > 0 && !selectedComponentId) {
      handleSelectComponent(componentRegistry[0].id);
    }
  }, [selectedComponentId, handleSelectComponent]);

  /*
   * =========================================
   * RENDER
   * =========================================
   *
   * The return statement contains the JSX that describes
   * what the UI should look like.
   */

  return (
    /*
     * Main container
     * - h-screen: Full viewport height
     * - flex flex-col: Stack children vertically
     * - overflow-hidden: Prevent body scrolling (panels scroll individually)
     */
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      {/*
       * ========== MOBILE HEADER ==========
       * Only visible on small screens (hidden on lg: and up)
       * Contains the app title and toggle buttons for panels
       */}
      <header className="lg:hidden flex items-center justify-between px-4 py-3 border-b">
        {/*
         * Sidebar toggle button
         * Opens the component list on mobile
         */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open component list"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <h1 className="font-semibold">Design Playground</h1>

        {/*
         * Settings toggle button
         * Opens the settings panel on mobile
         */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSettingsOpen(true)}
          aria-label="Open settings"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </header>

      {/*
       * ========== MAIN CONTENT AREA ==========
       * Three-panel layout using CSS Grid on desktop
       * On mobile, panels are overlays controlled by state
       */}
      <div className="flex-1 flex overflow-hidden">
        {/*
         * ========== LEFT SIDEBAR ==========
         * Component list panel
         *
         * Responsive behavior:
         * - Mobile: Overlay that slides in when sidebarOpen is true
         * - Desktop (lg:): Always visible as part of the grid
         *
         * The cn() function merges conditional classes cleanly
         */}
        <aside
          className={cn(
            /*
             * Base styles (mobile-first approach):
             * - fixed inset-y-0 left-0: Fixed position, full height, left edge
             * - z-40: Above other content
             * - w-64: Fixed width
             * - bg-card border-r: Visual styling
             * - transform transition-transform: For slide animation
             */
            "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r",
            "transform transition-transform duration-200 ease-in-out",
            /*
             * Conditional transform:
             * - When closed: -translate-x-full (moved off-screen left)
             * - When open: translate-x-0 (visible)
             */
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
            /*
             * Desktop overrides (lg: breakpoint):
             * - static: Normal document flow (not fixed)
             * - translate-x-0: Always visible
             * - w-56: Slightly narrower
             */
            "lg:static lg:translate-x-0 lg:w-56"
          )}
        >
          {/*
           * Mobile close button (inside the sidebar)
           * Only visible when sidebar is open on mobile
           */}
          <div className="lg:hidden absolute top-2 right-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <ComponentList
            selectedId={selectedComponentId}
            onSelect={handleSelectComponent}
          />
        </aside>

        {/*
         * ========== MOBILE OVERLAY BACKDROP ==========
         * Semi-transparent background when sidebar is open
         * Clicking it closes the sidebar (common UX pattern)
         */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 z-30 bg-background/80 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/*
         * ========== CENTER PANEL ==========
         * The main component preview area
         * Takes up remaining space (flex-1)
         */}
        <main className="flex-1 overflow-hidden">
          <ComponentViewer
            component={selectedComponent ?? null}
            currentProps={currentProps}
            selectedVariantId={selectedVariantId ?? undefined}
            onSelectVariant={handleSelectVariant}
          />
        </main>

        {/*
         * ========== RIGHT SIDEBAR ==========
         * Settings panel with props editor
         * Same responsive pattern as left sidebar
         */}
        <aside
          className={cn(
            "fixed inset-y-0 right-0 z-40 w-80 bg-card border-l",
            "transform transition-transform duration-200 ease-in-out",
            settingsOpen ? "translate-x-0" : "translate-x-full",
            "lg:static lg:translate-x-0 lg:w-72"
          )}
        >
          {/* Mobile close button */}
          <div className="lg:hidden absolute top-2 left-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSettingsOpen(false)}
              aria-label="Close settings"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <SettingsPanel
            component={selectedComponent ?? null}
            currentProps={currentProps}
            onPropsChange={handlePropsChange}
            selectedVariantId={selectedVariantId ?? undefined}
          />
        </aside>

        {/* Settings panel backdrop (mobile) */}
        {settingsOpen && (
          <div
            className="lg:hidden fixed inset-0 z-30 bg-background/80 backdrop-blur-sm"
            onClick={() => setSettingsOpen(false)}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}
