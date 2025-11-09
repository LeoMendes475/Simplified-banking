if (typeof global.structuredClone !== 'function') {
  global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj))
}

import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginPrettier from 'eslint-plugin-prettier'
import configPrettier from 'eslint-config-prettier'

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  configPrettier,

  {
    files: ['src/**/*.ts'],

    plugins: {
      prettier: pluginPrettier,
    },

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },

    rules: {
      quotes: ['error', 'single'],
      indent: ['error', 2],
      semi: ['error', 'never'],
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          tabWidth: 2,
          useTabs: false,
          semi: false,
          endOfLine: 'auto',
        },
      ],
    },
  },
]
