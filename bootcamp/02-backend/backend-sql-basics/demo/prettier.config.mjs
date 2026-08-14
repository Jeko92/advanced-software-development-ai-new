import baseConfig from '@bootcamp/prettier-config' with { type: 'json' };

export default {
  ...baseConfig,
  plugins: ['prettier-plugin-embed', 'prettier-plugin-sql'],
  embeddedSqlTags: ['sql'],
  language: 'sqlite',
  keywordCase: 'upper',
  overrides: [
    {
      files: ['*.sql'],
      options: {
        parser: 'sql',
      },
    },
  ],
};
