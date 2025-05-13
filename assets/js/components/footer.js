/**
 * 
 * Footer Component for Dentiluri Website
 * Provides site footer functionality
*/

/**
 * 
 * Initialize the footer component 
*/

export function initializeFooter() {
	// Get footer element
	const footer = document.getElementById('site-footer');

	if (!footer) {
		console.error('Footer element not found');
		return;
	}

	// Render the footer content
	renderFooter(footer);
}

/**
 * 
 * Render the footer content
 * @param {HTMLElement} footerElement - The footer container element
*/

function renderFooter(footerElement) {
	// Get current year for copyright

	const currentYear = new Date().getFullYear();

	// Create footer HTML
	const footerHTML = `
		<div class="footer-container container">
		<p class="footer-copyright" data-i18n="footer.copyright" data-i18n-params="${currentYear}">
			© ${currentYear} Dentiluri. All rights reserved.
		</p>
		<div class="footer-links">
			<a href="#" class="footer-link" data-i18n="footer.privacyPolicy">
			Privacy Policy
			</a>
			<a href="#" class="footer-link" data-i18n="footer.termsOfService">
			Terms of Service
			</a>
		</div>
		</div>
	`;

	// Set the footer content
	footerElement.innerHTML = footerHTML;
}