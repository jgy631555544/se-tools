module.exports = {
  extends: [
    "airbnb",
    "airbnb/hooks",
    "prettier",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  env: {
    browser: true,
    node: true,
    amd: true,
    jest: true,
    es6: true,
  },
  globals: {
    I18N: true,
    AMap: true,
    System: true,
    AMapLoader: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["react", "prettier", "import", "@typescript-eslint"],
  settings: {
    react: {
      version: "^16.10.2",
    },
    "import/resolver": "webpack",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "@typescript-eslint/no-unused-vars": [2, { args: "none" }],
        "no-unused-expressions": "off",
        "@typescript-eslint/no-unused-expressions": 2,
      },
    },
    {
      files: ["*.config.ts"],
      rules: {
        "import/no-extraneous-dependencies": 0,
      },
    },
  ],
  rules: {
    indent: 0,
    "import/extensions": 0,
    "no-plusplus": 0,
    "no-param-reassign": 0,
    "linebreak-style": 0,
    "react/prop-types": 0,
    "react/no-array-index-key": 0,
    "react/jsx-filename-extension": 0,
    "react/destructuring-assignment": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/anchor-has-content": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "jsx-a11y/label-has-for": 0,
    "prettier/prettier": 2,
  },
};
