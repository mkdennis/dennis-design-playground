/**
 * ============================================
 * SETTINGS PANEL - Right Sidebar
 * ============================================
 *
 * This panel allows users to:
 * 1. See component information (description)
 * 2. Modify component props with various controls
 * 3. View and copy the generated code
 *
 * Key concepts:
 * - Dynamic form generation based on prop definitions
 * - Controlled inputs (value + onChange pattern)
 * - Code generation and clipboard API
 * - Tabs for organizing different views
 *
 * This is the most complex component in the playground because
 * it needs to dynamically render different input types based
 * on the prop definitions.
 */

"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { ComponentDefinition, PropDefinition } from "@/registry/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectOption } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * SettingsPanelProps - Props interface
 *
 * @param component - The selected component (or null)
 * @param currentProps - Current values of all props
 * @param onPropsChange - Callback when a prop value changes
 */
interface SettingsPanelProps {
  component: ComponentDefinition | null;
  currentProps: Record<string, unknown>;
  onPropsChange: (props: Record<string, unknown>) => void;
}

/**
 * SettingsPanel Component
 */
export function SettingsPanel({
  component,
  currentProps,
  onPropsChange,
}: SettingsPanelProps) {
  /*
   * Local state for the "copied" feedback
   * useState returns [currentValue, setterFunction]
   *
   * When user clicks copy:
   * 1. Set copied to true
   * 2. After 2 seconds, set it back to false
   *
   * This creates the brief "Copied!" feedback
   */
  const [copied, setCopied] = useState(false);

  /**
   * Handle prop value change
   *
   * This function creates a new props object with the updated value
   * and passes it to the parent via onPropsChange.
   *
   * @param propName - The name of the prop being changed
   * @param value - The new value for the prop
   *
   * The spread operator (...) copies all existing props,
   * then the [propName]: value overwrites just that one prop
   */
  const handlePropChange = (propName: string, value: unknown) => {
    onPropsChange({
      ...currentProps,
      [propName]: value,
    });
  };

  /**
   * Copy code to clipboard
   *
   * Uses the modern Clipboard API (navigator.clipboard)
   * Falls back gracefully if not available
   */
  const handleCopyCode = async () => {
    if (!component) return;

    /*
     * Generate the code string using the component's code function
     */
    const code = component.code(currentProps);

    try {
      /*
       * navigator.clipboard.writeText() is async
       * It returns a Promise that resolves when copying succeeds
       */
      await navigator.clipboard.writeText(code);
      setCopied(true);

      /*
       * Reset the copied state after 2 seconds
       * setTimeout schedules a function to run later
       */
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      /*
       * Clipboard API might fail due to permissions
       * In a real app, you'd want better error handling
       */
      console.error("Failed to copy code:", err);
    }
  };

  /**
   * Render a single prop control
   *
   * This function takes a prop definition and returns the
   * appropriate input component based on the prop type.
   *
   * This is a common pattern called "dynamic rendering" -
   * the UI changes based on data structure.
   */
  const renderPropControl = (propName: string, propDef: PropDefinition) => {
    /*
     * Get current value, falling back to default if not set
     * The ?? operator returns the right side if left is null/undefined
     */
    const value = currentProps[propName] ?? propDef.defaultValue;

    /*
     * Switch statement: Different code paths based on prop type
     * Each case returns a different input component
     */
    switch (propDef.type) {
      case "boolean":
        /*
         * Boolean props render as a Switch (toggle)
         */
        return (
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor={propName}>{propDef.label}</Label>
              {propDef.description && (
                <p className="text-xs text-muted-foreground">
                  {propDef.description}
                </p>
              )}
            </div>
            <Switch
              id={propName}
              checked={value as boolean}
              onCheckedChange={(checked) => handlePropChange(propName, checked)}
            />
          </div>
        );

      case "string":
        /*
         * String props render as a text Input
         */
        return (
          <div className="space-y-2">
            <Label htmlFor={propName}>{propDef.label}</Label>
            {propDef.description && (
              <p className="text-xs text-muted-foreground">
                {propDef.description}
              </p>
            )}
            <Input
              id={propName}
              value={value as string}
              onChange={(e) => handlePropChange(propName, e.target.value)}
            />
          </div>
        );

      case "select":
        /*
         * Select props render as a dropdown
         * Options come from propDef.options
         */
        return (
          <div className="space-y-2">
            <Label htmlFor={propName}>{propDef.label}</Label>
            {propDef.description && (
              <p className="text-xs text-muted-foreground">
                {propDef.description}
              </p>
            )}
            <Select
              id={propName}
              value={value as string}
              onChange={(e) => handlePropChange(propName, e.target.value)}
            >
              {/*
               * Map over options to create <option> elements
               */}
              {propDef.options?.map((option) => (
                <SelectOption key={option.value} value={option.value}>
                  {option.label}
                </SelectOption>
              ))}
            </Select>
          </div>
        );

      case "number":
        /*
         * Number props render as a Slider with numeric display
         */
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor={propName}>{propDef.label}</Label>
              {/*
               * Show the current numeric value
               */}
              <span className="text-sm text-muted-foreground">
                {value as number}
              </span>
            </div>
            {propDef.description && (
              <p className="text-xs text-muted-foreground">
                {propDef.description}
              </p>
            )}
            <Slider
              id={propName}
              value={value as number}
              onValueChange={(val) => handlePropChange(propName, val)}
              min={propDef.min ?? 0}
              max={propDef.max ?? 100}
              step={propDef.step ?? 1}
            />
          </div>
        );

      default:
        /*
         * Fallback for unknown prop types
         * This shouldn't happen if types are correct
         */
        return (
          <div className="text-sm text-muted-foreground">
            Unsupported prop type: {propDef.type}
          </div>
        );
    }
  };

  /*
   * Empty state when no component is selected
   */
  if (!component) {
    return (
      <div className="h-full flex flex-col">
        <div className="px-4 py-3 border-b">
          <h2 className="font-semibold text-sm">Settings</h2>
        </div>
        <div className="flex-1 flex items-center justify-center p-4">
          <p className="text-sm text-muted-foreground text-center">
            Select a component to see its settings
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/*
       * Header with component info
       */}
      <div className="px-4 py-3 border-b">
        <h2 className="font-semibold text-sm">{component.name}</h2>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
          {component.description}
        </p>
      </div>

      {/*
       * Tabs for switching between Props and Code views
       *
       * defaultValue sets the initially selected tab
       * className="flex-1 flex flex-col" makes tabs fill available space
       */}
      <Tabs defaultValue="props" className="flex-1 flex flex-col">
        <div className="px-4 pt-2">
          <TabsList className="w-full">
            <TabsTrigger value="props" className="flex-1">
              Props
            </TabsTrigger>
            <TabsTrigger value="code" className="flex-1">
              Code
            </TabsTrigger>
          </TabsList>
        </div>

        {/*
         * Props Tab Content
         */}
        <TabsContent value="props" className="flex-1 mt-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-6">
              {/*
               * Object.entries() converts an object to [key, value] pairs
               * This allows us to iterate over the props object
               *
               * Example: { variant: {...}, size: {...} }
               * Becomes: [["variant", {...}], ["size", {...}]]
               */}
              {Object.entries(component.props).map(([propName, propDef]) => (
                <div key={propName}>
                  {renderPropControl(propName, propDef)}
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        {/*
         * Code Tab Content
         */}
        <TabsContent value="code" className="flex-1 mt-0 flex flex-col">
          <div className="flex-1 flex flex-col p-4">
            {/*
             * Code preview area
             * Uses a <pre> tag for preformatted text
             * font-mono gives us monospace font for code
             */}
            <div className="flex-1 relative">
              <pre
                className={cn(
                  "h-full p-4 rounded-lg overflow-auto",
                  "bg-muted/50 border",
                  "text-sm font-mono",
                  "whitespace-pre-wrap break-words"
                )}
              >
                <code>{component.code(currentProps)}</code>
              </pre>
            </div>

            <Separator className="my-4" />

            {/*
             * Copy button with feedback
             *
             * The button shows different content based on 'copied' state:
             * - Default: "Copy Code" with copy icon
             * - After copying: "Copied!" with check icon
             */}
            <Button
              variant="outline"
              className="w-full"
              onClick={handleCopyCode}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Code
                </>
              )}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
