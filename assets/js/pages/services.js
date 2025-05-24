/**
 * Services Page JavaScript for Dentiluri Website
 * Handles functionality specific to the services page
 */

/**
 * Initialize the services page
 */
export default function initServicesPage() {
	// Initialize service card interactions
	initServiceCards();

	// Initialize service links
	initServiceLinks();
}

/**
 * Initialize service card interactions
 */
function initServiceCards() {
	const serviceCards = document.querySelectorAll('.service-card');

	if (!serviceCards.length) {
		return;
	}

	// Add subtle animation on hover
	serviceCards.forEach(card => {
		// Add hover effect
		card.addEventListener('mouseenter', () => {
			card.style.transform = 'translateY(-5px)';
			card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
			card.style.boxShadow = 'var(--shadow-md)';
		});

		card.addEventListener('mouseleave', () => {
			card.style.transform = 'translateY(0)';
			card.style.boxShadow = 'var(--shadow-sm)';
		});

		// Add click event for "Learn More" links
		const learnMoreLink = card.querySelector('.btn');

		if (learnMoreLink) {
			learnMoreLink.addEventListener('click', (event) => {
				// For demo purposes, prevent navigation and show tooltip
				event.preventDefault();

				const cardTitle = card.querySelector('h3').textContent;
				showTooltip(learnMoreLink, `${cardTitle} details coming soon!`);
			});
		}
	});
}

/**
 * Initialize service links
 */
function initServiceLinks() {
	// Add click event to service items for potential tooltip
	const serviceItems = document.querySelectorAll('.service-item');

	serviceItems.forEach(item => {
		item.addEventListener('click', () => {
			const serviceName = item.querySelector('p').textContent;

			// Create tooltip or notification
			showNotification({
				title: serviceName,
				message: `Learn more about our ${serviceName.toLowerCase()} service by booking a consultation.`,
				type: 'info'
			});
		});

		// Make items look interactive
		item.style.cursor = 'pointer';

		// Add subtle hover effect
		item.addEventListener('mouseenter', () => {
			item.style.backgroundColor = 'color-mix(in srgb, var(--primary) 5%, transparent)';
			item.style.transition = 'background-color 0.3s ease';
			item.style.borderRadius = 'var(--radius)';
		});

		item.addEventListener('mouseleave', () => {
			item.style.backgroundColor = 'transparent';
		});
	});
}

/**
 * Show a tooltip for an element
 * @param {HTMLElement} element - The element to show the tooltip for
 * @param {string} message - The tooltip message
 */
function showTooltip(element, message) {
	// Check if tooltip already exists
	let tooltip = document.querySelector('.tooltip-text');

	if (!tooltip) {
		// Create tooltip
		tooltip = document.createElement('div');
		tooltip.className = 'tooltip-text';
		document.body.appendChild(tooltip);
	}

	// Set tooltip text
	tooltip.textContent = message;

	// Position tooltip
	const rect = element.getBoundingClientRect();
	tooltip.style.left = rect.left + rect.width / 2 + 'px';
	tooltip.style.top = rect.top - 10 + 'px';

	// Show tooltip
	tooltip.style.visibility = 'visible';
	tooltip.style.opacity = '1';

	// Hide tooltip after delay
	setTimeout(() => {
		tooltip.style.visibility = 'hidden';
		tooltip.style.opacity = '0';
	}, 3000);
}

/**
 * Show a notification
 * @param {Object} options - Notification options
 * @param {string} options.title - Notification title
 * @param {string} options.message - Notification message
 * @param {string} options.type - Notification type (success, error, info, warning)
 */
function showNotification(options) {
	// Check if notification already exists
	let notification = document.querySelector('.notification');

	if (notification) {
		// Remove existing notification
		document.body.removeChild(notification);
	}

	// Create notification
	notification = document.createElement('div');
	notification.className = `notification notification-${options.type || 'info'}`;

	// Create notification content
	notification.innerHTML = `
    <div class="notification-header">
      <h4 class="notification-title">${options.title}</h4>
      <span class="notification-close">&times;</span>
    </div>
    <div class="notification-body">
      <p>${options.message}</p>
    </div>
  `;

	// Add to DOM
	document.body.appendChild(notification);

	// Show notification
	setTimeout(() => {
		notification.classList.add('show');
	}, 10);

	// Add close button functionality
	const closeButton = notification.querySelector('.notification-close');

	closeButton.addEventListener('click', () => {
		notification.classList.remove('show');

		// Remove notification after animation
		setTimeout(() => {
			if (notification.parentNode) {
				document.body.removeChild(notification);
			}
		}, 300);
	});

	// Auto-hide after delay
	setTimeout(() => {
		if (notification.parentNode) {
			notification.classList.remove('show');

			// Remove notification after animation
			setTimeout(() => {
				if (notification.parentNode) {
					document.body.removeChild(notification);
				}
			}, 300);
		}
	}, 5000);
}