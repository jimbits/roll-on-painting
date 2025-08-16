// eslint.config.mjs
import storybook from 'eslint-plugin-storybook';
import prettierPlugin from 'eslint-plugin-prettier';
import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  {
    ignores: [
      'retired/',
      'resources/',
      'assets/',
      'docs/',
      'node_modules/',
      '.next/',
      'out/',
      '.vscode/',
      'storybook-static/',
      '.storybook/dist/',
      'dist/',
      'build/',
      'coverage/',
      '.env*',
      '**/*.d.ts',
      '*.min.js',
    ],
  },

  ...compat.extends('next/core-web-vitals'),
  ...compat.extends('next/typescript'),
  ...compat.extends('prettier'),

  ...storybook.configs['flat/recommended'],

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      prettier: prettierPlugin, // Register the prettier plugin
    },
    rules: {
      'prettier/prettier': 'error', // Now this will work
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];
