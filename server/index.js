require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

if (process.env.NODE_ENV !== 'development') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(
      path.join(__dirname, '../client/build', 'index.html', (error) => {
        if (error) res.status(500).send(error);
      }),
    );
  });
}

app.listen(3000, () => {
  console.log('Running');
});
