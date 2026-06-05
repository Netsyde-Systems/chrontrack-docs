---
sidebar_position: 1
---

# Task Hierarchy

The **Organize** page (`/organize`) is where you build and maintain the task tree used throughout Chrontrack. Every timer session, report, and goal is tied to a node in this tree.

![Task hierarchy tree](/img/screenshots/organize-tree.png)

## Structure

Tasks are arranged in a hierarchy — you can nest them as deeply as you like. For example:

```
Life
├── Personal
│   ├── Exercise
│   ├── Reading
│   └── Family
│       ├── Partner
│       └── Children
└── Professional
    ├── Work
    ├── Commute
    └── Break
```

## Adding a task

1. Click the **+** button next to any existing task to add a child beneath it.
2. Type the task name and press **Enter** to save.

To add a top-level task, use the **+** button at the root level.

## Renaming a task

Click directly on a task's name to enter inline-edit mode. Press **Enter** or click away to save.

## Reordering tasks

Drag a task row by its handle to reorder it within the same level.

## Deleting a task

Click the **delete** icon on a task row. If the task has children, they will be deleted too. Any time entries associated with the task are preserved but will show the task path as deleted.

> Shared categories cannot be deleted while active shares exist. See [Sharing Categories](sharing-categories.md).

## Tags

The lower section of the Organize page manages tags. Each tag has:

- **Name**
- **Color**
- **Icon**
- **Scope** — _global_ (available everywhere) or _scoped to a task_ (and optionally all its children)

### Creating a tag

Click **New tag**, fill in the name, and choose a color, icon, and scope.

### Editing a tag

Click the inline edit controls next to any tag to change its name, color, icon, or scope.

### Deleting a tag

Click the delete icon next to a tag. Existing entries that used the tag are not affected — the tag reference is simply removed.
