import globals from "globals";


export default [
  {
    languageOptions: { globals: globals.browser },
    files: ["**/*.js"],
    rules: {
      "no-console": "off",
      "no-unused-vars": "warn",
      "no-undef": "off",
    },
  },
];