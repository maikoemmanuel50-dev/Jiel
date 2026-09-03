/* ==========================================================================
   Jiel Restaurant — main.js
   Reservation form validation, smooth scrolling, and chatbot placeholder.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('reservation-form');
  const message = document.getElementById('form-message');
  const askJiel = document.getElementById('ask-jiel');

  /* ---- Smooth scrolling for internal anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---- Chatbot placeholder (later connects to the local Harness AI) ---- */
  if (askJiel) {
    askJiel.addEventListener('click', () => {
      console.log('Chatbot triggered');
    });
  }

  /* ---- Reservation form validation ---- */
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const missing = [];
      if (!name) missing.push('Name');
      if (!email) {
        missing.push('Email');
      } else if (!emailRegex.test(email)) {
        message.className = 'error';
        message.textContent = 'Please enter a valid email address.';
        return;
      }
      if (!phone) missing.push('Phone');
      if (!date) missing.push('Date');
      if (!time) missing.push('Time');

      if (missing.length > 0) {
        message.className = 'error';
        message.textContent = 'Please fill in: ' + missing.join(', ') + '.';
        return;
      }

      message.className = 'success';
      message.textContent = 'Thank you! Your reservation request has been sent.';
      form.reset();
      document.getElementById('guests').value = '2';
    });
  }
});
