# Dentiluri Website - Technical Documentation

## Project Overview

This document provides technical documentation for the Dentiluri website implementation using vanilla HTML, CSS, and JavaScript (no frameworks). The website consists of four main pages:

1. Home (index.html)
2. About (about.html)
3. Services (services.html)
4. Contact (contact.html)

## Project Structure

The project follows this directory structure:

```
Dentiluri-Dev/
├── assets/
│   ├── css/
│   │   ├── global.css
│   │   ├── components.css
│   │   └── pages/
│   │       ├── home.css
│   │       ├── about.css
│   │       ├── services.css
│   │       └── contact.css
│   ├── js/
│   │   ├── main.js
│   │   └── i18n/
│   │       ├── en.json
│   │       ├── ge.json
│   │   ├── components/
│   │   │   ├── header.js
│   │   │   ├── footer.js
│   │   │   ├── language-switcher.js
│   │   │   └── theme-toggle.js
│   │   └── pages/
│   │       ├── home.js
│   │       ├── about.js
│   │       ├── services.js
│   │       └── contact.js
│   └── images/
│       └── placeholder.svg
├── index.html
├── about.html
├── services.html
├── contact.html
└── README.md
```

## Developer Assignments

The project is designed to be implemented by a team of 4 junior & 1 senior developers with the following responsibilities:

### senior Developer: Core Structure and Home Page
- Set up the project structure
- Implement global CSS
- Implement shared components (header, footer)

### junior Developer 1: Home and Services Pages
- Implement the home page (HTML, CSS)

### junior Developer 2: About Pages
- Implement the about page (HTML, CSS)

### junior Developer 3: Services Pages
- Implement the services page (HTML, CSS)

### junior Developer 4: Contact Pages
- Implement the contact page (HTML, CSS)

### senior Developer: JavaScript Core Functionality
- Implement the theme toggle functionality
- Implement the SPA-like routing system
- Implement shared JavaScript utilities

### senior Developer: Language Switcher and Accessibility
- Implement the language switching functionality
- Ensure website accessibility
- Perform cross-browser testing

## Technical Implementation Details

### SPA-Like Routing

Although this is a multi-page website, we're implementing a SPA-like experience by:

1. Using JavaScript to intercept link clicks
2. Loading page content dynamically using the Fetch API
3. Updating the browser history using the History API
4. Maintaining the same header and footer across all pages

This approach provides better user experience without full page reloads while still using standard HTML files.

### Language Switching

The language switching feature works by:

1. Storing translations in JSON files for each supported language
2. Loading translations based on the selected language
3. Updating text content dynamically without page reload
4. Persisting language preference in localStorage

Currently supported languages:
- English (default)
- Georgian

To add a new language:
1. Create a new translation file in `assets/js/i18n/[language-code].json`
2. Add the language to the language switcher options in `assets/js/components/language-switcher.js`
3. Add appropriate translations for all text elements

### Theme Toggle

The theme toggle implements a light/dark mode switch by:

1. Adding/removing a 'dark' class to the HTML element
2. Using CSS variables to manage theme colors
3. Persisting theme preference in localStorage

### Responsive Design

The website is fully responsive using:
1. CSS Flexbox and Grid layouts
2. Media queries for different breakpoints
3. Mobile-first approach

Breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1023px
- Desktop: ≥ 1024px

## Environment Setup

### Prerequisites
- Git
- Visual Studio Code
- Live Server extension for VS Code

### Setup Process for Developers

1. **Clone the repository**
   ```bash
   git clone https://github.com/AlexViking/Dentiluri_Dev.git
   cd Dentiluri_Dev
   ```

2. **Install VS Code extensions**
   - Live Server
   - Prettier - Code formatter
   - ESLint
   - HTML CSS Support

3. **Configure Git**
   ```bash
   git config user.name "Your Name"
   git config user.email "your-email@example.com"
   ```

4. **Start development server**
   - Open the project in VS Code
   - Right-click on index.html and select "Open with Live Server"

### Git Workflow

1. **Branch naming convention**
   - Feature: `feature/name-of-feature`
   - Bug fix: `fix/name-of-bug`
   - Documentation: `docs/name-of-documentation`

2. **Commit message convention**
   - Format: `type(scope): message`
   - Example: `feat(header): add mobile responsive menu`

3. **Pull request process**
   - Create PR from your feature branch to main
   - Request review from at least one team member
   - Address review comments
   - Merge when approved

## Testing

### Manual Testing Process
1. Test on multiple browsers (Chrome, Firefox, Safari, Edge)
2. Test on different devices and screen sizes
3. Test all interactive elements (buttons, forms, dropdown menus)
4. Test keyboard navigation

### Accessibility Testing
- Use the WAVE Web Accessibility Evaluation Tool
- Ensure proper contrast ratios
- Verify all images have alt text
- Test with screen readers

## Performance Optimization

The website implements several performance optimizations:

1. **CSS Optimization**
   - Minification using a build process
   - Using efficient selectors
   - Avoiding unnecessary nesting

2. **JavaScript Optimization**
   - Code splitting by page
   - Lazy loading of non-critical resources
   - Using efficient DOM operations

3. **Image Optimization**
   - Using appropriately sized images
   - Using SVGs where possible
   - Implementing lazy loading for images

## Browser Compatibility

The website is designed to work on:
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Adding a New Page

To add a new page to the website:

1. Create a new HTML file in the pages directory
2. Create corresponding CSS file in assets/css/pages
3. Create corresponding JavaScript file in assets/js/pages
4. Add link to the page in the navigation menu
5. Add route handling in the main.js file
6. Add translations for the new page content

## Adding a New Language

To add support for a new language:

1. Create a new translation file in assets/js/i18n directory
2. Add the language to the language switcher component
3. Implement any special handling for language-specific formatting

## Common Issues and Solutions

### Issue: Page content not updating when navigating
**Solution:** Check that the router is correctly intercepting link clicks and updating the DOM.

### Issue: Language not persisting between page loads
**Solution:** Verify localStorage is working and the language preference is being saved correctly.

### Issue: Theme preference not applying
**Solution:** Check that the theme toggle is correctly adding/removing the 'dark' class and updating localStorage.

## Resources

- [MDN Web Docs](https://developer.mozilla.org/en-US/)
- [CSS Tricks](https://css-tricks.com/)
- [Can I use...](https://caniuse.com/)
