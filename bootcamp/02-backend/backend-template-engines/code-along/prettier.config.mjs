import baseConfig from '@bootcamp/prettier-config' with { type: 'json' };

export default {
  ...baseConfig,
  plugins: ['prettier-plugin-jinja-template'],
  overrides: [
    {
      files: ['*.html'],
      options: {
        parser: 'jinja-template',
      },
    },
  ],
};
