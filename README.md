# Responsive Dashboard Template

A free, responsive admin dashboard layout built with plain HTML5 and CSS3 — no frameworks, no build step. Sidebar navigation, colorful stat cards, a sales chart panel, a traffic sources panel and a data table that all collapse cleanly on mobile.

![Preview](preview.png)

**[Live demo](https://lenivalestevao.github.io/responsive-dashboard-template/)**

## Features

- Fixed sidebar navigation with active-link highlighting
- Four colorful stat cards (revenue, users, orders, conversion rate)
- A lightweight CSS bar chart and a traffic sources breakdown, both populated from plain JavaScript data
- A recent orders table with status badges (paid / pending / failed)
- Fully responsive: the sidebar collapses into an off-canvas drawer below 768px, with a hamburger toggle and backdrop overlay
- Zero dependencies — just HTML, CSS and vanilla JavaScript

## Using it as a template

Clone this repo, download the ZIP, or copy `index.html`, `style.css` and `script.js` straight into your own project. Everything is driven by CSS custom properties defined at the top of `style.css`, so re-theming the color palette only takes a few line changes:

```css
:root {
  --sidebar-bg: #2a2e3d;
  --primary: #4e73df;
  --success: #1cc88a;
  --warning: #f6c23e;
  --danger: #e74a3b;
}
```

Swap the sample data in `script.js` (stat cards are static in `index.html`, while the chart bars, traffic list and orders table are generated from arrays in `script.js`) for your own.

## Project structure

```
index.html   Markup for the dashboard layout
style.css    All styling, including the mobile breakpoint
script.js    Sidebar toggle, nav active-state and sample data rendering
```

## License

MIT — use it however you like, personal or commercial.
