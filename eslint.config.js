if (typeof globalThis.structuredClone !== 'function') {
  globalThis.structuredClone = (obj) => JSON.parse(JSON.stringify(obj))
}

import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginPrettier from 'eslint-plugin-prettier'
import configPrettier from 'eslint-config-prettier'
import js from '@eslint/js'
import globals from 'globals'

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  configPrettier, // Desativa regras conflitantes do ESLint

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
      globals: globals.node
    },

    rules: {
      // REMOVIDO: indent, quotes, semi (o Prettier cuida disso)
      
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