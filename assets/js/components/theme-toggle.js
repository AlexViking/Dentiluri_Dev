/**
 * Theme Toggle Component for Dentiluri Website
 * Provides light/dark theme switching functionality
 */

// Theme constants
const THEMES = {
	LIGHT: 'light',
	DARK: 'dark'
};

// Default theme
const DEFAULT_THEME = THEMES.LIGHT;

// Local storage key for theme
const THEME_STORAGE_KEY = 'dentiluri-theme';

/**
 * Initialize the theme toggle component
 */
export function initializeThemeToggle() {
	// Apply the saved theme or detect user preference
	applyTheme(getSavedTheme());

	// Setup theme toggle buttons
	setupThemeToggle('theme-toggle');
	setupThemeToggle('theme-toggle-mobile');

	// Listen for system preference changes
	setupSystemPreferenceListener();
}

/**
 * Get the saved theme from local storage or system preference
 * @returns {string} The theme to use
 */
function getSavedTheme() {
	// Check if we have a saved theme
	const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

	if (savedTheme === THEMES.LIGHT || savedTheme === THEMES.DARK) {
		return savedTheme;
	}

	// No saved theme, check system preference
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		return THEMES.DARK;
	}

	// Default to light theme
	return DEFAULT_THEME;
}

/**
 * Apply a theme to the document
 * @param {string} theme - The theme to apply
 */
function applyTheme(theme) {
	// Add or remove dark class based on theme
	if (theme === THEMES.DARK) {
		document.documentElement.classList.add('dark');
	} else {
		document.documentElement.classList.remove('dark');
	}

	// Update meta theme-color for browsers that support it
	const metaThemeColor = document.querySelector('meta[name="theme-color"]');

	if (metaThemeColor) {
		metaThemeColor.setAttribute(
			'content',
			theme === THEMES.DARK ? '#1e293b' : '#ffffff'
		);
	}

	// Save theme to local storage
	localStorage.setItem(THEME_STORAGE_KEY, theme);
}

/**
 * Toggle between light and dark theme
 */
function toggleTheme() {
	const currentTheme = localStorage.getItem(THEME_STORAGE_KEY) || DEFAULT_THEME;
	const newTheme = currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;

	applyTheme(newTheme);
}

/**
 * Setup a theme toggle button
 * @param {string} buttonId - The ID of the button element
 */
function setupThemeToggle(buttonId) {
	const toggleButton = document.getElementById(buttonId);

	if (!toggleButton) {
		console.warn(`Theme toggle button with ID "${buttonId}" not found`);
		return;
	}

	// Add click event to toggle theme
	toggleButton.addEventListener('click', toggleTheme);
}

/**
 * Setup a listener for system preference changes
 */
function setupSystemPreferenceListener() {
	if (!window.matchMedia) {
		return;
	}

	// Create a media query list
	const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

	// Add change listener
	mediaQuery.addEventListener('change', (event) => {
		// Only update if user hasn't manually set a preference
		if (!localStorage.getItem(THEME_STORAGE_KEY)) {
			applyTheme(event.matches ? THEMES.DARK : THEMES.LIGHT);
		}
	});
}