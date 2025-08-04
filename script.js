document.addEventListener('DOMContentLoaded', () => {
    // EmailJS Initialization (Replace with your Public Key)
    emailjs.init({
        publicKey: 'YOUR_EMAILJS_PUBLIC_KEY', // From EmailJS dashboard
    });

    // Dark Mode Toggle with LocalStorage
    const toggleButton = document.getElementById('dark-mode-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        toggleButton.textContent = 'Toggle Light Mode';
    }
    toggleButton.addEventListener('click', () => {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        document.body.setAttribute('data-theme', isDark ? '' : 'dark');
        toggleButton.textContent = isDark ? 'Toggle Dark Mode' : 'Toggle Light Mode';
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
    });

    // Fun Fact Toggle
    document.getElementById('fun-fact-btn').addEventListener('click', (e) => {
        const funFact = document.getElementById('fun-fact');
        funFact.classList.toggle('hidden');
        e.target.textContent = funFact.classList.contains('hidden') ? 'Fun Fact' : 'Hide Fun Fact';
    });

    // Password Strength Analyzer (Real-time)
    const passwordInput = document.getElementById('password-input');
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');
    passwordInput.addEventListener('input', () => {
        const password = passwordInput.value;
        let strength = 0;
        if (password.length > 0) strength += 25;
        if (password.length >= 6) strength += 25;
        if (password.length >= 10) strength += 25;
        if (/[!@#$%^&*]/.test(password)) strength += 25;

        strengthBar.style.width = `${strength}%`;
        let color = '#ff4d4d'; // Weak
        let text = 'Weak';
        if (strength > 25) { color = '#ffcc00'; text = 'Fair'; }
        if (strength > 50) { color = '#66cc00'; text = 'Good'; }
        if (strength > 75) { color = '#00cc00'; text = 'Strong'; }
        strengthBar.style.backgroundColor = color;
        strengthText.textContent = text;
    });

    // Header Scroll Behavior
    let lastScrollTop = 0;
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        header.classList.toggle('hidden', scrollTop > lastScrollTop && scrollTop > header.offsetHeight);
        lastScrollTop = Math.max(scrollTop, 0);
    });

    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', navLinks.classList.contains('active'));
    });

    // Contact Form Submission with EmailJS
    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        emailjs.sendForm('YOUR_EMAILJS_SERVICE_ID', 'YOUR_EMAILJS_TEMPLATE_ID', e.target) // Replace with your Service ID and Template ID
            .then(() => {
                alert('Message sent successfully!');
                e.target.reset(); // Clear form
            }, (error) => {
                alert('Failed to send message. Please try again.');
                console.error('EmailJS Error:', error);
            });
    });
});
