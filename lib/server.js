import express from 'express';
import { config } from 'dotenv';

config();

const app = express()
  .use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (_req, res) => {
  res.render('index');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.info(`Server running on port ${PORT}`));
