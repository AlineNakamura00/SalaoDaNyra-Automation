require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Routes
app.get('/api/status', (req, res) => {
  res.json({ message: 'Servidor do Salão da Nyra está funcionando!' });
});

// Server initialization
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
