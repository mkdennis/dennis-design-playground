/**
 * ============================================
 * TABS COMPONENT
 * ============================================
 *
 * A tabbed interface for switching between different views.
 *
 * Tabs are perfect when you have:
 * - Multiple views/sections of related content
 * - Limited space that needs to show one thing at a time
 * - Content that doesn't need to be compared side-by-side
 *
 * This uses a compound component pattern:
 * - Tabs: The container that manages state
 * - TabsList: The row of tab buttons
 * - TabsTrigger: Individual tab button
 * - TabsContent: The content panel for each tab
 */

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * TabsContext - Shares state between all tab components
 *
 * Context is React's way of passing data through the component tree
 * without having to pass props manually at every level.
 */
interface TabsContextValue {
  value: string;            // Currently selected tab
  onValueChange: (value: string) => void;  // Function to change tab
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined);

/**
 * useTabs - Hook to access tabs context
 *
 * Custom hooks that start with "use" are a React convention.
 * This hook ensures the tabs context is available.
 */
function useTabs() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs provider");
  }
  return context;
}

/**
 * TabsProps - Props for the main Tabs container
 */
interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;   // Initial tab (uncontrolled)
  value?: string;          // Controlled value
  onValueChange?: (value: string) => void;  // Controlled change handler
}

/**
 * Tabs - Main container component
 *
 * Can be used in two ways:
 * 1. Uncontrolled: Just pass defaultValue, component manages state
 * 2. Controlled: Pass value and onValueChange, you manage state
 */
const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, defaultValue = "", value, onValueChange, children, ...props }, ref) => {
    /*
     * Internal state for uncontrolled usage
     * If value prop is provided, this state is ignored
     */
    const [internalValue, setInternalValue] = React.useState(defaultValue);

    /*
     * Determine which value to use:
     * - If value prop exists, use it (controlled mode)
     * - Otherwise, use internal state (uncontrolled mode)
     */
    const currentValue = value !== undefined ? value : internalValue;

    /*
     * Handle tab change:
     * - Call external handler if provided
     * - Update internal state if in uncontrolled mode
     */
    const handleValueChange = React.useCallback((newValue: string) => {
      onValueChange?.(newValue);
      if (value === undefined) {
        setInternalValue(newValue);
      }
    }, [onValueChange, value]);

    return (
      /*
       * TabsContext.Provider makes the context available to all children
       * Any child component can call useTabs() to access value and onValueChange
       */
      <TabsContext.Provider value={{ value: currentValue, onValueChange: handleValueChange }}>
        <div ref={ref} className={cn("", className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);
Tabs.displayName = "Tabs";

/**
 * TabsList - Container for the tab buttons
 *
 * Provides a styled container with proper spacing and background
 */
const TabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      /*
       * ARIA role="tablist" tells screen readers this is a set of tabs
       */
      role="tablist"
      className={cn(
        /*
         * TabsList styles:
         * - inline-flex: Only as wide as content
         * - h-9: Fixed height
         * - items-center justify-center: Center the buttons
         * - rounded-lg: Rounded container
         * - bg-muted: Muted background color
         * - p-1: Small padding around buttons
         * - text-muted-foreground: Default text color
         */
        "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
        className
      )}
      {...props}
    />
  )
);
TabsList.displayName = "TabsList";

/**
 * TabsTrigger - Individual tab button
 */
interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;  // The value this tab represents
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, ...props }, ref) => {
    /*
     * Get current tab state from context
     */
    const { value: currentValue, onValueChange } = useTabs();
    const isSelected = currentValue === value;

    return (
      <button
        ref={ref}
        type="button"
        /*
         * ARIA attributes for accessibility:
         * - role="tab": This is a tab button
         * - aria-selected: Whether this tab is active
         */
        role="tab"
        aria-selected={isSelected}
        onClick={() => onValueChange(value)}
        className={cn(
          /*
           * TabsTrigger styles:
           *
           * Base:
           * - inline-flex items-center justify-center: Layout
           * - whitespace-nowrap: No text wrapping
           * - rounded-md: Rounded corners
           * - px-3 py-1: Padding
           * - text-sm font-medium: Typography
           *
           * States:
           * - ring-offset-background: Offset for focus ring
           * - transition-all: Smooth transitions
           * - focus-visible: Focus ring styles
           * - disabled: Disabled state
           *
           * Selected state (data-[state=active]):
           * - bg-background: White/light background
           * - text-foreground: Full contrast text
           * - shadow: Subtle shadow
           */
          "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          isSelected
            ? "bg-background text-foreground shadow"
            : "hover:bg-background/50 hover:text-foreground",
          className
        )}
        data-state={isSelected ? "active" : "inactive"}
        {...props}
      />
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

/**
 * TabsContent - Content panel for each tab
 */
interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;  // Which tab this content belongs to
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, ...props }, ref) => {
    const { value: currentValue } = useTabs();
    const isSelected = currentValue === value;

    /*
     * Only render content for the selected tab
     * This improves performance by not rendering hidden content
     */
    if (!isSelected) return null;

    return (
      <div
        ref={ref}
        /*
         * ARIA attributes:
         * - role="tabpanel": This is the content for a tab
         * - tabIndex=0: Make focusable for keyboard navigation
         */
        role="tabpanel"
        tabIndex={0}
        className={cn(
          /*
           * TabsContent styles:
           * - mt-2: Margin top for spacing from tabs
           * - ring-offset-background: Focus ring offset
           * - focus-visible: Focus styles for accessibility
           */
          "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        )}
        data-state={isSelected ? "active" : "inactive"}
        {...props}
      />
    );
  }
);
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
