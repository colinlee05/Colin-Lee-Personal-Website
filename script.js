// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !expanded);
    navLinks.classList.toggle('active');
  });
}

// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
if (darkModeToggle) {
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // Optional: Save preference to localStorage
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });
}

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
}

// Fun Fact Button
const funFactBtn = document.getElementById('fun-fact-btn');
const funFact = document.getElementById('fun-fact');

if (funFactBtn && funFact) {
  funFactBtn.addEventListener('click', () => {
    funFact.classList.toggle('hidden');
  });
}

// Password Strength Analyzer
const passwordInput = document.getElementById('password-input');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');

// UPDATED: More robust password strength logic
function assessPasswordStrength(password) {
  let strength = 0;
  const passLength = password.length;

  // 1. Base strength on length
  if (passLength < 8) {
      strength = 0;
  } else if (passLength < 12) {
      strength = 1;
  } else {
      strength = 2;
  }

  // 2. Add points for complexity (only if length is okay)
  if (strength > 0) {
      if (password.match(/[a-z]/)) strength++;
      if (password.match(/[A-Z]/)) strength++;
      if (password.match(/[0-9]/)) strength++;
      if (password.match(/[^a-zA-Z0-9]/)) strength++; // Special char
  }

  // 3. Determine level
  // Note: Now strength can go up to 6 (2 for length + 4 for complexity)
  switch (strength) {
      case 0:
      case 1:
          return { level: 'Weak', color: 'red', width: 25 };
      case 2:
      case 3:
          return { level: 'Medium', color: 'orange', width: 66 };
      case 4:
      case 5:
      case 6:
          return { level: 'Strong', color: 'green', width: 100 };
      default:
          return { level: 'Weak', color: 'red', width: 0 };
  }
}

// UPDATED: Event listener uses new logic and handles empty state
if (passwordInput && strengthBar && strengthText) {
  passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    
    if (password.length === 0) {
        strengthBar.style.width = '0%';
        strengthText.textContent = '';
        return;
    }

    const { level, color, width } = assessPasswordStrength(password);
    
    strengthBar.style.width = `${width}%`;
    strengthBar.style.backgroundColor = color;
    strengthText.textContent = `Strength: ${level}`;
    strengthText.style.color = color;
  });
}

// Back to Top Button
const backToTop = document.getElementById('back-to-top');

if (backToTop) {
  // UPDATED: Uses .visible class for smooth fade
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

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

      if (response.ok) {
        // Try to parse JSON, but fall back if it's not JSON
        try {
            const data = await response.json();
            if (data.success) {
                showFormMessage('Message successfully sent! 👍', 'success');
                contactForm.reset();
            } else {
                 showFormMessage('Message not delivered. Please try again. ⚠️', 'error');
            }
        } catch (jsonError) {
            // If worker returns simple 200 OK without JSON
            showFormMessage('Message successfully sent! 👍', 'success');
            contactForm.reset();
        }
      } else {
        showFormMessage('Message not delivered. Please try again. ⚠️', 'error');
      }
    } catch (error) {
      showFormMessage('Message not delivered. Please try again. ⚠️', 'error');
    } finally {
      submitButton.disabled = false;
      // Reset Cloudflare Turnstile widget
      if (window.turnstile) {
        window.turnstile.reset();
      }
    }
  });
}

// Helper to show inline message
function showFormMessage(text, type) {
  const message = document.createElement('div');
  message.classList.add('form-message', type);
  message.textContent = text;
  
  // *** CHANGED THIS LINE ***
  // contactForm.insertBefore(message, contactForm.firstChild);
  // *** TO THIS LINE ***
  contactForm.appendChild(message);
  
  setTimeout(() => {
    message.style.opacity = '0';
  }, 5000); // Start fade out after 5s
  setTimeout(() => {
    message.remove();
  }, 5300); // Remove after fade
}

// Mobile Header Scroll Hide
let lastScrollTop = 0;
const header = document.querySelector('header');

if (header) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Only apply this logic on smaller screens (matches your media query)
    if (window.innerWidth <= 768) {
      if (scrollTop > lastScrollTop && scrollTop > 120) { // 120 is your mobile header height
        // Scrolling down - hide header
        header.classList.add('hidden');
      } else {
        // Scrolling up - show header
        header.classList.remove('hidden');
      }
    } else {
      // On desktop, always remove the hidden class
      header.classList.remove('hidden');
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For mobile Safari bounce
  }, { passive: true }); // Improves performance
}
