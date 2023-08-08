require('dotenv').config();

const express = require('express');
const app = express();

const path = require('path');

const PORT = 3000;

if (process.env.NODE_ENV !== 'development') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

const userRouter = require('./routes/userRouter');
const courseRouter = require('./routes/courseRouter');
const lessonRouter = require('./routes/lessonRouter');
const categoryRouter = require('./routes/categoryRouter');

app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/course', courseRouter);
app.use('/api/lesson', lessonRouter);
app.use('/api/category', categoryRouter);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
