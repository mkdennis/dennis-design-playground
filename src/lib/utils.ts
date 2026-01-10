/**
 * ============================================
 * UTILS.TS - Utility functions for the app
 * ============================================
 *
 * This file contains helper functions that are used throughout the app.
 * The most important one is `cn` which helps merge CSS class names.
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn - Class Name utility function
 *
 * This is one of the most commonly used utilities in React + Tailwind projects.
 * It combines two libraries:
 *
 * 1. clsx: Conditionally joins class names together
 *    Example: clsx("btn", isActive && "btn-active", { "btn-disabled": disabled })
 *
 * 2. twMerge: Intelligently merges Tailwind classes, handling conflicts
 *    Example: twMerge("px-4 px-6") => "px-6" (removes the duplicate/conflicting px-4)
 *
 * Why use this?
 * - Allows conditional class application: cn("base", condition && "conditional")
 * - Prevents class conflicts: cn("p-4", "p-6") correctly returns "p-6"
 * - Cleaner code when combining multiple class sources
 *
 * @param inputs - Any number of class values (strings, objects, arrays, etc.)
 * @returns A merged, de-duplicated class name string
 *
 * @example
 * // Basic usage
 * cn("text-red-500", "bg-blue-500") // => "text-red-500 bg-blue-500"
 *
 * @example
 * // Conditional classes
 * cn("btn", isActive && "btn-active") // => "btn btn-active" or just "btn"
 *
 * @example
 * // Object syntax for conditionals
 * cn("btn", { "btn-active": isActive, "btn-disabled": isDisabled })
 *
 * @example
 * // Merging conflicting Tailwind classes (twMerge handles this!)
 * cn("px-2 py-1", "px-4") // => "py-1 px-4" (px-4 wins over px-2)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
