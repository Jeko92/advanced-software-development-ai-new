import express, { type Request, type Response } from 'express';

const app = express();
const port = 3000;
app.use(express.json());

interface Bookmark {
  id: number;
  url: string;
  title: string;
  tag?: string;
}

const bookmarks: Bookmark[] = [
  { id: 1, url: 'https://expressjs.com', title: 'Express.js', tag: 'node' },
  {
    id: 2,
    url: 'https://typescriptlang.org',
    title: 'TypeScript',
    tag: 'typescript',
  },
  { id: 3, url: 'https://developer.mozilla.org', title: 'MDN Web Docs' },
];

let nextId = Math.max(...bookmarks.map((b) => b.id)) + 1;

app.get('/', (_req: Request, res: Response) => {
  res.status(200).send('Bookmark Manager API');
});

app.get('/bookmarks', (req: Request, res: Response) => {
  const { tag } = req.query;

  const result = tag ? bookmarks.filter((b) => b.tag === tag) : bookmarks;

  res.status(200).json(result);
});

app.get('/bookmarks/:id', (req: Request, res: Response) => {
  const numId = Number(req.params['id']);

  if (isNaN(numId)) {
    res.status(400).json({ error: 'Bad request' });
    return;
  }

  const bookmark = bookmarks.find((b) => b.id === numId);

  if (!bookmark) {
    res.status(404).json({ error: 'Bookmark not found' });
    return;
  }

  res.status(200).json(bookmark);
});

app.post('/bookmarks', (req: Request, res: Response) => {
  const { url, title, tag } = req.body;

  if (!url) {
    res.status(400).json({ error: 'Missing required field: url' });
    return;
  }

  if (!title) {
    res.status(400).json({ error: 'Missing required field: title' });
    return;
  }

  const isDuplicate = bookmarks.some((b) => b.url === url);

  if (isDuplicate) {
    res.status(409).json({ error: 'Bookmark with this url already exists' });
    return;
  }

  const bookmark: Bookmark = {
    id: nextId++,
    url,
    title,
    tag,
  };

  bookmarks.push(bookmark);
  res.status(201).json(bookmark);
});

app.patch('/bookmarks/:id', (req: Request, res: Response) => {
  const numId = Number(req.params['id']);

  if (isNaN(numId)) {
    res.status(400).json({ error: 'Bad request' });
    return;
  }

  const index = bookmarks.findIndex((b) => b.id === numId);

  if (index === -1) {
    res.status(404).json({ error: 'Bookmark not found' });
    return;
  }

  const updates: Partial<Bookmark> = { ...req.body };
  delete updates.id;

  bookmarks[index] = {
    ...bookmarks[index],
    ...updates,
  } as Bookmark;

  res.status(200).json(bookmarks[index]);
});

app.put('/bookmarks/:id', (req: Request, res: Response) => {
  const numId = Number(req.params['id']);

  if (isNaN(numId)) {
    res.status(400).json({ error: 'Bad request' });
    return;
  }

  const index = bookmarks.findIndex((b) => b.id === numId);

  if (index === -1) {
    res.status(404).json({ error: 'Bookmark not found' });
    return;
  }

  const replacement: Partial<Bookmark> = { ...req.body };
  delete replacement.id;

  bookmarks[index] = {
    id: numId,
    ...replacement,
  } as Bookmark;

  res.status(200).json(bookmarks[index]);
});

app.delete('/bookmarks/:id', (req: Request, res: Response) => {
  const numId = Number(req.params['id']);

  if (isNaN(numId)) {
    res.status(400).json({ error: 'Bad request' });
    return;
  }

  const index = bookmarks.findIndex((b) => b.id === numId);

  if (index === -1) {
    res.status(404).json({ error: 'Bookmark not found' });
    return;
  }

  bookmarks.splice(index, 1);

  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
