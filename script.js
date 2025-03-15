// Ensure DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Fun fact button
    document.getElementById('fun-fact-btn').addEventListener('click', function() {
        var funFact = document.getElementById('fun-fact');
        if (funFact.classList.contains('hidden')) {
            funFact.classList.remove('hidden');
            this.textContent = 'Hide Fun Fact';
        } else {
            funFact.classList.add('hidden');
            this.textContent = 'Show Fun Fact';
        }
    });

    // Password strength checker with bar
    document.getElementById('check-btn').addEventListener('click', function() {
        var password = document.getElementById('password-input').value;
        var bar = document.getElementById('strength-bar');
        var strength = 0;

        if (password.length === 0) {
            strength = 0;
        } else if (password.length < 6) {
            strength = 25;
        } else if (password.length < 10 && !/[!@#$%^&*]/.test(password)) {
            strength = 50;
        } else if (password.length >= 10 && /[!@#$%^&*]/.test(password)) {
            strength = 100;
        } else {
            strength = 75;
        }

        bar.style.width = strength + '%';
        bar.style.backgroundColor = strength <= 25 ? '#ff4d4d' : strength <= 50 ? '#ffcc00' : strength <= 75 ? '#66cc00' : '#00cc00';
    });

    // Show code button
    document.getElementById('code-btn').addEventListener('click', function() {
        var codeDisplay = document.getElementById('code-display');
        if (codeDisplay.classList.contains('hidden')) {
            codeDisplay.classList.remove('hidden');
            this.textContent = 'Hide Code';
        } else {
            codeDisplay.classList.add('hidden');
            this.textContent = 'Show Code';
        }
    });

    // Dark mode toggle
    const toggleButton = document.getElementById('dark-mode-toggle');
    toggleButton.addEventListener('click', function() {
        const currentTheme = document.body.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.body.removeAttribute('data-theme');
            toggleButton.textContent = 'Toggle Dark Mode';
        } else {
            document.body.setAttribute('data-theme', 'dark');
            toggleButton.textContent = 'Toggle Light Mode';
        }
    });

    // Scroll behavior for header
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
            // Scrolling down and past header height
            header.classList.add('hidden');
        } else {
            // Scrolling up or at top
            header.classList.remove('hidden');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Prevent negative scroll
    });
});