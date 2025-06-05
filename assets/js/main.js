/**
 * Main JavaScript file for Dentiluri Website
 * Handles core functionality, routing, and component initialization
 */

// Import component modules
import { initializeHeader } from './components/header.js';
import { initializeFooter } from './components/footer.js';
import { initializeThemeToggle } from './components/theme-toggle.js';
import { initializeLanguageSwitcher } from './components/language-switcher.js';

// DOM Elements
const mainContent = document.getElementById('main-content');

/**
 * Initialize the application
 */
function initializeApp() {
	// Initialize components
	initializeHeader();
	initializeFooter();
	initializeThemeToggle();
	initializeLanguageSwitcher();

	// Set up routing
	setupRouting();

	// Initialize the current page
	initializeCurrentPage();
}

/**
 * Set up the SPA-like routing
 */
function setupRouting() {
	// Get all navigation links
	const navLinks = document.querySelectorAll('a[href]');

	// Add click event listeners to links
	navLinks.forEach(link => {
		link.addEventListener('click', handleLinkClick);
	});

	// Listen for history changes (back/forward buttons)
	window.addEventListener('popstate', handlePopState);
}

/**
 * Handle link click events
 * @param {Event} event - The click event
 */
function handleLinkClick(event) {
	// Get the link href
	const href = event.currentTarget.getAttribute('href');

	// Only handle internal links
	if (href && (href.startsWith('/') || href.indexOf('://') === -1)) {
		// Skip external links and anchor links
		if (href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:')) {
			return;
		}

		// Prevent default link behavior
		event.preventDefault();

		// Skip if it's the current page
		if (href === window.location.pathname) {
			return;
		}

		// Navigate to the page
		navigateTo(href);
	}
}

/**
 * Handle browser history changes
 * @param {Event} event - The popstate event
 */
function handlePopState(event) {
	// Load the current page from history
	loadPage(window.location.pathname);
}

/**
 * Navigate to a specific page
 * @param {string} url - The URL to navigate to
 */
function navigateTo(url) {
	// Update browser history
	window.history.pushState({}, '', url);

	// Load the page
	loadPage(url);
}

/**
 * Load a page by URL
 * @param {string} url - The URL to load
 */
function loadPage(url) {
	// Default to index.html if root path
	if (url === '/' || url === '') {
		url = '/index.html';
	}

	// Remove leading slash if exists
	if (url.startsWith('/')) {
		url = url.substring(1);
	}

	// Add .html extension if not present
	if (!url.endsWith('.html')) {
		url += '.html';
	}

	// Show loading indicator
	showLoadingIndicator();

	// Fetch the page content
	fetch(url)
		.then(response => {
			if (!response.ok) {
				throw new Error('Page not found');
			}
			return response.text();
		})
		.then(html => {
			// Parse the HTML
			const parser = new DOMParser();
			const doc = parser.parseFromString(html, 'text/html');

			// Get just the main content
			const newMainContent = doc.getElementById('main-content');

			// Update the page title
			document.title = doc.title;

			// Update the main content
			mainContent.innerHTML = newMainContent.innerHTML;

			// Update active navigation links
			updateActiveNavLinks(url);

			// IMPORTANT: Reapply translations using localStorage
			const savedLanguage = localStorage.getItem('dentiluri-language');
			if (savedLanguage && savedLanguage !== 'en') {
				reapplyTranslations(savedLanguage);
			}

			// Initialize the page-specific JavaScript
			initializePageScript(url);

			// Hide loading indicator
			hideLoadingIndicator();

			// Scroll to top
			window.scrollTo(0, 0);
		})
		.catch(error => {
			console.error('Error loading page:', error);
			loadErrorPage();
			hideLoadingIndicator();
		});
}

/**
 * Reapply translations after page content changes
 * @param {string} language - The language code to apply
 */
function reapplyTranslations(language) {
	// Load and apply translations for the saved language
	fetch(`assets/js/i18n/${language}.json`)
		.then(response => {
			if (!response.ok) {
				throw new Error(`Failed to load translations for ${language}`);
			}
			return response.json();
		})
		.then(translations => {
			applyTranslationsToDOM(translations);
		})
		.catch(error => {
			console.error('Error reapplying translations:', error);
		});
}

/**
 * Apply translations to DOM elements
 * @param {Object} translations - The translations object
 */
function applyTranslationsToDOM(translations) {
	const elements = document.querySelectorAll('[data-i18n]');

	elements.forEach(element => {
		const key = element.getAttribute('data-i18n');
		const translatedText = getTranslation(key, translations);

		const params = element.getAttribute('data-i18n-params');
		if (params) {
			const formattedText = formatTranslation(translatedText, params.split(','));
			element.textContent = formattedText;
		} else {
			element.textContent = translatedText;
		}
	});
}

/**
 * Get translation from nested object using dot notation
 * @param {string} key - Translation key (e.g., 'nav.home')
 * @param {Object} translations - Translations object
 * @returns {string} Translated text or key if not found
 */
function getTranslation(key, translations) {
	const parts = key.split('.');
	let result = translations;

	for (const part of parts) {
		if (result && result[part] !== undefined) {
			result = result[part];
		} else {
			return key; // Return key if not found
		}
	}

	return result;
}

/**
 * Format translation with parameters
 * @param {string} text - Text with placeholders like {0}, {1}
 * @param {Array} params - Parameters to substitute
 * @returns {string} Formatted text
 */
function formatTranslation(text, params) {
	let formatted = text;
	params.forEach((param, index) => {
		formatted = formatted.replace(`{${index}}`, param);
	});
	return formatted;
}

/**
 * Show a loading indicator
 */
function showLoadingIndicator() {
	// Create a loading indicator if it doesn't exist
	let loadingIndicator = document.getElementById('loading-indicator');

	if (!loadingIndicator) {
		loadingIndicator = document.createElement('div');
		loadingIndicator.id = 'loading-indicator';
		loadingIndicator.className = 'loading-indicator';

		// Create spinner
		const spinner = document.createElement('div');
		spinner.className = 'spinner';
		loadingIndicator.appendChild(spinner);

		// Add to document
		document.body.appendChild(loadingIndicator);
	}

	// Show the indicator
	loadingIndicator.style.display = 'flex';
}

/**
 * Hide the loading indicator
 */
function hideLoadingIndicator() {
	const loadingIndicator = document.getElementById('loading-indicator');

	if (loadingIndicator) {
		loadingIndicator.style.display = 'none';
	}
}

/**
 * Update active state of navigation links
 * @param {string} url - Current URL
 */
function updateActiveNavLinks(url) {
	// Get the current page path
	const currentPath = url.split('/').pop();

	// Get all navigation links
	const navLinks = document.querySelectorAll('nav a');

	// Update the active state
	navLinks.forEach(link => {
		const linkPath = link.getAttribute('href').split('/').pop();

		if (linkPath === currentPath ||
			(currentPath === 'index.html' && linkPath === '')) {
			link.classList.add('active');
		} else {
			link.classList.remove('active');
		}
	});
}

/**
 * Initialize page-specific JavaScript
 * @param {string} url - The page URL
 */
function initializePageScript(url) {
	// Extract the page name from the URL
	const pageName = url.split('/').pop().replace('.html', '');

	// Handle index.html as home
	const normalizedPageName = pageName === 'index' ? 'home' : pageName;

	// Try to dynamically import the page script
	try {
		import(`./pages/${normalizedPageName}.js`)
			.then(module => {
				if (typeof module.default === 'function') {
					module.default();
				}
			})
			.catch(error => {
				console.warn(`No page script found for ${normalizedPageName}`);
			});
	} catch (error) {
		console.warn(`Error loading page script for ${normalizedPageName}:`, error);
	}
}

/**
 * Load an error page
 */
function loadErrorPage() {
	mainContent.innerHTML = `
    <section class="error-section">
      <div class="container">
        <div class="text-center">
          <h1>Page Not Found</h1>
          <p>Sorry, the page you are looking for could not be found.</p>
          <a href="index.html" class="btn btn-primary">Go Home</a>
        </div>
      </div>
    </section>
  `;
}

/**
 * Initialize the current page based on the URL
 */
function initializeCurrentPage() {
	// Get the current path
	const currentPath = window.location.pathname;

	// Initialize the current page script
	initializePageScript(currentPath || 'index.html');
}

/**
 * Initialize when the DOM content is loaded
 */
document.addEventListener('DOMContentLoaded', initializeApp);

// Export functions for use in other modules
export { navigateTo };