module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: "standard-with-typescript",
  overrides: [
    {
      env: {
        node: true
      },
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        sourceType: "script"
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    project: "./tsconfig.json"
  },
  ignorePatterns: ["node_modules/", "dist/", "build/", "docs/"],
  rules: {
    // Allow double quotes for strings
    "@typescript-eslint/quotes": [2, "double"],
    // Allow extra semicolons
    "@typescript-eslint/semi": [2, "always"],
    // allow no spaces after function
    "@typescript-eslint/space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        named: "never",
        asyncArrow: "always"
      }
    ],
    // use type instead of interface
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    // disable no semi
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        multiline: {
          delimiter: "semi",
          requireLast: true
        },
        singleline: {
          delimiter: "semi",
          requireLast: false
        }
      }
    ]
  }
};
