// eslint.config.js
import js from "@eslint/js";

export default [
  js.configs.recommended, // Use ESLint's recommended rules
  {
    files: ["src/**/*.js"], // Apply settings to specific files
    rules: {
        "no-unused-vars": "error",
        "semi": ["warn", "always"]
    }
  }
];