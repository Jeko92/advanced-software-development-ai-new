import baseConfig from '@bootcamp/prettier-config' with { type: 'json' };

export default {
  ...baseConfig,
  plugins: ['prettier-plugin-sql', 'prettier-plugin-embed'],
  overrides: [
    {
      files: ['*.sql'],
      options: {
        parser: 'sql',
      },
    },
  ],
};
