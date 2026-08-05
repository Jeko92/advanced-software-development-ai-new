import { spawn } from 'node:child_process';

const project = process.argv[2];

const projects = {
  'code-along': 'code-along/app.ts',
  'film-watchlist': 'film-watchlist/src/watchlist.ts',
  'music-library': 'music-library/src/main.ts',
  'online-shop': 'online-shop/src/main.ts',
  'recipe-book': 'recipe-book/src/recipes.ts',
};

const entry = projects[project as keyof typeof projects];

if (!entry) {
  console.log('Available projects:');
  Object.keys(projects).forEach((name) => console.log(`- ${name}`));

  process.exit(1);
}

spawn('tsx', [entry], {
  stdio: 'inherit',
});
