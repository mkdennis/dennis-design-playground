# Design Playground

A personal component library playground built with Next.js, React, and TypeScript. This application provides an interactive interface for previewing, customizing, and exporting React components with live prop editing and code generation.

## Overview

The Design Playground is a three-panel interface that allows you to:
- **Browse** components organized by category in the left sidebar
- **Preview** components with live updates in the center panel
- **Customize** component props and view generated code in the right settings panel

The architecture is built around a **component registry system** that makes it easy to add new components without modifying the core playground UI.

## Architecture Overview

### High-Level Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    Component Registry                        │
│  (src/registry/components/*-component.tsx)                  │
│  - Defines component metadata                                │
│  - Specifies configurable props                              │
│  - Provides render and code generation functions            │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              Registry Index (src/registry/index.ts)         │
│  - Aggregates all component definitions                     │
│  - Provides lookup utilities                                │
│  - Exports registry array                                   │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              Main Page (src/app/page.tsx)                   │
│  - Manages application state                                 │
│  - Coordinates three-panel layout                           │
│  - Handles component selection and prop updates             │
└──────┬──────────────────┬──────────────────┬────────────────┘
       │                  │                  │
       ▼                  ▼                  ▼
┌─────────────┐  ┌──────────────┐  ┌──────────────┐
│ Component   │  │  Component   │  │   Settings   │
│    List     │  │    Viewer    │  │    Panel     │
│             │  │              │  │              │
│ - Displays  │  │ - Renders    │  │ - Prop       │
│   registry  │  │   component  │  │   controls   │
│ - Handles   │  │   preview    │  │ - Code       │
│   selection │  │ - Live       │  │   generation │
│             │  │   updates    │  │              │
└─────────────┘  └──────────────┘  └──────────────┘
```

## Core Concepts

### 1. Component Registry System

The registry system is the foundation of the playground. It separates **component definitions** (metadata) from **component implementations** (UI components).

#### Component Definition Structure

Each component in the registry follows the `ComponentDefinition` interface:

```typescript
interface ComponentDefinition {
  id: string;                    // Unique identifier
  name: string;                  // Display name
  description: string;           // Component description
  category: string;             // Grouping category
  props: Record<string, PropDefinition>;  // Configurable properties
  render: (props) => ReactNode;  // Rendering function
  code: (props) => string;       // Code generation function
}
```

#### Prop Definition Types

Props can be one of five types, each rendering a different control in the settings panel:

- **`boolean`** → Switch toggle
- **`string`** → Text input
- **`select`** → Dropdown select
- **`number`** → Slider with numeric display
- **`color`** → Color picker (future feature)

#### Example: Button Component Definition

```typescript
export const buttonComponent: ComponentDefinition = {
  id: "button",
  name: "Button",
  description: "A clickable button with multiple variants...",
  category: "Inputs",
  props: {
    children: {
      type: "string",
      label: "Button Text",
      defaultValue: "Click me",
    },
    variant: {
      type: "select",
      label: "Variant",
      defaultValue: "default",
      options: [
        { value: "default", label: "Default" },
        { value: "secondary", label: "Secondary" },
        // ...
      ],
    },
    // ... more props
  },
  render: (props) => <Button {...props} />,
  code: (props) => `<Button variant="${props.variant}">${props.children}</Button>`,
};
```

### 2. State Management Pattern

The application uses **"lifting state up"** - a React pattern where shared state lives in the nearest common ancestor.

#### State Flow

```
┌─────────────────────────────────────┐
│     Main Page (page.tsx)            │
│                                     │
│  State:                             │
│  - selectedComponentId               │
│  - currentProps                     │
│  - sidebarOpen / settingsOpen       │
└──────┬──────────┬──────────┬────────┘
       │          │          │
       │          │          │ Props
       │          │          │ Callbacks
       ▼          ▼          ▼
┌──────────┐ ┌──────────┐ ┌──────────┐
│Component │ │Component │ │Settings  │
│   List   │ │  Viewer  │ │  Panel   │
│          │ │          │ │          │
│ Receives │ │ Receives │ │ Receives │
│ selected │ │ component│ │ current  │
│    ID    │ │ + props  │ │  props   │
│          │ │          │ │          │
│ Calls    │ │          │ │ Calls    │
│ onSelect │ │          │ │onProps   │
│          │ │          │ │ Change   │
└──────────┘ └──────────┘ └──────────┘
```

#### Key State Variables

- **`selectedComponentId`**: Currently selected component (string | null)
- **`currentProps`**: Current values of all configurable props (Record<string, unknown>)
- **`sidebarOpen` / `settingsOpen`**: Mobile panel visibility (boolean)

### 3. Component Architecture

#### Three-Panel Layout

1. **Left Sidebar (ComponentList)**
   - Displays all components grouped by category
   - Handles component selection
   - Responsive: overlay on mobile, fixed on desktop

2. **Center Panel (ComponentViewer)**
   - Renders the selected component preview
   - Updates live when props change
   - Shows empty state when no component is selected

3. **Right Sidebar (SettingsPanel)**
   - Displays component information
   - Renders dynamic prop controls
   - Provides code preview and copy functionality
   - Responsive: overlay on mobile, fixed on desktop

#### Responsive Design

The layout adapts to screen size:
- **Desktop (lg: and up)**: Three-panel grid layout, all panels visible
- **Mobile**: Panels become overlays with backdrop, controlled by state

### 4. Dynamic Rendering System

The SettingsPanel uses **dynamic rendering** to generate appropriate controls based on prop definitions:

```typescript
const renderPropControl = (propName: string, propDef: PropDefinition) => {
  switch (propDef.type) {
    case "boolean":
      return <Switch checked={value} onCheckedChange={...} />;
    case "string":
      return <Input value={value} onChange={...} />;
    case "select":
      return <Select value={value} options={propDef.options} />;
    case "number":
      return <Slider value={value} min={propDef.min} max={propDef.max} />;
  }
};
```

This pattern allows the playground to automatically support new prop types by extending the switch statement.

## File Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (metadata, global styles)
│   ├── page.tsx            # Main playground page (state management)
│   └── globals.css         # Global styles and theme variables
│
├── components/
│   ├── playground/
│   │   ├── ComponentList.tsx      # Left sidebar - component browser
│   │   ├── ComponentViewer.tsx    # Center panel - component preview
│   │   ├── SettingsPanel.tsx      # Right sidebar - props editor
│   │   └── index.ts               # Barrel export
│   │
│   └── ui/                        # Reusable UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── ... (shadcn/ui components)
│
├── registry/
│   ├── index.ts                   # Registry aggregation and utilities
│   ├── types.ts                   # TypeScript type definitions
│   └── components/
│       ├── button-component.tsx   # Button definition
│       ├── card-component.tsx     # Card definition
│       └── ... (other components)
│
└── lib/
    └── utils.ts                    # Utility functions (cn helper)
```

## Data Flow

### Component Selection Flow

```
1. User clicks component in ComponentList
   ↓
2. ComponentList calls onSelect(componentId)
   ↓
3. Main page updates selectedComponentId state
   ↓
4. Main page initializes currentProps from component defaults
   ↓
5. ComponentViewer receives new component + props
   ↓
6. ComponentViewer renders component.render(currentProps)
   ↓
7. SettingsPanel receives component + props, renders controls
```

### Prop Change Flow

```
1. User changes prop value in SettingsPanel
   ↓
2. SettingsPanel calls handlePropChange(propName, newValue)
   ↓
3. SettingsPanel calls onPropsChange(updatedProps)
   ↓
4. Main page updates currentProps state
   ↓
5. ComponentViewer receives new currentProps
   ↓
6. ComponentViewer re-renders component.render(newProps)
   ↓
7. Preview updates instantly (React reactivity)
```

## Adding a New Component

To add a new component to the playground:

### Step 1: Create the UI Component (if needed)

If the component doesn't exist in `src/components/ui/`, create it first.

### Step 2: Create the Registry Definition

Create a new file in `src/registry/components/` following this pattern:

```typescript
// src/registry/components/my-component.tsx
import { MyComponent } from "@/components/ui/my-component";
import { ComponentDefinition } from "../types";

export const myComponent: ComponentDefinition = {
  id: "my-component",
  name: "My Component",
  description: "Description of what this component does",
  category: "Display", // or "Inputs", "Layout", "Feedback"
  
  props: {
    // Define configurable props
    propName: {
      type: "string", // or "boolean", "select", "number"
      label: "Prop Label",
      description: "What this prop does",
      defaultValue: "default value",
    },
  },
  
  render: (props) => (
    <MyComponent {...props} />
  ),
  
  code: (props) => {
    // Generate code string
    return `<MyComponent propName="${props.propName}" />`;
  },
};
```

### Step 3: Register the Component

Add the component to the registry in `src/registry/index.ts`:

```typescript
import { myComponent } from "./components/my-component";

export const componentRegistry: ComponentRegistry = [
  // ... existing components
  myComponent,
];
```

That's it! The component will automatically appear in the playground.

## Key Technologies

- **Next.js 16** (App Router) - React framework with server components
- **React 19** - UI library with hooks and reactivity
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Component library (button, card, input, etc.)
- **class-variance-authority** - Component variant management
- **clsx & tailwind-merge** - Class name utilities

## Development Workflow

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the playground.

### Building for Production

```bash
npm run build
npm start
```

## Design Patterns Used

1. **Registry Pattern**: Centralized component definitions enable dynamic discovery and rendering
2. **Lifting State Up**: Shared state managed in parent component, passed down as props
3. **Controlled Components**: All inputs are controlled (value + onChange)
4. **Composition**: Small, focused components composed together
5. **Separation of Concerns**: UI components separate from registry definitions
6. **Type Safety**: TypeScript ensures type correctness throughout

## Future Enhancements

Potential improvements to the architecture:

- **Color Picker Support**: Implement color prop type with visual picker
- **Component Search**: Add search/filter functionality to ComponentList
- **Export Options**: Support multiple export formats (JSX, TSX, styled-components)
- **Presets**: Save and load prop configurations
- **Responsive Preview**: Test components at different viewport sizes
- **Accessibility Testing**: Integrate a11y checks into preview
- **Theme Switching**: Support light/dark mode toggle
- **Component Documentation**: Rich markdown descriptions with examples

## Architecture Benefits

1. **Scalability**: Easy to add new components without touching core UI
2. **Type Safety**: TypeScript catches errors at compile time
3. **Maintainability**: Clear separation of concerns, well-documented code
4. **Developer Experience**: Hot reload, clear error messages, helpful comments
5. **Reusability**: UI components can be used outside the playground
6. **Flexibility**: Registry system supports any React component

---

Built with ❤️ for exploring and showcasing component libraries.
