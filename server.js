const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Serve all static assets (HTML, JS, CSS, images) from root
app.use(express.static(path.join(__dirname)));

// Root Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Explicit Routes for Clean URLs and Direct HTML Access
app.get('/privacy', (req, res) => {
  res.sendFile(path.join(__dirname, 'privacy.html'));
});

app.get('/terms', (req, res) => {
  res.sendFile(path.join(__dirname, 'terms.html'));
});

app.get('/cookies', (req, res) => {
  res.sendFile(path.join(__dirname, 'cookies.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
