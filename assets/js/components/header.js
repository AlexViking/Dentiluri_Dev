/**
 * 
 * Header Component for Dentiluri Website
 * Provides navigation and site header functionality
*/

// Config - Current page paths for active state

const PAGES = {
	HOME: 'index.html',
	ABOUT: 'about.html',
	SERVICES: 'services.html',
	// APPOINTMENT: 'appointment.html', // May be in the Future. 
	CONTACT: 'contact.html',
};



/**
 * 
 * Initialize the header component
*/

export function initializeHeader() {
	// Get header element
	const header = document.getElementById('site-header');

	if (!header) {
		console.error('Header element not found');
		return;
	}

	// Render the header content
	renderHeader(header);

	// Setup mobile menu toggle
	setupMobileMenu();
}


/**
 * 
 * Render the header content
 * @param {HTMLElement} headerElement - The header container element
*/

function renderHeader(headerElement) {
	// Get current page path for active state
	const currentPath = window.location.pathname.split('/').pop() || PAGES.HOME;

	// Create header HTML
	const headerHTML = `
		<div class="header-container container">
			// logo-container
			<div class="logo-container">
				<svg>
				</svg>
				<span class="logo-text">Dentiluri</span>
			</div>

			// desktop navigation
			<nav class="desktop-nav">
				<div class="nav-links">
					<a href="index.html" class="nav-link ${currentPath === PAGES.HOME ? 'active' : ''}" >Home</a>
					<a href="about.html" class="nav-link ${currentPath === PAGES.ABOUT ? 'active' : ''}" >About</a>
					<a href="services.html" class="nav-link ${currentPath === PAGES.SERVICES ? 'active' : ''}" >Services</a>
					<a href="contact.html" class="nav-link ${currentPath === PAGES.CONTACT ? 'active' : ''}" >Contact</a>
				</div>
			</nav>

			// header-actions TODO
			<div class="header-actions">

			</div>
		</div>
	
	`
	// Set the header content
	headerElement.innerHTML = headerHTML;
}