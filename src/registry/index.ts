/**
 * ============================================
 * COMPONENT REGISTRY - Main Export
 * ============================================
 *
 * This file is the central export point for all component definitions.
 *
 * Why have a registry?
 * 1. Single source of truth for all components
 * 2. Easy to add new components (just import and add to array)
 * 3. Enables dynamic rendering and configuration
 * 4. Makes it easy to filter, search, and group components
 *
 * How to add a new component:
 * 1. Create a new file in /registry/components/
 * 2. Define the ComponentDefinition (see existing examples)
 * 3. Import it here
 * 4. Add it to the componentRegistry array
 *
 * That's it! The new component will automatically appear in the UI.
 */

import { ComponentRegistry } from "./types";

/*
 * Import all component definitions
 * Each file exports a single ComponentDefinition object
 */
import { buttonComponent } from "./components/button-component";
import { cardComponent } from "./components/card-component";
import { badgeComponent } from "./components/badge-component";
import { inputComponent } from "./components/input-component";
import { alertComponent } from "./components/alert-component";

/**
 * componentRegistry - The complete list of all components
 *
 * This array holds all the component definitions.
 * Order matters! Components appear in this order in the sidebar.
 *
 * To add a new component, just add it to this array.
 */
export const componentRegistry: ComponentRegistry = [
  buttonComponent,
  cardComponent,
  badgeComponent,
  inputComponent,
  alertComponent,
];

/**
 * Helper functions for working with the registry
 *
 * These utility functions make it easier to work with
 * the component registry throughout the app.
 */

/**
 * Get a component by its ID
 *
 * @param id - The unique identifier of the component
 * @returns The ComponentDefinition or undefined if not found
 *
 * @example
 * const button = getComponentById("button");
 * if (button) {
 *   console.log(button.name); // "Button"
 * }
 */
export function getComponentById(id: string) {
  return componentRegistry.find((component) => component.id === id);
}

/**
 * Get all unique categories from the registry
 *
 * Used to build the sidebar navigation groups.
 *
 * @returns An array of unique category names
 *
 * @example
 * const categories = getCategories();
 * // ["Inputs", "Layout", "Display", "Feedback"]
 */
export function getCategories(): string[] {
  /*
   * Array.from(new Set(...)) is a common pattern to get unique values:
   * 1. map() extracts the category from each component
   * 2. new Set() removes duplicates (Sets only store unique values)
   * 3. Array.from() converts the Set back to an array
   */
  return Array.from(
    new Set(componentRegistry.map((component) => component.category))
  );
}

/**
 * Get components filtered by category
 *
 * @param category - The category name to filter by
 * @returns Array of ComponentDefinitions in that category
 *
 * @example
 * const inputComponents = getComponentsByCategory("Inputs");
 * // [buttonComponent, inputComponent]
 */
export function getComponentsByCategory(category: string) {
  return componentRegistry.filter(
    (component) => component.category === category
  );
}

/*
 * Re-export types for convenience
 * This allows other files to import types from the registry:
 * import { ComponentDefinition } from "@/registry";
 */
export * from "./types";
