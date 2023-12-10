/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

export default {
  root: true,
  'extends': [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:@typescript-eslint/recommended'
  ],
  "plugins": [
    "@typescript-eslint"
  ],
  "parser": "@typescript-eslint/parser",
}
