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

	/**
	 * Dev
	 * If you need to add "Appointment Button" here it is: 
	 * Place after "<a href="tel:5551234567"" 
	 * 
	 * <a href="appointment.html" class="btn btn-primary">
		<span data-i18n="common.bookAppointment">Book Appointment</span>
		</a>

		For mobile:
		<a href="appointment.html" class="btn btn-primary" data-i18n="common.bookAppointment">Book Appointment</a>

	*/



	// Create header HTML
	const headerHTML = `
    	<div class="header-container container">
    	  <div class="logo-container">
		    <style>
				.s0 { fill: var(--primary) }
				.s1 { fill: var(--foreground) }
			</style>

    	    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="logo-icon">
			<g id="logo">
				<path id="Path 53" class="s0" d="m105.1 39.7c-18.8-3.4-36.9 0.3-52.3 17.5-15.4 16.9-19.5 43.8-18 72.6 5.3 95.5 44.7 162.1 105.5 233-45.4-77-74.6-164-78.5-234.4-1.2-22.5 1.2-42.4 10.9-53.2 8.1-8.9 17.6-10.8 27.6-9 42.4 7.7 97.4 62.1 156.4 20.6l0.6-0.4c4.3-2.5 32.6-18.3 61.9-6.7 30.8 12.1 50.2 49.8 42.2 90.1 3.1-15.2 4.1-28.8 4.1-39.9 0.1-26 0.2-52.7-17.9-72.7-35.1-38.9-78.9-10.4-114.1 12.5-34.5 22.4-87.8-22.6-128.4-30z"/>
				<path id="Path 54" class="s1" d="m299.1 226c0 21.6-8.9 41.1-23.2 55.2q-5.8 5.3-12.3 9.8-0.1 0.1-0.2 0.2c-18 12.4-39.9 19.6-63.4 19.6-10.5 0-20.6-1.4-30.1-4.1v-24c8.1 0 16.1-0.8 23.8-2.5 27.8-6 51.8-22.4 67.7-44.8q0-0.1 0-0.1 3.2-4.3 5.7-9c5.5-10.1 8.6-21.8 8.6-34.1q0-1.5 0-3c1-3.4 2.7-6.6 5.2-9.3q0.4-0.4 0.8-0.8 0.4-0.5 0.9-0.9c10.3 13.2 16.5 29.7 16.5 47.8z"/>
				<path id="Path 55" class="s0" d="m277.6 163.2c-2.5-2.5-4.4-5.5-5.5-8.7-0.4-1.1-2-1.1-2.4 0-1.1 3.1-2.8 6-5.2 8.4q-0.1 0.2-0.2 0.3c-2.6 2.5-5.5 4.3-8.7 5.4-1.1 0.4-1.1 2.1 0 2.5 3.2 1.1 6.1 2.9 8.6 5.4 2.6 2.5 4.4 5.5 5.5 8.7 0.4 1.1 2 1.1 2.4-0.1 1-2.8 2.6-5.5 4.7-7.8q0.4-0.4 0.8-0.8c2.5-2.5 5.5-4.3 8.6-5.4 1.2-0.4 1.2-2.1 0-2.5-3.1-1.1-6.1-2.9-8.6-5.4z"/>
				<path id="Path 56" class="s1" d="m271.1 135.6v0.1c0 7.1-2.2 13.6-5.9 19q-0.1 0-0.1 0c-1.7 2.5-3.7 4.7-5.9 6.6-3.7 2.7-8 4.3-12.5 4.7q-11.5 0-22.9 0-27 0.1-53.9 0.2v116.5c-10.6 0-20.9-1.4-30.6-4.2v-142.9z"/>
			</g>
    	    </svg>
    	    <span class="logo-text" data-i18n="common.siteName">Dentiluri</span>
    	  </div>
	
    	  <nav class="desktop-nav">
    	    <div class="nav-links">
    	      <a href="index.html" class="nav-link ${currentPath === PAGES.HOME ? 'active' : ''}" data-i18n="nav.home">Home</a>
    	      <a href="about.html" class="nav-link ${currentPath === PAGES.ABOUT ? 'active' : ''}" data-i18n="nav.about">About</a>
    	      <a href="services.html" class="nav-link ${currentPath === PAGES.SERVICES ? 'active' : ''}" data-i18n="nav.services">Services</a>
    	      <a href="contact.html" class="nav-link ${currentPath === PAGES.CONTACT ? 'active' : ''}" data-i18n="nav.contact">Contact</a>
    	    </div>
    	  </nav>
	
    	  <div class="header-actions">
    	    <div class="desktop-actions">
    	      <button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">
    	        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sun-icon">
    	          <circle cx="12" cy="12" r="4" />
    	          <path d="M12 2v2" />
    	          <path d="M12 20v2" />
    	          <path d="m4.93 4.93 1.41 1.41" />
    	          <path d="m17.66 17.66 1.41 1.41" />
    	          <path d="M2 12h2" />
    	          <path d="M20 12h2" />
    	          <path d="m6.34 17.66-1.41 1.41" />
    	          <path d="m19.07 4.93-1.41 1.41" />
    	        </svg>
    	        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="moon-icon">
    	          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    	        </svg>
    	      </button>
	
    	      <div id="language-switcher" class="language-switcher">
    	        <button id="language-toggle" class="language-toggle" aria-label="Switch language">
    	          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
    	            <circle cx="12" cy="12" r="10" />
    	            <path d="m2 12 20 0" />
    	            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    	          </svg>
    	        </button>
    	        <div id="language-dropdown" class="language-dropdown">
    	          <div class="language-option" data-language="en">
    	            English
    	            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="check-icon">
    	              <path d="M20 6 9 17l-5-5" />
    	            </svg>
    	          </div>
    	          <div class="language-option" data-language="ge">
    	            Georgian
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="check-icon">
    	              <path d="M20 6 9 17l-5-5" />
    	            </svg>
    	          </div>
    	        </div>
    	      </div>
	
    	      <a href="tel:5551234567" class="btn btn-ghost btn-sm gap-1">
    	        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
    	          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    	        </svg>
    	        <span data-i18n="common.phone">(555) 123-4567</span>
    	      </a>
    	    </div>
	
    	    <div class="mobile-actions">
    	      <button id="theme-toggle-mobile" class="theme-toggle" aria-label="Toggle theme">
    	        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sun-icon">
    	          <circle cx="12" cy="12" r="4" />
    	          <path d="M12 2v2" />
    	          <path d="M12 20v2" />
    	          <path d="m4.93 4.93 1.41 1.41" />
    	          <path d="m17.66 17.66 1.41 1.41" />
    	          <path d="M2 12h2" />
    	          <path d="M20 12h2" />
    	          <path d="m6.34 17.66-1.41 1.41" />
    	          <path d="m19.07 4.93-1.41 1.41" />
    	        </svg>
    	        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="moon-icon">
    	          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    	        </svg>
    	      </button>
	
    	      <div id="language-switcher-mobile" class="language-switcher">
    	        <button id="language-toggle-mobile" class="language-toggle" aria-label="Switch language">
    	          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
    	            <circle cx="12" cy="12" r="10" />
    	            <path d="m2 12 20 0" />
    	            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    	          </svg>
    	        </button>
    	        <div id="language-dropdown-mobile" class="language-dropdown">
    	          <div class="language-option" data-language="en">
    	            English
    	            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="check-icon">
    	              <path d="M20 6 9 17l-5-5" />
    	            </svg>
    	          </div>
    	          <div class="language-option" data-language="ge">
    	            Georgian
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="check-icon">
    	              <path d="M20 6 9 17l-5-5" />
    	            </svg>
    	          </div>
    	        </div>
    	      </div>
	
    	      <button id="mobile-menu-toggle" class="menu-button" aria-label="Toggle menu">
    	        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
    	          <line x1="4" x2="20" y1="12" y2="12" />
    	          <line x1="4" x2="20" y1="6" y2="6" />
    	          <line x1="4" x2="20" y1="18" y2="18" />
    	        </svg>
    	      </button>
    	    </div>
    	  </div>
    	</div>
	
    	<div id="mobile-menu" class="mobile-menu">
    	  <nav>
    	    <div class="nav-links">
    	      <a href="index.html" class="nav-link ${currentPath === PAGES.HOME ? 'active' : ''}" data-i18n="nav.home">Home</a>
    	      <a href="about.html" class="nav-link ${currentPath === PAGES.ABOUT ? 'active' : ''}" data-i18n="nav.about">About</a>
    	      <a href="services.html" class="nav-link ${currentPath === PAGES.SERVICES ? 'active' : ''}" data-i18n="nav.services">Services</a>
    	      <a href="contact.html" class="nav-link ${currentPath === PAGES.CONTACT ? 'active' : ''}" data-i18n="nav.contact">Contact</a>
    	    </div>
    	  </nav>
    	</div>
  	`;

	// Set the header content
	headerElement.innerHTML = headerHTML;
}

/**
 * 
 * Setup mobile menu toggle functionality
*/

function setupMobileMenu() {
	// Get mobile menu elements
	const menuToggle = document.getElementById('mobile-menu-toggle');
	const mobileMenu = document.getElementById('mobile-menu');

	if (!menuToggle || !mobileMenu) {
		console.warn('Mobile menu element not found');
		return;
	}

	// Add click event to toggle menu
	menuToggle.addEventListener('click', () => {
		mobileMenu.classList.toggle('open');

		// Update aria-expanded attribute
		const isExpanded = mobileMenu.classList.contains('open');
		menuToggle.setAttribute('aria-expanded', isExpanded);
	});

	// Close mobile menu when clicking outside
	document.addEventListener('click', (event) => {
		if (
			!event.target.closest('#mobile-menu') &&
			!event.target.closest('#mobile-menu-toggle') &&
			mobileMenu.classList.contains('open')
		) {
			mobileMenu.classList.remove('open');
			menuToggle.setAttribute('aria-expanded', 'false');
		}
	});

	// Close mobile menu when window is resized to desktop size
	window.addEventListener('resize', () => {
		if (window.innerWidth >= 768 && mobileMenu.classList.contains('open')) {
			mobileMenu.classList.remove('open');
			menuToggle.setAttribute('aria-expanded', 'false');
		}
	});

	// Handle mobile menu link clicks (close menu after click)
	const mobileMenuLinks = mobileMenu.querySelectorAll('a');

	mobileMenuLinks.forEach(link => {
		link.addEventListener('click', () => {
			mobileMenu.classList.remove('open');
			menuToggle.setAttribute('aria-expanded', 'false');
		});
	});
}