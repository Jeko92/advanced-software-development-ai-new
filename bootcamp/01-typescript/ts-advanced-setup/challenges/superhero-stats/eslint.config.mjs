import { baseConfig } from '@bootcamp/eslint-config';

export default [
  ...baseConfig,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['eslint.config.mjs'],
        },
      },
    },
  },
];
