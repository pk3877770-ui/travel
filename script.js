/* ========================================
   KARMANA ELITE - THE ART OF TRAVEL LOGIC
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Load of Components
    Promise.all([loadComponent('header', 'header.html'), loadComponent('footer', 'footer.html')])
        .then(() => {
            initializeGlobalUI();
            setupMobileNavigation();
            updateNavigationState();
        });

    // 2. Global Feature Initialization
    initializeAOS();
    setupSmoothScroll();
    setupInquiryForms();
    setupNewsletter();
    setupScrollEffects();
});

/**
 * Robust Component Loader
 */
function loadComponent(id, url) {
    const container = document.getElementById(id);
    if (!container) return Promise.resolve();

    return fetch(url)
        .then(res => res.text())
        .then(html => {
            container.innerHTML = html;
        })
        .catch(err => console.error(`Failed to load ${url}:`, err));
}

/**
 * Global UI Interactions
 */
function initializeGlobalUI() {
    // Scroll to Top
    const stt = document.getElementById('scrollToTop');
    if (stt) {
        window.addEventListener('scroll', () => {
            stt.classList.toggle('show', window.scrollY > 500);
        });
        stt.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Tab Switching Micro-Interactions
    const tabs = document.querySelectorAll('.search-tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            // Logic to change form context could go here
            showNotification(`Switching to ${this.getAttribute('data-tab')} concierge...`, 'info');
        });
    });

    // Date Input Min-Setup
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateInputs.forEach(input => {
        input.min = today;
    });
}

/**
 * Premium Mobile Navigation Logic
 */
function setupMobileNavigation() {
    const toggle = document.querySelector('.menu-toggle');
    const overlay = document.querySelector('.mobile-nav-overlay');
    const header = document.querySelector('.site-header');

    if (!toggle || !overlay) return;

    toggle.addEventListener('click', () => {
        const isOpen = overlay.style.opacity === '1';
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // Close on link click
    overlay.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    function openMobileMenu() {
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'auto';
        toggle.innerHTML = '<i class="fas fa-times"></i>';
        document.body.style.overflow = 'hidden';
        header.classList.add('scrolled'); // Force glass look when menu is open
    }

    function closeMobileMenu() {
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
        toggle.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = 'auto';
        if (window.scrollY <= 50) header.classList.remove('scrolled');
    }
}

/**
 * Smooth Scroll for Anchors
 */
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id === '#') return;

            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/**
 * Header Scroll Effects
 */
function setupScrollEffects() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            // Only remove if mobile menu isn't open
            const overlay = document.querySelector('.mobile-nav-overlay');
            if (!overlay || overlay.style.opacity !== '1') {
                header.classList.remove('scrolled');
            }
        }
    });
}

/**
 * Form Submission Emulation
 */
function setupInquiryForms() {
    const forms = document.querySelectorAll('.search-form-premium, .contact-form-premium, .flight-search-detailed, .hotel-search-detailed, .package-search-detailed');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalHtml = btn.innerHTML;

            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Securing Rates...';
            btn.disabled = true;

            setTimeout(() => {
                showNotification('Bespoke recommendations are being prepared for you.', 'success');
                btn.innerHTML = originalHtml;
                btn.disabled = false;
                form.reset();
            }, 2000);
        });
    });
}

/**
 * Newsletter Logic
 */
function setupNewsletter() {
    const newsForm = document.querySelector('.newsletter-form');
    if (!newsForm) return;

    newsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsForm.querySelector('input');

        if (input.value) {
            showNotification('Welcome to the Elite Circle. Stay inspired.', 'success');
            input.value = '';
        }
    });
}

/**
 * Premium Notification System
 */
function showNotification(message, type = 'info') {
    // Remove existing
    document.querySelectorAll('.notification').forEach(n => n.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type} glass shadow-lg`;

    const icons = {
        success: '<i class="fas fa-check-circle text-success me-2"></i>',
        warning: '<i class="fas fa-exclamation-circle text-warning me-2"></i>',
        info: '<i class="fas fa-info-circle text-info me-2"></i>',
        premium: '<i class="fas fa-crown text-accent me-2"></i>'
    };

    notification.innerHTML = `
        <div class="d-flex align-items-center">
            ${icons[type] || ''}
            <span class="fw-semibold small">${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);

    // Auto-remove
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

/**
 * Navigation Active State
 */
function updateNavigationState() {
    const links = document.querySelectorAll('.nav-link');
    const current = window.location.pathname.split('/').pop() || 'index.html';

    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === current) {
            link.classList.add('active');
        }
    });
}

/**
 * AOS Initialization
 */
function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out-cubic',
            once: true,
            mirror: false,
            offset: 50
        });
    }
}

// Search functionality
function searchFlights() {
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const date = document.getElementById('date').value;

    // Mock data ya API call
    displayFlights(mockFlightsData);
}
function displayFlights(flights) {
    let html = '';
    flights.forEach(flight => {
        html += `
        <div class="flight-card">
            <h3>${flight.airline} - ${flight.flightNo}</h3>
            <p>₹${flight.price} | ${flight.departure} → ${flight.arrival}</p>
            <button onclick="selectFlight('${flight.id}')">Select</button>
        </div>`;
    });
    document.getElementById('flightResults').innerHTML = html;
}