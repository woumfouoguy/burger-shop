// server.js - backend for saving orders

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.post('/api/order', (req, res) => {
  const order = req.body;
  order.time = new Date().toISOString();

  fs.appendFile('orders.json', JSON.stringify(order) + '\n', err => {
    if (err) {
      console.error('Failed to save order:', err);
      return res.status(500).send('error');
    }
    console.log('Order saved:', order);
    res.send({ status: 'ok' });
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
