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
    	  <div class="logo-container">
		    // TODO
    	    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="logo-icon">
    	      <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
    	      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    	      <path d="M12 2v2" />
    	      <path d="M12 22v-2" />
    	      <path d="m17 20.66-1-1.73" />
    	      <path d="M11 10.27 7 3.34" />
    	      <path d="m20.66 17-1.73-1" />
    	      <path d="m3.34 7 1.73 1" />
    	      <path d="M14 12h8" />
    	      <path d="M2 12h2" />
    	      <path d="m20.66 7-1.73 1" />
    	      <path d="m3.34 17 1.73-1" />
    	      <path d="m17 3.34-1 1.73" />
    	      <path d="m7 20.66 1-1.73" />
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
    	          </div>
    	        </div>
    	      </div>
	
    	      <a href="tel:5551234567" class="btn btn-ghost btn-sm gap-1">
    	        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
    	          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    	        </svg>
    	        <span data-i18n="common.phone">(555) 123-4567</span>
    	      </a>
	
    	      <a href="appointment.html" class="btn btn-primary">
    	        <span data-i18n="common.bookAppointment">Book Appointment</span>
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
    	      <a href="appointment.html" class="btn btn-primary" data-i18n="common.bookAppointment">Book Appointment</a>
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