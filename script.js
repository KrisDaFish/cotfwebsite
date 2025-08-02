// Smooth scroll for navigation links

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.length > 1 && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
// Test for commiting by Krish
// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-list a');
    
    if (mobileMenuToggle && mobileNav) {
        // Toggle mobile menu
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close mobile menu when clicking on a link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !mobileNav.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close mobile menu on window resize (if screen becomes larger)
        window.addEventListener('resize', function() {
            if (window.innerWidth > 575) {
                mobileMenuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Typewriter animation for homepage description
window.addEventListener('DOMContentLoaded', function() {
    const typewriterEl = document.getElementById('typewriter-text');
    if (typewriterEl) {
        const text = 'A free program for children aged 9-13 to learn Python.';
        let i = 0;
        function type() {
            if (i <= text.length) {
                typewriterEl.textContent = text.slice(0, i);
                i++;
                setTimeout(type, 38);
            }
        }
        type();
    }
});

// Fix hover effect persistence issue
function fixHoverPersistence() {
    // Get all elements with hover effects
    const hoverElements = document.querySelectorAll(`
        .register-btn, .about-btn, .nav-list a, .footer-icon, 
        .stat, .course-step, .course-highlight-alt, .logo-img,
        .register-glossy-btn
    `);
    
    hoverElements.forEach(element => {
        // Add mouseleave event listener to reset hover state
        element.addEventListener('mouseleave', function() {
            // Force a reflow to ensure hover state is reset
            this.style.pointerEvents = 'none';
            this.offsetHeight; // Trigger reflow
            this.style.pointerEvents = '';
        });
        
        // Add click event listener to immediately reset hover state
        element.addEventListener('click', function() {
            // Force hover state reset on click
            this.blur();
            this.style.pointerEvents = 'none';
            this.offsetHeight; // Trigger reflow
            this.style.pointerEvents = '';
        });
    });
}

// Smooth transition for Register button
const registerBtn = document.getElementById('register-btn');
if (registerBtn) {
    registerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        document.body.classList.add('fade-out');
        setTimeout(() => {
            window.location.href = 'register.html';
        }, 600); // Match the new fadeOutPage animation duration
    });
}

// Smooth transition for all main navigation links
function isInternalNavLink(link) {
    // Only animate for links to .html pages in this site, not anchor or external
    return link.hostname === window.location.hostname &&
        link.pathname.endsWith('.html') &&
        link.href !== window.location.href;
}

// Handle navigation links (both desktop and mobile)
function initNavigationLinks() {
    const allNavLinks = document.querySelectorAll('.nav-list a, .mobile-nav-list a');
    
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (isInternalNavLink(this)) {
                e.preventDefault();
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = this.href;
                }, 600); // Match fadeOutPage animation duration
            }
        });
    });
}

// Load global footer
function loadFooter() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            // Insert footer before the closing body tag
            const body = document.body;
            body.insertAdjacentHTML('beforeend', data);
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadFooter();
    fixHoverPersistence();
    initMobileMenu();
    initNavigationLinks();
});

// Placeholder for future interactivity 