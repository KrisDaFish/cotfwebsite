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

// Typewriter animation for homepage description
window.addEventListener('DOMContentLoaded', function() {
    const typewriterEl = document.getElementById('typewriter-text');
    if (typewriterEl) {
        const text = 'A free program for children aged 10-14 to learn Python.';
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
document.querySelectorAll('.nav-list a').forEach(link => {
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

// Placeholder for future interactivity 