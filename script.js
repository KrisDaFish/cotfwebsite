// Coders of the Future — site behaviour

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Mobile menu ---------------------------------------------------------------
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.mobile-nav');
    if (!toggle || !nav) return;

    function setOpen(open) {
        toggle.classList.toggle('active', open);
        nav.classList.toggle('active', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        document.body.style.overflow = open ? 'hidden' : '';
    }

    toggle.addEventListener('click', () => {
        setOpen(!nav.classList.contains('active'));
    });

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => setOpen(false));
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            setOpen(false);
            toggle.focus();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 860) setOpen(false);
    });
}

// Hero prompt ---------------------------------------------------------------
function initTypewriter() {
    const el = document.getElementById('typewriter-text');
    if (!el) return;

    const text = 'A free program for children aged 9-13 to learn Python.';

    if (prefersReducedMotion.matches) {
        el.textContent = text;
        return;
    }

    let i = 0;
    (function type() {
        el.textContent = text.slice(0, i);
        if (i++ <= text.length) setTimeout(type, 38);
    })();
}

// Page transitions ----------------------------------------------------------
function isInternalLink(link) {
    return link.hostname === window.location.hostname &&
        !link.hasAttribute('target') &&
        !link.getAttribute('href').startsWith('#') &&
        link.href !== window.location.href;
}

function initPageTransitions() {
    if (prefersReducedMotion.matches) return;

    document.querySelectorAll('.nav-list a, .mobile-nav-list a, #register-btn').forEach(link => {
        link.addEventListener('click', function (e) {
            if (e.metaKey || e.ctrlKey || e.shiftKey || !isInternalLink(this)) return;
            e.preventDefault();
            const { href } = this;
            document.body.classList.add('fade-out');
            setTimeout(() => { window.location.href = href; }, 280);
        });
    });
}

// Reviews marquee -----------------------------------------------------------
function initReviewsMarquee() {
    const track = document.querySelector('.reviews-track');
    if (!track || track.dataset.cloned === 'true') return;

    Array.from(track.children).forEach(card => {
        const clone = card.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
    });
    track.dataset.cloned = 'true';

    // Keep the scroll speed constant regardless of how many reviews there are
    const pixelsPerSecond = 45;
    const duration = Math.max((track.scrollWidth / 2) / pixelsPerSecond, 20);
    track.style.setProperty('--reviews-duration', `${duration}s`);
}

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initTypewriter();
    initPageTransitions();
    initReviewsMarquee();
});
