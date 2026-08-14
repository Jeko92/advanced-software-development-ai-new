import express, { type Request, type Response } from 'express';
import nunjucks from 'nunjucks';
import eventsData from './data/events.json';

const app = express();
const port = 3000;

nunjucks.configure('src/views', {
  autoescape: true,
  express: app,
  watch: true,
});

app.set('view engine', 'njk');
app.use(express.static('public'));

app.get('/', (_req: Request, res: Response) => {
  res.render('home.njk', { title: 'Event Hub Home' });
});

app.get('/events', (_req: Request, res: Response) => {
  // console.log(eventsData);
  res.render('events.njk', { title: 'Event Hub Events', eventsData });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
