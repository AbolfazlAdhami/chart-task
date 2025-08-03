# Frontend Developer Technical Test

## Goal

Build a React app that loads chart data from `data.json` and displays it using D3.js. The app should detect the chart type (single-series or multi-series) from the data format and render it.

## Requirements

### 1. Input Data

The application will receive chart definitions in the following format (provided in `data.json`):

```
[
  {
    "title": "single series chart",
    "data": [[timestamp, value]]
  },
  {
    "title": "multi series chart",
    "data": [[timestamp, [value1, value2, value3]]]
  }
]

```

- **Single-series chart:**
    - `value` is a single number.
    - Example: `[[53, -0.056], [58, null], [63, 0.112]]`
- **Multi-series chart:**
    - `value` is an array of multiple values (e.g., 3 values representing different cables).
    - Example: `[[0, [34, 45, 75]], [10, [53, 84, 34]]]`

## 2. Chart Rendering Rules

- **Chart Type Detection:** Automatically detect chart type by checking if `value` is a number (single-series) or an array (multi-series).
- **Single-Series Chart:**
    - Render a single continuous line using D3.js.
    - Skip any points where `value` is `null`.
- **Multi-Series Chart:**
    - Extract each of the three series from `value`.
    - Render three continuous lines (one per series) in the same chart:
        - First line: Blue
        - Second line: Green
        - Third line: Red
    - For each line, skip only points where its own value is `null` (other lines should still render if they have valid data at that timestamp).
- **Chart Titles:** Display the `title` above each chart.
- **Styling:** No specific design or responsiveness is required. Focus on functionality.

### 3. Implementation Details

- Use React (JavaScript or TypeScript — candidate’s choice).
- Use D3.js for rendering charts.
- Loop through all chart objects in `data.json` and render them dynamically.
- Code must be clean, readable, and maintainable.
- You may use AI tools to accelerate your work, but **you must fully understand your code**.

## Reviewer Checklist

### Functionality

- [ ]  Reads `data.json` correctly and processes all chart entries.
- [ ]  Detects chart type (single vs multi) without hardcoding.
- [ ]  Handles `null` values correctly (skips plotting them).
- [ ]  Single-series chart: renders a correct D3 line chart.
- [ ]  Multi-series chart: renders three correct D3 line charts in one chart with correct colors (Blue, Green, Red).
- [ ]  Displays `title` above each chart.

### Code Quality

- [ ]  Code is modular (charts rendered by reusable components/functions).
- [ ]  No unnecessary complexity or unused code.
- [ ]  Variables, functions, and components have clear, descriptive names.
- [ ]  Proper error handling for unexpected data (extra credit if added).

### Performance & Logic

- [ ]  Loops through all charts dynamically without manual chart-specific code.
- [ ]  D3 rendering is correct and updates as expected.