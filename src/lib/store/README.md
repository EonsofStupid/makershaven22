# State Management Architecture

## Overview
This application uses a hybrid state management approach:
- Zustand for global application state
- Jotai for component-level reactive state
- Atoms sync with Zustand store for unified state management

## Current Implementation Status

### ✅ Completed
- Basic Zustand auth store setup
- Initial Jotai auth atoms
- Basic store provider structure
- Auth state synchronization

### 🚧 In Progress
- Theme management integration
- Settings synchronization
- Workflow state management

### 📋 Todo

1. Global Store (Zustand)
```typescript
// Remaining store implementations:
- ThemeStore
  - settings
  - mode
  - effectiveTheme
  - actions (updateTheme, resetTheme)
  
- WorkflowStore
  - workflows
  - stages
  - history
  - actions (createWorkflow, updateWorkflow)

- ContentStore
  - content
  - revisions
  - drafts
  - actions (createContent, updateContent)
```

2. Atomic State (Jotai)
```typescript
// Remaining atom implementations:
- Theme atoms
  - themeSettingsAtom
  - themeModeAtom
  - effectiveThemeAtom
  
- Workflow atoms
  - workflowListAtom
  - activeWorkflowAtom
  - workflowHistoryAtom
  
- Content atoms
  - contentListAtom
  - activeContentAtom
  - contentRevisionsAtom
```

3. Store Provider Updates
```typescript
// Need to implement:
- Unified store provider
- Store initialization
- State persistence
- Store middleware
```

4. Type Definitions
```typescript
// Need to define:
- Complete store state types
- Action types
- Store selector types
- Atom types
```

## Implementation Plan

1. Store Structure
```
src/lib/store/
├── README.md
├── index.ts                 # Main store exports
├── providers/              
│   ├── StoreProvider.tsx    # Unified store provider
│   └── index.ts
├── zustand/                # Global stores
│   ├── auth-store.ts      
│   ├── theme-store.ts
│   ├── workflow-store.ts
│   └── content-store.ts
├── atoms/                  # Jotai atoms
│   ├── auth/
│   ├── theme/
│   ├── workflow/
│   └── content/
└── hooks/                  # Custom store hooks
    ├── useAuth.ts
    ├── useTheme.ts
    ├── useWorkflow.ts
    └── useContent.ts
```

2. Integration Steps
- Complete store implementations
- Add persistence layer
- Implement store middleware
- Add error handling
- Add devtools integration
- Add migration handling

3. Type Safety
- Strict typing for all stores
- Type inference for selectors
- Proper action typing
- Middleware types

## Usage Examples

```typescript
// Using global store (Zustand)
const { user, signIn } = useAuthStore();

// Using atoms (Jotai)
const [theme] = useAtom(themeAtom);
const [settings] = useAtom(settingsAtom);

// Using custom hooks
const { updateTheme } = useTheme();
const { createWorkflow } = useWorkflow();
```

## Best Practices

1. State Updates
- Use immer for complex state updates
- Batch related state changes
- Validate state changes

2. Performance
- Memoize selectors
- Use shallow equality checks
- Implement proper cleanup

3. Error Handling
- Catch and log store errors
- Provide fallback states
- Handle async state updates

## Migration Notes

Current implementation requires careful migration of existing state:
1. Move current state to new stores
2. Update components to use new hooks
3. Maintain backwards compatibility
4. Add proper error boundaries