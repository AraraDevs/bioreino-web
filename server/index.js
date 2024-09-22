require('dotenv').config();

const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());
const routes = require('./routes/index');
routes.forEach((route) => app.use('/api', route));

const path = require('path');
const PORT = 3000;

if (process.env.NODE_ENV !== 'development') {
  app.use(express.static(path.resolve('client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client/dist/index.html'));
  });
}

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
