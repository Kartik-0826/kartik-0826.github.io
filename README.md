# PawPath 🐾 - Pet Training Landing Page 🐕

A premium, modern, SaaS-style landing page for a dog and pet training startup. Built with a focus on dark-mode aesthetics, high conversions, and seamless backend integration.

## 🚀 Features

- **Premium Design Aesthetics**: Uses a sleek dark navy, vibrant green, and sharp blue color palette (`#0F172A`, `#22C55E`, `#38BDF8`).
- **Glassmorphism UI**: Semi-transparent background blurs and borders across interactive elements (Pricing cards, feature lists).
- **Zero-Dependency Animations**: Uses lightweight CSS keyframes and vanilla `IntersectionObserver` in JavaScript to beautifully fade and slide elements in on scroll.
- **Micro-Interactions**: Hover states built across buttons, anchor links, and specifically enhanced hover tracking for the floating pricing tiers. 
- **SEO Ready**: Configured with standard Meta tags, Open Graph (OG) social card properties, and a lightweight inline SVG favicon right out of the box.
- **Instant Backend Lead Form**: Features an integrated demo booking form hooked up to Google Apps Script. 
  - Dynamic dropdowns customized explicitly to match the native dark OS theme.
  - Submits asynchronously using `mode: 'no-cors'` for zero-latency user feedback.

## 🛠️ Technologies Used

- **HTML5** - Semantic structure and layout.
- **CSS3** - Custom variables, Flexbox/Grid layouts, custom scrollbars, and keyframe animations.
- **Vanilla JavaScript (ES6)** - Used for mobile menu toggling, smooth anchor scrolling, and handling POST fetch requests.
- **Google Apps Script** - Operates as a serverless backend to pipe lead submissions directly into a Google Spreadsheet.

## 🗂️ Project Structure

```text
/
├── index.html       # The main markup and structure 
├── style.css        # The complete UI design system, variables, and animations
├── script.js        # The logic for smooth scrolls, observers, and Google Apps fetch
└── assets/          # Directory containing hero.png and solution.png
```

## 🔌 Connecting Google Sheets (Lead Generation)

This landing page sends form submissions (Owner Name, Dog Breed, Issue, Email, Timestamp) directly to a Google Sheet.

1. Create a Google Sheet and add headers to Row 1 (`Timestamp`, `Owner Name`, `Email`, `Dog Breed`, `Behavioral Issue`).
2. Go to `Extensions > Apps Script` and paste the `doPost(e)` function logic.
3. Deploy as a Web App to explicitly grab a `scriptURL`.
4. Open `script.js` and replace the `scriptURL` variable with your new endpoint. 
*Note: We utilize `mode: 'no-cors'` in the JS fetch to bypass Google's slow proxy redirects, ensuring the UI responds instantly to the user.*

## 💻 Local Development

Because this is a vanilla frontend project, no complex build system or Node packages are required. 
Simply open `index.html` in any web browser, or use a tool like VS Code's **Live Server** extension to preview it on a local port.

## 📜 License

Created in 2026 for PawPath. 
