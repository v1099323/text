// Ваш серверный код

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));
app.use(cors());

let comments = [];

// Проверяем существование файла comments.json и загружаем данные
if (fs.existsSync('comments.json')) {
  const data = fs.readFileSync('comments.json');
  comments = JSON.parse(data);
}

app.post('/postComment', (req, res) => {
  const newComment = req.body.comment;
  comments.push(newComment);

  // Сохраняем обновленные комментарии в файл comments.json
  fs.writeFileSync('comments.json', JSON.stringify(comments));

  res.status(200).json({ message: 'Comment added successfully' });
});

app.put('/comments.json', (req, res) => {
  // Обрабатываем PUT-запрос (если необходимо)
  res.status(200).json({ message: 'PUT request handled successfully' });
});

app.get('/getComments', (req, res) => {
  const lastComments = comments.slice(Math.max(comments.length - 10, 0));
  res.status(200).json(lastComments);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
