/**
 * Home Page JavaScript for Dentiluri Website
 * Handles functionality specific to the home page
 */

/**
 * Initialize the home page
 */
export default function initHomePage() {
	// Initialize contact form
	initContactForm();
}

/**
 * Initialize the contact form functionality
 */
function initContactForm() {
	const contactForm = document.getElementById('home-contact-form');

	if (!contactForm) {
		console.warn('Home contact form not found');
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
	const message = form.elements['message'].value.trim();

	// Simple validation
	if (!firstName || !lastName || !email || !message) {
		showFormError('Please fill in all fields');
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
		// Clear the form
		form.reset();

		// Show success message
		showFormSuccess('Your message has been sent. We\'ll get back to you soon!');

		// Reset form state after a delay
		setTimeout(() => {
			resetFormState();
		}, 5000);
	}, 1500);
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
		const form = document.getElementById('home-contact-form');
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
	const form = document.getElementById('home-contact-form');
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
		const form = document.getElementById('home-contact-form');
		form.parentNode.insertBefore(successElement, form.nextSibling);
	}

	// Update success message
	successElement.textContent = message;
	successElement.style.display = 'block';

	// Reset button
	const form = document.getElementById('home-contact-form');
	const submitButton = form.querySelector('button[type="submit"]');

	submitButton.innerHTML = 'Send Message';

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