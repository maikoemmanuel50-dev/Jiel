/* ==========================================================================
   Jiel Restaurant — main.js
   Smooth scrolling, shopping cart, and WhatsApp reservation/order systems.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
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

  // Visual feedback (matches the burgundy button style)
  button.textContent = '✅ Added!';
  button.style.background = '#F5E6D3';
  button.style.color = '#5E2C2C';
  setTimeout(() => {
    button.textContent = '✚ Add to Cart';
    button.style.background = '';
    button.style.color = '';
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

  let message = '🍽️ *NEW ORDER FROM JIEL* 🍽️\n\n';
  message += `👤 *Customer:* ${name}\n`;
  message += `📞 *Phone:* ${phone}\n`;
  if (address) message += `📍 *Address:* ${address}\n`;
  message += '\n📋 *Order Details:*\n';

  cart.forEach((item) => {
    message += `- ${item.item} × ${item.quantity} = KSh ${(item.price * item.quantity).toFixed(2)}\n`;
  });

  message += `\n💰 *Total: KSh ${cartTotal.toFixed(2)}*\n`;

  if (notes) message += `\n📝 *Special Instructions:* ${notes}\n`;

  message += '\n✅ Thank you for ordering from Jiel!';

  const whatsappUrl = `https://wa.me/254715536736?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');

  cart = [];
  updateCart();
  closeCheckout();

  // Order status is initialized by the restaurant (not auto-simulated):
  // the customer is updated via WhatsApp as the order moves
  // Received → Preparing → In Transit → Delivered.
  alert('📝 Order received! The restaurant will update you on WhatsApp as your order progresses (Preparing → In Transit → Delivered).');
}

/* ==========================================================================
   RESERVATION SYSTEM - Send to WhatsApp
   ========================================================================== */

function sendReservation(event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const guests = document.getElementById('guests').value.trim();
  const specialRequests = document.getElementById('specialRequests').value.trim();

  if (!name || !phone || !date || !time) {
    alert('⚠️ Please fill in Name, Phone, Date, and Time.');
    return;
  }

  let message = '📋 *NEW RESERVATION - JIEL* 📋\n\n';
  message += `👤 *Name:* ${name}\n`;
  message += `📧 *Email:* ${email || 'Not provided'}\n`;
  message += `📞 *Phone:* ${phone}\n`;
  message += `📅 *Date:* ${date}\n`;
  message += `🕐 *Time:* ${time}\n`;
  message += `👥 *Guests:* ${guests || '1'}\n`;
  if (specialRequests) message += `📝 *Special Requests:* ${specialRequests}\n`;
  message += '\n✅ Reservation request received. We will confirm shortly!';

  const whatsappUrl = `https://wa.me/254715536736?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');

  document.getElementById('reservationSuccess').style.display = 'block';
  document.getElementById('reservationForm').reset();
}
