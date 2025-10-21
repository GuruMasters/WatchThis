import nx from '@nx/eslint-plugin';
import baseConfig from '../eslint.config.mjs';

export default [
  ...baseConfig,
  ...nx.configs['flat/react'],
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {
      '@nx/enforce-module-boundaries': 'off', // Temporarily disabled for working imports
      '@typescript-eslint/no-empty-function': 'warn', // Allow empty functions for now
    },
  },
];
