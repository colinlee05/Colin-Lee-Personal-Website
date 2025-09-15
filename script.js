// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', !expanded);
  navLinks.classList.toggle('active');
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  // Optional: Save preference to localStorage
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
}

// Fun Fact Button
const funFactBtn = document.getElementById('fun-fact-btn');
const funFact = document.getElementById('fun-fact');

funFactBtn.addEventListener('click', () => {
  funFact.classList.toggle('hidden');
});

// Password Strength Analyzer
const passwordInput = document.getElementById('password-input');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');

function assessPasswordStrength(password) {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.match(/[a-z]/)) strength++;
  if (password.match(/[A-Z]/)) strength++;
  if (password.match(/[0-9]/)) strength++;
  if (password.match(/[^a-zA-Z0-9]/)) strength++;

  switch (strength) {
    case 0:
    case 1:
      return { level: 'Weak', color: 'red' };
    case 2:
    case 3:
      return { level: 'Medium', color: 'orange' };
    case 4:
    case 5:
      return { level: 'Strong', color: 'green' };
    default:
      return { level: 'Weak', color: 'red' };
  }
}

passwordInput.addEventListener('input', () => {
  const password = passwordInput.value;
  const { level, color } = assessPasswordStrength(password);
  
  strengthBar.style.width = `${(level === 'Weak' ? 33 : level === 'Medium' ? 66 : 100)}%`;
  strengthBar.style.backgroundColor = color;
  strengthText.textContent = `Strength: ${level}`;
  strengthText.style.color = color;
});

// Back to Top Button
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.style.display = 'block';
  } else {
    backToTop.style.display = 'none';
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Form Submission with AJAX for better UX (success/error handling)
const contactForm = document.querySelector('#contact form');
if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.disabled = true; // Disable button during submission

    // Clear any previous messages
    const existingMsg = contactForm.querySelector('.form-message');
    if (existingMsg) existingMsg.remove();

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        showFormMessage('Error: ' + errorText, 'red'); // Show error inline
      } else {
        showFormMessage('Message sent successfully! Thanks for reaching out—I\'ll reply soon.', 'green');
        contactForm.reset(); // Clear form fields
      }
    } catch (error) {
      showFormMessage('Submission failed: ' + error.message, 'red');
    } finally {
      submitButton.disabled = false; // Re-enable button
      // Scroll to contact section (smoothly)
      document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Helper function to show success/error messages
function showFormMessage(text, color) {
  const contactContent = document.querySelector('#contact .content');
  const message = document.createElement('p');
  message.classList.add('form-message');
  message.textContent = text;
  message.style.color = color;
  message.style.fontWeight = 'bold';
  message.style.marginTop = '10px';
  message.style.padding = '10px';
  message.style.backgroundColor = color === 'green' ? '#d4edda' : '#f8d7da';
  message.style.borderRadius = '4px';
  contactContent.insertBefore(message, contactContent.querySelector('form'));
}

// Check for success/error in URL on load (fallback for direct access)
window.onload = function() {
  const params = new URLSearchParams(window.location.search);
  if (params.has('success') && params.get('success') === 'true') {
    showFormMessage('Message sent successfully! Thanks for reaching out—I\'ll reply soon.', 'green');
  } else if (params.has('error')) {
    showFormMessage('Error: ' + params.get('error'), 'red');
  }
  // Clear URL params
  window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
};
