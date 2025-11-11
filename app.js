// app.js - simple cart logic

let cart = [];

function addToCart(name, price) {
  cart.push({ name, price });
  renderCart();
}

function renderCart() {
  const el = document.getElementById('cartItems');
  if (!el) return;
  if (cart.length === 0) {
    el.innerText = 'No items yet.';
  } else {
    el.innerHTML = cart
      .map((c, i) => `<div>${i + 1}. ${c.name} - $${c.price.toFixed(2)}</div>`)
      .join('');
  }
  const total = cart.reduce((sum, c) => sum + c.price, 0);
  document.getElementById('total').innerText = total.toFixed(2);
}

async function placeOrder() {
  if (cart.length === 0) {
    alert('Add an item first');
    return;
  }

  const order = {
    items: cart,
    total: cart.reduce((s, c) => s + c.price, 0)
  };

try {
  const res = await fetch('/api/order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  });
  if (res.ok) {
    alert('Order saved! ✅');
    cart = [];
    renderCart();
  } else {
    alert('Failed to save order ❌');
  }
} catch (err) {
  alert('Server not running ❌');
}

}

// initialize display
renderCart();
