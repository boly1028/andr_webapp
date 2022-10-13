module.exports = {
  root: true,
  overrides: [
    {
      files: ["**/*.ts?(x)"],
      parser: "@typescript-eslint/parser",
      extends: [
        "next",
        "next/core-web-vitals",
        "eslint:recommended",
        "plugin:@next/next/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
      },
      plugins: ["@typescript-eslint"],
      rules: {
        "@typescript-eslint/ban-ts-ignore": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "no-extra-boolean-cast": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "no-empty-pattern": "off",
        "no-prototype-builtins": "off",
        "no-fallthrough":"off"
      },
    },
  ],
};
