import storybook from "eslint-plugin-storybook";
import simpleImportSort from "eslint-plugin-simple-import-sort";

import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

const eslintConfig = defineConfig([...nextVitals, ...nextTs, globalIgnores([
  '.next/**',
  'out/**',
  'build/**',
  'node_modules/**',
  'next-env.d.ts',
  '.husky/**',
  'coverage/**',
  '*.config.js',
  '*.config.mjs',
]), {
  plugins: {
    'simple-import-sort': simpleImportSort,
  },
  rules: {
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
    'react/display-name': 'off',
    '@next/next/no-img-element': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-object-type': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/refs': 'off',
    'react-hooks/incompatible-library': 'off',
    'react-hooks/set-state-in-effect': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
}, ...storybook.configs["flat/recommended"], eslintConfigPrettier]);

export default eslintConfig;
