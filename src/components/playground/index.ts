/**
 * ============================================
 * PLAYGROUND COMPONENTS - Barrel Export
 * ============================================
 *
 * This is a "barrel file" - it re-exports components from
 * multiple files through a single entry point.
 *
 * Benefits:
 * - Cleaner imports: import { ComponentList, ComponentViewer } from "@/components/playground"
 * - Instead of: import { ComponentList } from "@/components/playground/ComponentList"
 * - Easier to refactor internal file structure
 * - Single place to manage public exports
 *
 * Common pattern in React projects for organizing component exports.
 */

export { ComponentList } from "./ComponentList";
export { ComponentViewer } from "./ComponentViewer";
export { SettingsPanel } from "./SettingsPanel";
