export default [
  {
    files: ['**/*.js', '**/*.jsx'],
    rules: {},
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // Basic rules for TypeScript files
      'no-console': 'off',
      'no-unused-vars': 'off',
    },
  },
  {
    ignores: [
      '**/dist',
      '**/node_modules',
      '**/coverage',
      '**/webpack.config.js',
    ],
  },
];
