/* ==========================================================================
   Jiel Restaurant — main.js
   Smooth scrolling, reservation validation, and the shopping cart system.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('reservation-form');
  const message = document.getElementById('form-message');

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

/* ==========================================================================
   JIEL SHOPPING CART SYSTEM
   ========================================================================== */

let cart = [];
let cartTotal = 0;

function addToCart(button) {
  const item = button.getAttribute('data-item');
  const price = parseFloat(button.getAttribute('data-price'));

  const existingItem = cart.find((i) => i.item === item);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ item, price, quantity: 1 });
  }

  updateCart();

  // Visual feedback
  button.textContent = '✅ Added!';
  button.style.background = '#5E2C2C';
  setTimeout(() => {
    button.textContent = '➕ Add to Cart';
    button.style.background = '#C9A96E';
  }, 1500);
}

function updateCart() {
  const cartItemsDiv = document.getElementById('cartItems');
  const cartTotalDiv = document.getElementById('cartTotal');
  const cartCountSpan = document.getElementById('cartCount');

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p style="color: #999; text-align: center; padding: 40px 0;">Your cart is empty</p>';
    cartTotalDiv.textContent = 'Total: KSh 0.00';
    cartCountSpan.textContent = '0';
    return;
  }

  let html = '';
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    html += `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #eee;">
        <div>
          <strong>${item.item}</strong>
          <span style="display: block; font-size: 14px; color: #666;">KSh ${item.price} × ${item.quantity}</span>
        </div>
        <div>
          <span style="font-weight: bold; color: #5E2C2C;">KSh ${itemTotal}</span>
          <button onclick="removeFromCart(${index})" style="background: #ff4444; color: white; border: none; border-radius: 50%; width: 24px; height: 24px; cursor: pointer; margin-left: 10px; font-size: 14px;">✕</button>
        </div>
      </div>
    `;
  });

  cartItemsDiv.innerHTML = html;
  cartTotalDiv.textContent = 'Total: KSh ' + total.toFixed(2);
  cartCountSpan.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartTotal = total;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function toggleCart() {
  const sidebar = document.getElementById('cartSidebar');
  if (sidebar.style.right === '0px') {
    sidebar.style.right = '-400px';
  } else {
    sidebar.style.right = '0px';
  }
}

function checkout() {
  if (cart.length === 0) {
    alert('🛒 Your cart is empty! Add some items first.');
    return;
  }

  document.getElementById('cartSidebar').style.right = '-400px';
  document.getElementById('checkoutModal').style.display = 'flex';

  let itemsHtml = '';
  cart.forEach((item) => {
    itemsHtml += `<div>${item.item} × ${item.quantity} = KSh ${(item.price * item.quantity).toFixed(2)}</div>`;
  });
  document.getElementById('checkoutItems').innerHTML = itemsHtml;
  document.getElementById('checkoutTotal').textContent = 'Total: KSh ' + cartTotal.toFixed(2);
}

function closeCheckout() {
  document.getElementById('checkoutModal').style.display = 'none';
}

function clearCart() {
  if (confirm('Clear your entire cart?')) {
    cart = [];
    updateCart();
    closeCheckout();
    alert('🗑️ Cart has been cleared.');
  }
}

function sendOrder(event) {
  event.preventDefault();

  const name = document.getElementById('customerName').value.trim();
  const phone = document.getElementById('customerPhone').value.trim();
  const address = document.getElementById('customerAddress').value.trim();
  const notes = document.getElementById('customerNotes').value.trim();

  if (!name || !phone) {
    alert('⚠️ Please enter your name and phone number.');
    return;
  }

  let message = '🍽️ *NEW ORDER FROM JIEL* 🍽️%0A%0A';
  message += `👤 *Customer:* ${name}%0A`;
  message += `📞 *Phone:* ${phone}%0A`;
  if (address) message += `📍 *Address:* ${address}%0A`;
  message += `%0A📋 *Order Details:*%0A`;

  cart.forEach((item) => {
    message += `- ${item.item} × ${item.quantity} = KSh ${(item.price * item.quantity).toFixed(2)}%0A`;
  });

  message += `%0A💰 *Total: KSh ${cartTotal.toFixed(2)}*%0A`;

  if (notes) message += `%0A📝 *Special Instructions:* ${notes}%0A`;

  message += `%0A✅ Thank you for ordering from Jiel!`;

  const whatsappUrl = `https://wa.me/254715536736?text=${message}`;
  window.open(whatsappUrl, '_blank');

  cart = [];
  updateCart();
  closeCheckout();

  // Order status is initialized by the restaurant (not auto-simulated):
  // the customer is updated via WhatsApp as the order moves
  // Received → Preparing → In Transit → Delivered.
  alert('📝 Order received! The restaurant will update you on WhatsApp as your order progresses (Preparing → In Transit → Delivered).');
}
