# HTML Slideshow - Architectural Overview

This document provides a comprehensive overview of the logical structure and architecture of the HTML Slideshow project. It is intended for developers who want to modify, extend, or maintain the project.

## 1. Project Objective
The project is a lightweight, responsive, 8-bit themed slideshow presentation tool built with Vanilla HTML, CSS, and JavaScript. It features theme switching, progress tracking, and keyboard/touch navigation.

## 2. Directory Structure

```text
html-slides-show/
├── index.html              # Main shell; loads slides into an iframe
├── ARCH_OVERVIEW.md        # This document
├── assets/                 # Shared resources
│   ├── css/
│   │   ├── base.css        # Global variables (colors, spacing, animations)
│   │   └── slides.css      # Slide-specific components and utility classes
│   └── js/
│       ├── config.js       # Central configuration and theme definitions
│       ├── navigation.js   # Logic for keyboard/touch/button navigation
│       └── slides.js       # Slide loading, preloading, and iframe lifecycle
├── docs/                   # Design drafts and source content
│   └── outline.md          # Content extracted from original Word document
├── slides/                 # Individual slide HTML files (slide1.html to slide15.html)
├── themes/                 # (Optional) External theme definitions
├── fix_inline_styles.py     # Utility script to clean up inline styles
├── generate_remaining_slides.py # Automated slide generation script
└── test_slides.py          # Integration test suite
```

## 3. Core Logic & Data Flow

### 3.1 Bootstrap Process
1.  `index.html` loads as the parent shell.
2.  It imports three JS modules: `config.js`, `navigation.js`, and `slides.js`.
3.  `configManager` (in `config.js`) initializes settings and applies the active theme using CSS variables.
4.  `navigationManager` (in `navigation.js`) sets up event listeners for input (keyboard, mouse, swipe).
5.  `slidesManager` (in `slides.js`) manages the `iframe` source and preloads adjacent slides for performance.

### 3.2 Slide Lifecycle
- When a slide changes:
    1.  `navigationManager.goToSlide(index)` is called.
    2.  The parent URL hash is updated (`#slideN`).
    3.  The `iframe.src` is updated to the corresponding HTML file in `/slides/`.
    4.  `slides.js` listens for the `load` event on the iframe.
    5.  `slides.js` injects standard CSS (`base.css`, `slides.css`) and fonts into the iframe document to ensure consistent rendering.

## 4. Design System (8-Bit Aesthetic)

### 4.1 Global Variables (`base.css`)
Styles are controlled via CSS variables on `:root`:
- `--color-primary`, `--color-secondary`, `--color-accent`
- `--font-pixel` (uses 'Press Start 2P')
- `--border-sharp` (2px solid with dark grey)

### 4.2 Utility Classes (`slides.css`)
To keep slide HTML files clean, use utility classes:
- **Spacing**: `.mt-4` (margin-top), `.p-md` (padding)
- **Typography**: `.font-pixel`, `.font-0-8` (scaling), `.text-center`
- **Layout**:
    - `.sidebar-layout`: Split view with main content and a persistent sidebar.
    - `.two-column-layout`: Flexible grid for comparisons.
    - `.pixel-card-grid`: Standard grid for presenting items in cards.
- **Progress**: `.pct-N` classes (e.g., `.pct-13-3`) are used for manually setting the progress bar width in each slide's footer to avoid JS race conditions with the iframe.

## 5. Maintenance Guide

### How to add a new slide
1.  Create `slides/slideN.html` using an existing slide as a template.
2.  Add a new entry to `slidesData` in `assets/js/config.js`.
3.  Increment the `total` slides count in `defaultConfig.slides.total`.

### How to add a new theme
1.  Open `assets/js/config.js`.
2.  Add a new object to `predefinedThemes` with your desired `colors`.
3.  The `configManager.applyTheme()` method will automatically distribute these colors to the CSS variables.

### How to modify the design
- **Global styles**: Edit `assets/css/base.css`.
- **Component styles**: Edit `assets/css/slides.css`.
- **Slide structure**: All slides follow a consistent pattern:
  ```html
  <div class="slide-page">
    <header class="slide-header">...</header>
    <main class="slide-content">...</main>
    <footer class="slide-footer">...</footer>
  </div>
  ```

---
*Created on 2026-03-16 for the children's education content evolution project.*
