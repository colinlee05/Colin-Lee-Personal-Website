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

// Success message after form submission (wrapped in onload for reliability)
window.onload = function() {
  if (window.location.search.includes('success=true')) {
    const contactSection = document.querySelector('#contact .content');
    if (contactSection) {
      const successMsg = document.createElement('p');
      successMsg.textContent = 'Message sent successfully! Thanks for reaching out—I\'ll reply soon.';
      successMsg.style.color = 'green';
      successMsg.style.fontWeight = 'bold';
      successMsg.style.marginTop = '10px';
      successMsg.style.padding = '10px';
      successMsg.style.backgroundColor = '#d4edda';
      successMsg.style.borderRadius = '4px';
      contactSection.insertBefore(successMsg, contactSection.querySelector('form'));
      
      // Clear URL param for clean refresh
      window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
      
      // Force scroll to #contact
      document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    }
  }
};
