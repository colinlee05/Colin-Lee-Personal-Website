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

// Form Submission with AJAX to stay on page
const contactForm = document.querySelector('#contact form');
if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default navigation

    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    // Clear previous message
    const existingMsg = contactForm.querySelector('.form-message');
    if (existingMsg) existingMsg.remove();

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
      });

      console.log('Response status:', response.status); // Debug: Check in console (F12)

      if (response.ok) {
        const data = await response.json();
        console.log('Response data:', data); // Debug: See what Worker returns
        if (data.success || response.status === 200) { // Fallback to status 200 for success
          showFormMessage('Message successfully sent! 👍', 'success');
          contactForm.reset();
        } else {
          showFormMessage(data.error || 'Message not delivered - probably the captcha failed. Please try again. ⚠️', 'error');
        }
      } else {
        const data = await response.json();
        showFormMessage(data.error || 'Message not delivered - probably the captcha failed. Please try again. ⚠️', 'error');
      }
    } catch (error) {
      console.error('Fetch error:', error); // Debug: See network issues
      showFormMessage('Message not delivered - probably the captcha failed. Please try again. ⚠️', 'error');
    } finally {
      submitButton.disabled = false;
    }
  });
}

// Helper to show inline message above the form
function showFormMessage(text, type) {
  const message = document.createElement('div');
  message.classList.add('form-message', type);
  message.textContent = text;
  contactForm.insertBefore(message, contactForm.firstChild);
  setTimeout(() => message.style.opacity = '0', 5000); // Fade out after 5s
  setTimeout(() => message.remove(), 5300); // Remove after fade
}

// Mobile Header Scroll Hide
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop) {
    // Scrolling down - hide header
    header.classList.add('hidden');
  } else {
    // Scrolling up - show header
    header.classList.remove('hidden');
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For mobile Safari bounce
}, { passive: true }); // Improves performance
