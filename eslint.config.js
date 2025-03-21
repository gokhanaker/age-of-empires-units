// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      semi: ["error", "always"], // Require semicolons
      eqeqeq: ["error", "always"], // Enforce strict equality (===)
      "no-console": ["error", { allow: ["warn", "error"] }], // No console log statements
      "no-debugger": "error", // No debugger statements
      "prefer-const": "error", // Prefer const over let when possible
      "@typescript-eslint/no-explicit-any": "warn", // Avoid using the any type
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);
