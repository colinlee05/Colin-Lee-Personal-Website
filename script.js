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

// Password strength checker
document.getElementById('check-btn').addEventListener('click', function() {
    var password = document.getElementById('password-input').value;
    var result = document.getElementById('password-result');
    var strength = '';

    if (password.length === 0) {
        strength = 'Please enter a password.';
    } else if (password.length < 6) {
        strength = 'Weak: Too short (less than 6 characters).';
    } else if (password.length < 10 && !/[!@#$%^&*]/.test(password)) {
        strength = 'Medium: At least 6 characters, but no special symbols.';
    } else if (password.length >= 10 && /[!@#$%^&*]/.test(password)) {
        strength = 'Strong: 10+ characters with special symbols!';
    } else {
        strength = 'Good: Decent length, consider adding special characters.';
    }

    result.textContent = strength;
});