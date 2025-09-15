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

// Form Submission with AJAX and Cute Modal Popups
const contactForm = document.querySelector('#contact form');
if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default submission

    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.disabled = true; // Disable during submit

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        showModal('Message successfully sent!', 'success', '👍');
        contactForm.reset(); // Clear form
      } else {
        const errorData = await response.json();
        showModal(errorData.error || 'Message was not delivered—probably because the captcha isn\'t complete. Please try again.', 'error', '⚠️');
      }
    } catch (error) {
      showModal('Message was not delivered—probably because the captcha isn\'t complete. Please try again.', 'error', '⚠️');
    } finally {
      submitButton.disabled = false;
    }
  });
}

// Function for Cute Modal Popup
function showModal(message, type, emoji) {
  const modal = document.getElementById('form-modal');
  const overlay = document.getElementById('modal-overlay');
  const modalMessage = document.getElementById('modal-message');
  const closeBtn = document.getElementById('modal-close');

  if (!modal || !overlay) return;

  modalMessage.textContent = message;
  modalMessage.setAttribute('data-emoji', emoji);
  modal.classList.remove('success', 'error');
  modal.classList.add(type);
  modal.style.display = 'block';
  overlay.style.display = 'block';

  // Close on click
  closeBtn.onclick = hideModal;
  overlay.onclick = hideModal;

  // Auto-close after 5 seconds
  setTimeout(hideModal, 5000);
}

function hideModal() {
  const modal = document.getElementById('form-modal');
  const overlay = document.getElementById('modal-overlay');
  if (modal) modal.style.display = 'none';
  if (overlay) overlay.style.display = 'none';
}
