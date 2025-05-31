/**
 * Contact Page JavaScript for Dentiluri Website
 * Handles functionality specific to the contact page
 */

/**
 * Initialize the contact page
 */
export default function initContactPage() {
	// Initialize contact form
	initContactForm();

	// Initialize social links
	initSocialLinks();

	// Initialize map interaction
	initMap();
}

/**
 * Initialize contact form
 */
function initContactForm() {
	const contactForm = document.getElementById('contact-form');

	if (!contactForm) {
		console.warn('Contact form not found');
		return;
	}

	// Add submit event listener
	contactForm.addEventListener('submit', handleContactFormSubmit);
}

/**
 * Handle contact form submission
 * @param {Event} event - The form submit event
 */
function handleContactFormSubmit(event) {
	// Prevent default form submission
	event.preventDefault();

	// Get form elements
	const form = event.target;
	const firstName = form.elements['first-name'].value.trim();
	const lastName = form.elements['last-name'].value.trim();
	const email = form.elements['email'].value.trim();
	const subject = form.elements['subject'].value.trim();
	const message = form.elements['message'].value.trim();

	// Simple validation
	if (!firstName || !lastName || !email || !subject || !message) {
		showFormError('Please fill in all required fields');
		return;
	}

	// Email validation
	if (!isValidEmail(email)) {
		showFormError('Please enter a valid email address');
		return;
	}

	// Show loading state
	showFormLoading();

	// Simulate form submission with a delay
	setTimeout(() => {
		// Show success message
		showFormSuccess('Your message has been sent. We\'ll get back to you shortly.');

		// Clear the form
		form.reset();

		// Reset form state after a delay
		setTimeout(() => {
			resetFormState();
		}, 5000);
	}, 1500);
}

/**
 * Initialize social links with hover effects
 */
function initSocialLinks() {
	const socialIcons = document.querySelectorAll('.social-icon');

	socialIcons.forEach(icon => {
		// Add hover effect
		icon.addEventListener('mouseenter', () => {
			icon.style.transform = 'translateY(-3px)';
		});

		icon.addEventListener('mouseleave', () => {
			icon.style.transform = 'translateY(0)';
		});
	});
}

/**
 * Initialize map interactions
 */
function initMap() {
	const mapContainer = document.querySelector('.map-container');

	if (!mapContainer) {
		return;
	}

	// Add a simple hover effect to the container
	mapContainer.addEventListener('mouseenter', () => {
		mapContainer.style.boxShadow = 'var(--shadow-lg)';
		mapContainer.style.transition = 'box-shadow 0.3s ease';
	});

	mapContainer.addEventListener('mouseleave', () => {
		mapContainer.style.boxShadow = 'var(--shadow-md)';
	});
}

/**
 * Show a form error message
 * @param {string} message - The error message to display
 */
function showFormError(message) {
	// Check if error element already exists
	let errorElement = document.getElementById('contact-form-error');

	if (!errorElement) {
		// Create error element
		errorElement = document.createElement('div');
		errorElement.id = 'contact-form-error';
		errorElement.className = 'form-error';

		// Add to form
		const form = document.getElementById('contact-form');
		form.parentNode.insertBefore(errorElement, form.nextSibling);
	}

	// Update error message
	errorElement.textContent = message;
	errorElement.style.display = 'block';
}

/**
 * Show form loading state
 */
function showFormLoading() {
	const form = document.getElementById('contact-form');
	const submitButton = form.querySelector('button[type="submit"]');

	// Disable form
	Array.from(form.elements).forEach(element => {
		element.disabled = true;
	});

	// Update button text
	submitButton.innerHTML = `
    <svg class="loading" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
    Sending...
  `;
}

/**
 * Show form success message
 * @param {string} message - The success message to display
 */
function showFormSuccess(message) {
	// Hide any existing error
	const errorElement = document.getElementById('contact-form-error');

	if (errorElement) {
		errorElement.style.display = 'none';
	}

	// Check if success element already exists
	let successElement = document.getElementById('contact-form-success');

	if (!successElement) {
		// Create success element
		successElement = document.createElement('div');
		successElement.id = 'contact-form-success';
		successElement.className = 'form-success';

		// Add to form
		const form = document.getElementById('contact-form');
		form.parentNode.insertBefore(successElement, form.nextSibling);
	}

	// Update success message
	successElement.textContent = message;
	successElement.style.display = 'block';

	// Reset button
	const form = document.getElementById('contact-form');
	const submitButton = form.querySelector('button[type="submit"]');

	submitButton.textContent = 'Send Message';

	// Re-enable form but keep it reset
	Array.from(form.elements).forEach(element => {
		element.disabled = false;
	});
}

/**
 * Reset form state
 */
function resetFormState() {
	// Hide messages
	const errorElement = document.getElementById('contact-form-error');
	const successElement = document.getElementById('contact-form-success');

	if (errorElement) {
		errorElement.style.display = 'none';
	}

	if (successElement) {
		successElement.style.display = 'none';
	}
}

/**
 * Validate an email address
 * @param {string} email - The email to validate
 * @returns {boolean} Whether the email is valid
 */
function isValidEmail(email) {
	// Simple email validation regex
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

/**
 * Create a dynamic map marker popup
 * This is just a demonstration - in a real application, this would interact with the map API
 */
function createMapMarker() {
	// Create marker element
	const marker = document.createElement('div');
	marker.className = 'map-marker';
	marker.innerHTML = `
    <div class="marker-popup">
      <h3>Dentiluri</h3>
      <p>123 Dental Way, Cityville, ST 12345</p>
      <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">Get Directions</a>
    </div>
  `;

	// Add to map container
	const mapContainer = document.querySelector('.map-container');
	if (mapContainer) {
		mapContainer.appendChild(marker);
	}
}