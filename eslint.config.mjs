import globals from 'globals'

import path from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import pluginJs from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: pluginJs.configs.recommended,
})

export default [
    ...compat.extends('airbnb-base'),
    eslintConfigPrettier,
    { languageOptions: { globals: globals.node } },
    {
        files: ['**/*.js'],
        languageOptions: { sourceType: 'commonjs' },
        rules: {
            indent: 'off',
        },
    },
    {
        ignores: ['*.config.*', 'dist/*']
    },
]
