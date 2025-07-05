# Sample Data for Testing

This document describes the sample data feature that helps with testing and demonstrating the task tracker application.

## Overview

The app includes comprehensive sample data that showcases all features of the task tracker:

- **8 sample tasks** with various priorities, completion statuses, and due dates
- **Automatic loading** when the app is empty
- **Manual loading** via "Load Sample Data" button
- **Realistic content** related to web development and learning

## Sample Tasks Included

### 1. Complete React assignment
- **Priority**: High
- **Status**: Pending
- **Due Date**: 2024-01-20
- **Description**: Build a task tracker application with all required features

### 2. Review JavaScript concepts
- **Priority**: Medium
- **Status**: Completed
- **Due Date**: 2024-01-14 (Overdue)
- **Description**: Go through ES6+ features, async/await, and modern JavaScript patterns

### 3. Learn TypeScript basics
- **Priority**: High
- **Status**: Pending
- **Due Date**: 2024-01-25
- **Description**: Study TypeScript fundamentals, interfaces, and type safety

### 4. Practice CSS Grid and Flexbox
- **Priority**: Low
- **Status**: Pending
- **Due Date**: 2024-01-30
- **Description**: Master responsive design with CSS Grid and Flexbox layouts

### 5. Read React documentation
- **Priority**: Medium
- **Status**: Completed
- **Due Date**: 2024-01-12 (Overdue)
- **Description**: Go through official React docs and best practices

### 6. Set up development environment
- **Priority**: High
- **Status**: Completed
- **Due Date**: 2024-01-10 (Overdue)
- **Description**: Install Node.js, VS Code extensions, and configure Git

### 7. Create portfolio website
- **Priority**: Medium
- **Status**: Pending
- **Due Date**: 2024-02-15
- **Description**: Design and build a personal portfolio showcasing projects

### 8. Study data structures
- **Priority**: Low
- **Status**: Pending
- **Due Date**: 2024-02-01
- **Description**: Learn arrays, objects, maps, sets, and algorithms

## Features Demonstrated

### Priority Levels
- **High Priority**: 3 tasks (red indicators)
- **Medium Priority**: 3 tasks (yellow indicators)
- **Low Priority**: 2 tasks (green indicators)

### Completion Status
- **Completed**: 3 tasks (with strikethrough and reduced opacity)
- **Pending**: 5 tasks (normal styling)

### Due Dates
- **Overdue**: 3 tasks (red text with "(Overdue)" indicator)
- **Future**: 5 tasks (normal date display)

### Search & Filter Testing
- **Search terms**: "React", "JavaScript", "TypeScript", "CSS", "portfolio"
- **Priority filtering**: Test all three priority levels
- **Status filtering**: Test completed vs pending tasks

## How to Use Sample Data

### Automatic Loading
1. Clear your localStorage or start with a fresh app
2. The sample data will automatically load when no tasks exist
3. All 8 sample tasks will be available for testing

### Manual Loading
1. Click the "Load Sample Data" button in the sidebar
2. This will replace any existing tasks with the sample data
3. Useful for resetting the app to a known state

### Testing Scenarios

#### Filter Testing
- **All Tasks**: Should show 8 tasks
- **Pending**: Should show 5 tasks
- **Completed**: Should show 3 tasks

#### Search Testing
- Search "React" → Should find 2 tasks
- Search "JavaScript" → Should find 1 task
- Search "TypeScript" → Should find 1 task

#### Priority Testing
- **High Priority**: Should show 3 tasks
- **Medium Priority**: Should show 3 tasks
- **Low Priority**: Should show 2 tasks

#### Due Date Testing
- Look for overdue indicators on completed tasks
- Check future due dates on pending tasks
- Verify date formatting and display

## File Structure

```
src/utils/sampleData.ts
├── sampleTasks[]          # Array of sample task objects
├── loadSampleData()       # Function to load sample data
└── hasSampleData()        # Function to check if sample data should be loaded
```

## Technical Details

### Data Format
Each sample task includes:
- **id**: Unique identifier
- **title**: Task title
- **description**: Detailed description
- **completed**: Boolean completion status
- **priority**: 'high' | 'medium' | 'low'
- **dueDate**: ISO date string
- **createdAt**: ISO date string
- **updatedAt**: ISO date string (auto-generated)

### Integration
- **App.tsx**: Automatically loads sample data when app is empty
- **TaskForm.tsx**: Includes "Load Sample Data" button
- **SampleDataButton.tsx**: Component for manual loading
- **localStorage**: Sample data is saved to localStorage

## Benefits

1. **Immediate Testing**: No need to manually create tasks
2. **Feature Demonstration**: Shows all app capabilities
3. **Consistent State**: Provides a known starting point
4. **Development Aid**: Helps with testing and debugging
5. **User Experience**: Gives users examples of how to use the app

---

**Note**: Sample data is only loaded when the app is empty or manually requested. Users can delete all tasks and start fresh, or use the sample data as a starting point for their own task management. 