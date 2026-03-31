# Implementation Plan - HabitsTrack

HabitsTrack is a premium, mobile-first habit tracking web application designed to help users organize their professional and personal routines. The app features a stunning glassmorphic interface, persistent local storage, and intelligent mental load monitoring.

## User Review Required

> [!IMPORTANT]
> **Aesthetics & Technology**: The app will use React with Vite and Vanilla CSS. I will implement a "Glassmorphism" design system with pastel colors as requested to ensure a premium feel.
> **Persistence**: All data will be stored in `localStorage`. This means the data is private to the browser and device.
> **Surcharge Alert**: I will implement the alert logic based on "chronophagic" tasks (>3) as per the PRD.

## Proposed Changes

### [NEW] Project Foundation
Initialize the project using Vite (React).

#### [NEW] index.css (file:///c:/Data/Antigravity/projects/HabitsTrack/src/index.css)
- Define CSS Variables for the pastel palette.
- Implement glassmorphism utility classes (`backdrop-filter: blur`, `rgba` backgrounds).
- Setup typography (Inter font).
- Define animations for card checking and transitions.

### [NEW] Core Logic & Data
Implement the state management and storage layer.

#### [NEW] storage.js (file:///c:/Data/Antigravity/projects/HabitsTrack/src/utils/storage.js)
- Utility functions to save/load habits and journal entries from `localStorage`.

#### [NEW] App.jsx (file:///c:/Data/Antigravity/projects/HabitsTrack/src/App.jsx)
- Top-level state for habits and journal entries.
- Routing/View selection logic (Pro/Perso toggle, Journal view).
- Surcharge detection logic.

### [NEW] UI Components
Build the interactive components.

#### [NEW] Header.jsx (file:///c:/Data/Antigravity/projects/HabitsTrack/src/components/Header.jsx)
- Glassmorphic top bar.
- Daily progress gauge ("X/Y done").
- Add Habit button (FAB style or prominent top button).

#### [NEW] HabitList.jsx & HabitCard.jsx (file:///c:/Data/Antigravity/projects/HabitCard.jsx)
- Categorized list display.
- Drag and drop reordering (using `dnd-kit`).
- **1-Click Completion**: Satisfying animation when checked.
- Color-coded priority/load indicators.

#### [NEW] HabitForm.jsx (file:///c:/Data/Antigravity/projects/HabitTrack/src/components/HabitForm.jsx)
- Modal for creating/editing habits.
- Fields: Title, Description, Category (Pro/Perso), Frequency, Priority, Mental Load.

#### [NEW] Journal.jsx (file:///c:/Data/Antigravity/projects/HabitTrack/src/components/Journal.jsx)
- Daily entry form: Mood, Stress, Fatigue, Symptoms (Migraine).
- History view of past entries.

## Open Questions

- **Drag & Drop**: Should the order be saved per-category or globally? (I'll assume per-category for better organization).
- **Icons**: Should I use a specific icon set like Lucide-React for the premium feel? (Recommended).

## Verification Plan

### Automated/Manual Tests
- **Persistence**: Add a habit, refresh page, verify it's still there.
- **Categorization**: Toggle between Pro and Perso, verify correct habits show.
- **Surcharge**: Add 4 "chronophagic" habits and verify the alert appears.
- **DND**: Drag a habit to a new position, refresh, verify order is saved.
- **Responsive**: Test layout on mobile and desktop viewports.
