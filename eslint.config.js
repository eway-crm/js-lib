const ewayConfig = require("@eway-crm/eslint-config");

module.exports = [
    ...ewayConfig,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: __dirname,
            },
        },
    },
    {
        files: ["**/ApiConnection.ts"],
        rules: {
            "@typescript-eslint/prefer-promise-reject-errors": "off",
            "@typescript-eslint/only-throw-error": "off",
        },
    },
    {
        ignores: ["**/__tests__/**"],
    },
];
