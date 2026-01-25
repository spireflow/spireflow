import storybook from "eslint-plugin-storybook";

import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

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
  rules: {
    'react/display-name': 'off',
    '@next/next/no-img-element': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-object-type': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'react-hooks/exhaustive-deps': 'off',
    'react-hooks/refs': 'off',
    'react-hooks/incompatible-library': 'off',
    'react-hooks/set-state-in-effect': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
}, ...storybook.configs["flat/recommended"]]);

export default eslintConfig;
