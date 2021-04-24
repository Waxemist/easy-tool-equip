module.exports = {
  parserOptions: {
    ecmaVersion: 2021,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: "module",
  },

  settings: {
    react: {
      version: "detect",
    },
  },

  plugins: ["react", "prettier"],

  rules: {
    "react/jsx-no-bind": [
      "error",
      {
        allowArrowFunctions: true,
        allowBind: false,
        ignoreRefs: true,
      },
    ],
    "react/no-did-update-set-state": "error",
    "react/react-in-jsx-scope": "error",
    "prettier/prettier": "error",
    indent: ["error", 2],
  },
}
