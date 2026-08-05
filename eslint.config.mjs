import { baseConfig } from '@bootcamp/eslint-config';

export default [
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/.next/**',
      '**/.turbo/**',
      '**/playgrounds/daily-coding-challenges/.db',
    ],
  },
  ...baseConfig,
];
