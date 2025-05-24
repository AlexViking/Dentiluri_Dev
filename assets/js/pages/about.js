/**
 * About Page JavaScript for Dentiluri Website
 * Handles functionality specific to the about page
 */

/**
 * Initialize the about page
 */
export default function initAboutPage() {
	// Initialize team member interactions
	initTeamMembers();

	// Initialize facility image gallery
	initFacilityGallery();
}

/**
 * Initialize team member interactions
 */
function initTeamMembers() {
	const teamMembers = document.querySelectorAll('.team-member');

	if (!teamMembers.length) {
		return;
	}

	// Add hover effect and click interaction
	teamMembers.forEach(member => {
		// Add subtle animation on hover
		member.addEventListener('mouseenter', () => {
			member.style.transform = 'translateY(-5px)';
			member.style.transition = 'transform 0.3s ease';
		});

		member.addEventListener('mouseleave', () => {
			member.style.transform = 'translateY(0)';
		});

		// Add click event for potential modal or expanded view
		member.addEventListener('click', () => {
			const name = member.querySelector('h3').textContent;
			const role = member.querySelector('.member-title').textContent;
			const bio = member.querySelector('.member-bio').textContent;

			// For now, just log the info - could be expanded to show a modal
			console.log(`Selected team member: ${name}, ${role}`);
			console.log(`Bio: ${bio}`);

			// Future enhancement: Show modal with more details
			// showTeamMemberModal(name, role, bio, member.querySelector('img').src);
		});
	});
}

/**
 * Initialize facility image gallery
 */
function initFacilityGallery() {
	const facilityItems = document.querySelectorAll('.facility-item');

	if (!facilityItems.length) {
		return;
	}

	// Add click event to facility images for potential lightbox
	facilityItems.forEach(item => {
		const image = item.querySelector('img');
		const title = item.querySelector('h3').textContent;

		if (image) {
			// Add subtle animation on hover
			image.addEventListener('mouseenter', () => {
				image.style.transform = 'scale(1.03)';
				image.style.transition = 'transform 0.3s ease';
			});

			image.addEventListener('mouseleave', () => {
				image.style.transform = 'scale(1)';
			});

			// Add click event for potential lightbox
			image.addEventListener('click', () => {
				console.log(`Image clicked: ${title}`);

				// Future enhancement: Open lightbox gallery
				// openLightbox(image.src, title);
			});
		}
	});
}

/**
 * Future implementation: Show team member modal with more details
 */
function showTeamMemberModal(name, role, bio, imageSrc) {
	// Create modal element
	const modal = document.createElement('div');
	modal.className = 'modal';
	modal.innerHTML = `
	  <div class="modal-content">
		<span class="close-button">&times;</span>
		<div class="modal-body">
		  <img src="${imageSrc}" alt="${name}" class="modal-image">
		  <div class="modal-info">
			<h3>${name}</h3>
			<p class="modal-role">${role}</p>
			<p class="modal-bio">${bio}</p>
		  </div>
		</div>
	  </div>
	`;

	// Add to DOM
	document.body.appendChild(modal);

	// Show modal
	setTimeout(() => {
		modal.style.opacity = '1';
	}, 10);

	// Close button functionality
	const closeButton = modal.querySelector('.close-button');
	closeButton.addEventListener('click', () => {
		modal.style.opacity = '0';
		setTimeout(() => {
			document.body.removeChild(modal);
		}, 300);
	});

	// Close on outside click
	modal.addEventListener('click', (event) => {
		if (event.target === modal) {
			modal.style.opacity = '0';
			setTimeout(() => {
				document.body.removeChild(modal);
			}, 300);
		}
	});
}

/**
 * Future implementation: Open lightbox gallery
 */
function openLightbox(imageSrc, title) {
	// Create lightbox element
	const lightbox = document.createElement('div');
	lightbox.className = 'lightbox';
	lightbox.innerHTML = `
	  <div class="lightbox-content">
		<span class="close-button">&times;</span>
		<img src="${imageSrc}" alt="${title}" class="lightbox-image">
		<p class="lightbox-title">${title}</p>
	  </div>
	`;

	// Add to DOM
	document.body.appendChild(lightbox);

	// Show lightbox
	setTimeout(() => {
		lightbox.style.opacity = '1';
	}, 10);

	// Close button functionality
	const closeButton = lightbox.querySelector('.close-button');
	closeButton.addEventListener('click', () => {
		lightbox.style.opacity = '0';
		setTimeout(() => {
			document.body.removeChild(lightbox);
		}, 300);
	});

	// Close on outside click
	lightbox.addEventListener('click', (event) => {
		if (event.target === lightbox) {
			lightbox.style.opacity = '0';
			setTimeout(() => {
				document.body.removeChild(lightbox);
			}, 300);
		}
	});
}