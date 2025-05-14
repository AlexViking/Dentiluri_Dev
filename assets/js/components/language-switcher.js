/**
 * Language Switcher Component for Dentiluri Website
 * Provides multi-language support functionality
 */

// Supported languages
const LANGUAGES = {
	EN: 'en', // English
	GE: 'ge', // Georgian
};

// Default language
const DEFAULT_LANGUAGE = LANGUAGES.EN;

// Local storage key for language preference
const LANGUAGE_STORAGE_KEY = 'dentiluri-language';

// Cached translations
let translations = {};

/**
 * Initialize the language switcher component
 */
export function initializeLanguageSwitcher() {
	// Load and apply the saved language
	const currentLanguage = getSavedLanguage();
	loadTranslations(currentLanguage)
		.then(() => {
			applyTranslations();
			updateLanguageUI(currentLanguage);
		})
		.catch(error => {
			console.error('Error loading translations:', error);
		});

	// Setup language toggle dropdowns
	setupLanguageToggle('language-toggle', 'language-dropdown');
	setupLanguageToggle('language-toggle-mobile', 'language-dropdown-mobile');

	// Setup language selection
	setupLanguageSelection('language-dropdown');
	setupLanguageSelection('language-dropdown-mobile');
}

/**
 * Get the saved language from local storage or browser preference
 * @returns {string} The language code to use
 */
function getSavedLanguage() {
	// Check if we have a saved language
	const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);

	if (savedLanguage && Object.values(LANGUAGES).includes(savedLanguage)) {
		return savedLanguage;
	}

	// No saved language, check browser language
	const browserLanguage = navigator.language || navigator.userLanguage;
	const languageCode = browserLanguage.split('-')[0].toLowerCase();

	if (Object.values(LANGUAGES).includes(languageCode)) {
		return languageCode;
	}

	// Default to English
	return DEFAULT_LANGUAGE;
}

/**
 * Load translations for a specific language
 * @param {string} language - The language code to load
 * @returns {Promise} A promise that resolves when translations are loaded
 */
function loadTranslations(language) {
	return new Promise((resolve, reject) => {
		// Path to the translations file
		const translationPath = `assets/js/i18n/${language}.json`;

		// Fetch the translations
		fetch(translationPath)
			.then(response => {
				if (!response.ok) {
					throw new Error(`Failed to load translations for ${language}`);
				}
				return response.json();
			})
			.then(data => {
				// Cache the translations
				translations = data;
				resolve();
			})
			.catch(error => {
				console.error(`Error loading translations for ${language}:`, error);

				// If not English and failed, try to load English as fallback
				if (language !== LANGUAGES.EN) {
					console.warn(`Falling back to English translations`);
					return loadTranslations(LANGUAGES.EN);
				}

				reject(error);
			});
	});
}

/**
 * Apply translations to the DOM
 */
function applyTranslations() {
	// Find all elements with data-i18n attribute
	const elements = document.querySelectorAll('[data-i18n]');

	elements.forEach(element => {
		// Get the translation key
		const key = element.getAttribute('data-i18n');

		// Get translation text
		const translatedText = getTranslation(key);

		// Check if we have parameters to format
		const params = element.getAttribute('data-i18n-params');

		if (params) {
			// Format the translation with parameters
			const formattedText = formatTranslation(translatedText, params.split(','));
			element.textContent = formattedText;
		} else {
			// Apply the translation
			element.textContent = translatedText;
		}
	});
}

/**
 * Get a translation value from the translations object
 * @param {string} key - The translation key in dot notation (e.g., 'common.siteName')
 * @returns {string} The translated text or the key if not found
 */
function getTranslation(key) {
	// Split the key by dots
	const parts = key.split('.');

	// Navigate through the translations object
	let result = translations;

	for (const part of parts) {
		if (result && result[part] !== undefined) {
			result = result[part];
		} else {
			// Key not found, return the key itself
			return key;
		}
	}

	return result;
}

/**
 * Format a translation string with parameters
 * @param {string} text - The translation text with placeholders
 * @param {Array<string>} params - The parameters to insert
 * @returns {string} The formatted text
 */
function formatTranslation(text, params) {
	// Replace each placeholder with the corresponding parameter
	let formatted = text;

	params.forEach((param, index) => {
		formatted = formatted.replace(`{${index}}`, param);
	});

	return formatted;
}

/**
 * Change the current language
 * @param {string} language - The language code to switch to
 */
function changeLanguage(language) {
	// Skip if it's already the current language
	if (getSavedLanguage() === language) {
		return;
	}

	// Load and apply the new language
	loadTranslations(language)
		.then(() => {
			// Save the language preference
			localStorage.setItem(LANGUAGE_STORAGE_KEY, language);

			// Apply translations
			applyTranslations();

			// Update UI
			updateLanguageUI(language);

			// Close any open language dropdowns
			document.querySelectorAll('.language-dropdown').forEach(dropdown => {
				dropdown.classList.remove('show');
			});
		})
		.catch(error => {
			console.error(`Error changing to language ${language}:`, error);
		});
}

/**
 * Update language UI to reflect the current language
 * @param {string} language - The current language code
 */
function updateLanguageUI(language) {
	// Update all language option elements
	document.querySelectorAll('.language-option').forEach(option => {
		const optionLanguage = option.getAttribute('data-language');

		// Remove check icons from all options
		const checkIcon = option.querySelector('.check-icon');

		if (checkIcon) {
			checkIcon.style.display = optionLanguage === language ? 'inline-block' : 'none';
		}
	});
}

/**
 * Setup a language toggle dropdown
 * @param {string} toggleId - The ID of the toggle button
 * @param {string} dropdownId - The ID of the dropdown element
 */
function setupLanguageToggle(toggleId, dropdownId) {
	const toggle = document.getElementById(toggleId);
	const dropdown = document.getElementById(dropdownId);

	if (!toggle || !dropdown) {
		console.warn(`Language toggle elements not found: ${toggleId}, ${dropdownId}`);
		return;
	}

	// Add click event to toggle dropdown
	toggle.addEventListener('click', (event) => {
		event.stopPropagation();
		dropdown.classList.toggle('show');

		// Close other dropdowns
		document.querySelectorAll('.language-dropdown').forEach(el => {
			if (el.id !== dropdownId && el.classList.contains('show')) {
				el.classList.remove('show');
			}
		});
	});

	// Close dropdown when clicking outside
	document.addEventListener('click', (event) => {
		if (!event.target.closest(`#${dropdownId}`) && !event.target.closest(`#${toggleId}`)) {
			dropdown.classList.remove('show');
		}
	});
}

/**
 * Setup language selection functionality
 * @param {string} dropdownId - The ID of the dropdown element
 */
function setupLanguageSelection(dropdownId) {
	const dropdown = document.getElementById(dropdownId);

	if (!dropdown) {
		console.warn(`Language dropdown not found: ${dropdownId}`);
		return;
	}

	// Get all language options
	const options = dropdown.querySelectorAll('.language-option');

	// Add click events to options
	options.forEach(option => {
		option.addEventListener('click', () => {
			const language = option.getAttribute('data-language');
			changeLanguage(language);
		});
	});
}

/**
 * Add a new language to the language switcher
 * @param {string} languageCode - The language code (e.g., 'de')
 * @param {string} languageName - The display name (e.g., 'Deutsch')
 * @param {Object} translationData - The translations object
 */
export function addLanguage(languageCode, languageName, translationData) {
	// Skip if language already exists
	if (Object.values(LANGUAGES).includes(languageCode)) {
		console.warn(`Language ${languageCode} already exists`);
		return;
	}

	// Add to LANGUAGES object
	LANGUAGES[languageCode.toUpperCase()] = languageCode;

	// Add translation data
	fetch(`assets/js/i18n/${languageCode}.json`, {
		method: 'GET'
	})
		.then(response => {
			if (response.ok) {
				console.warn(`Translation file for ${languageCode} already exists`);
				return;
			}

			// Create translation file
			const translationBlob = new Blob(
				[JSON.stringify(translationData, null, 2)],
				{ type: 'application/json' }
			);

			// Create download link (for development only)
			const downloadLink = document.createElement('a');
			downloadLink.href = URL.createObjectURL(translationBlob);
			downloadLink.download = `${languageCode}.json`;
			downloadLink.style.display = 'none';
			document.body.appendChild(downloadLink);
			downloadLink.click();
			document.body.removeChild(downloadLink);

			console.log(`Translation file for ${languageCode} has been generated`);
		})
		.catch(error => {
			console.error(`Error checking for existing translation file: ${error}`);
		});

	// Add language option to dropdowns
	document.querySelectorAll('.language-dropdown').forEach(dropdown => {
		// Check if option already exists
		if (dropdown.querySelector(`[data-language="${languageCode}"]`)) {
			return;
		}

		// Create new option
		const option = document.createElement('div');
		option.className = 'language-option';
		option.setAttribute('data-language', languageCode);
		option.textContent = languageName;

		// Add check icon
		const checkIcon = document.createElement('svg');
		checkIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
		checkIcon.setAttribute('viewBox', '0 0 24 24');
		checkIcon.setAttribute('fill', 'none');
		checkIcon.setAttribute('stroke', 'currentColor');
		checkIcon.setAttribute('stroke-width', '2');
		checkIcon.setAttribute('stroke-linecap', 'round');
		checkIcon.setAttribute('stroke-linejoin', 'round');
		checkIcon.className = 'check-icon';
		checkIcon.style.display = 'none';

		const path = document.createElement('path');
		path.setAttribute('d', 'M20 6 9 17l-5-5');
		checkIcon.appendChild(path);

		option.appendChild(checkIcon);
		dropdown.appendChild(option);

		// Add click event
		option.addEventListener('click', () => {
			changeLanguage(languageCode);
		});
	});

	console.log(`Language ${languageName} (${languageCode}) has been added`);
}