import express, { type Request, type Response } from 'express';
import cors from 'cors';
// import homeTemplate from './templates/home';
import nunjucks from 'nunjucks';
import fruitsData from './data/fruits.json';
import eventsData from './data/events.json';
import blogData from './data/blog.json';

const app = express();
const port = 3000;
app.use(cors());

app.set('view engine', 'njk');

nunjucks.configure('src/templates', {
  autoescape: true,
  express: app,
  watch: true,
});

app.use(express.static('public'));

// app.get('/', ( req, res ) => {
//   res.setHeader('Content-Type', 'text/html');
//   // res.send(homeTemplate('Home Site of Test Nunjucks Template'));
// });

app.get('/', (_req: Request, res: Response) => {
  res.render('home.njk', {
    title: 'Hello Nunjucks',
    mainHeading: 'From Nunjucks',
  });
});

app.get('/about', (_req, res) => {
  res.render('about.njk', { title: 'Hello Nunjucks-About' });
});

app.get('/fruits', (_req, res) => {
  // console.log(fruitsData);

  res.render('fruits.njk', {
    title: 'List of fruits',
    fruitsData,
  });
});

app.get('/events', (_req, res) => {
  res.render('events.njk', {
    title: 'Upcoming Events',
    events: eventsData,
  });
});

app.get('/blog', (_req, res) => {
  res.render('blog.njk', {
    title: 'Blog',
    posts: blogData,
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
