import { Router } from 'express';
import { getAllColors, getColorById, getRandomColor } from '../colorService';

const colors: Router = Router();

colors.get('/', (_req, res) => {
  const colors = getAllColors();
  res.render('colors.njk', { title: 'Colors', colors });
});

colors.get('/all', (_req, res) => {
  const colors = getAllColors();

  if (colors.length === 0) {
    res.status(400).send('No colors found');
    return;
  }

  res.json(colors);
});

colors.get('/random', function (_req, res) {
  const randomColor = getRandomColor();
  res.json(randomColor);
});

colors.get('/:id', function (req, res) {
  const { id } = req.params;
  const numId = Number(id);

  if (isNaN(numId)) {
    res.status(400).json({ message: 'bad request' });
    return;
  }

  const color = getColorById(numId);

  if (!color) {
    res.status(404).json({ message: 'Color not found' });
    return;
  }

  res.json(color);
});

export default colors;
