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
        }, 200); // Match the new fast fadeOutPage animation duration
    });
}

// Placeholder for future interactivity 