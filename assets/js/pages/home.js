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
 * Handle contact form submission with Google Forms
 * @param {Event} event - The form submit event
 */
async function handleContactFormSubmit(event) {
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

	try {
		// Submit to Google Forms
		await submitToGoogleForm({
			firstName,
			lastName,
			email,
			message
		});

		// Clear the form
		form.reset();

		// Show success message
		showFormSuccess('Your message has been sent. We\'ll get back to you soon!');

		// Reset form state after a delay
		setTimeout(() => {
			resetFormState();
		}, 5000);

	} catch (error) {
		console.error('Form submission error:', error);
		showFormError('Sorry, there was an error sending your message. Please try again.');

		// Re-enable form on error
		const submitButton = form.querySelector('button[type="submit"]');
		submitButton.innerHTML = 'Send Message';
		Array.from(form.elements).forEach(element => {
			element.disabled = false;
		});
	}
}

/**
 * Submit form data to Google Forms
 * 
 * WHY GOOGLE FORMS APPROACH:
 * ---------------------------
 * We chose Google Forms as our backend solution for several strategic reasons:
 * 
 * 1. STATIC SITE COMPATIBILITY: Our website is hosted on GitHub Pages as a static site,
 *    which means we can't run server-side code (PHP, Node.js, etc.) to process forms.
 *    Google Forms provides a ready-made backend that works with any static site.
 * 
 * 2. ZERO INFRASTRUCTURE COSTS: No need to set up, maintain, or pay for:
 *    - Backend servers (AWS, Heroku, etc.)
 *    - Databases for storing messages
 *    - Email services for notifications
 *    - SSL certificates or security management
 * 
 * 3. BUILT-IN FEATURES WE GET FOR FREE:
 *    - Automatic data storage in Google Sheets
 *    - Email notifications when forms are submitted
 *    - Spam protection and validation
 *    - Data export capabilities (CSV, Excel)
 *    - Form response analytics and charts
 * 
 * 4. RELIABILITY & SCALABILITY: Google's infrastructure handles:
 *    - 99.9% uptime guarantee
 *    - Automatic scaling for high traffic
 *    - Global CDN for fast form submissions
 *    - Data backup and recovery
 * 
 * 5. MAINTENANCE-FREE: Unlike custom backend solutions:
 *    - No security patches to apply
 *    - No server monitoring required
 *    - No database maintenance
 *    - No breaking changes to worry about
 * 
 * 6. EASY CONTENT MANAGEMENT: Non-technical team members can:
 *    - View all messages in familiar Google Sheets interface
 *    - Set up custom email notifications
 *    - Create automated responses
 *    - Generate reports and analytics
 * 
 * TRADE-OFFS CONSIDERED:
 * - Less control over user experience (using no-cors mode)
 * - Dependency on Google's service
 * - Limited customization of data processing
 * - Can't implement complex validation rules server-side
 * 
 * ALTERNATIVES EVALUATED:
 * - Netlify Forms: Great but requires Netlify hosting
 * - Formspree: Paid service with usage limits
 * - EmailJS: Client-side only, less reliable
 * - Custom backend: Overkill for simple contact form
 * 
 * CONCLUSION: For a static site contact form, Google Forms provides the best
 * balance of functionality, reliability, and cost-effectiveness with minimal setup.
 * 
 * @param {Object} formData - The form data to submit
 */
async function submitToGoogleForm(formData) {
	// Replace these with your actual Google Form details
	// DEV !!! This is 
	const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeoF7qd_Q0pKlATNiQJ_zCdyl4EFYP6HhAfI2xpJtdJJHS3QQ/formResponse';

	// Replace these entry IDs with the ones from your Google Form
	const FIELD_MAPPINGS = {
		firstName: 'entry.366239913',    // Replace with actual entry ID
		lastName: 'entry.289498823',     // Replace with actual entry ID  
		email: 'entry.1573987890',        // Replace with actual entry ID
		message: 'entry.970866115'       // Replace with actual entry ID
	};

	// Create form data
	const googleFormData = new FormData();
	googleFormData.append(FIELD_MAPPINGS.firstName, formData.firstName);
	googleFormData.append(FIELD_MAPPINGS.lastName, formData.lastName);
	googleFormData.append(FIELD_MAPPINGS.email, formData.email);
	googleFormData.append(FIELD_MAPPINGS.message, formData.message);

	// Submit to Google Forms
	// Using no-cors mode to avoid CORS issues
	const response = await fetch(GOOGLE_FORM_ACTION_URL, {
		method: 'POST',
		mode: 'no-cors',
		body: googleFormData
	});

	// Note: With no-cors mode, we can't check the actual response
	// So we assume success if no error is thrown
	return response;
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