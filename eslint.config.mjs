import eslintRecommended from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import angularEslint from '@angular-eslint/eslint-plugin';
import angularTemplateEslint from '@angular-eslint/eslint-plugin-template';
import typescriptParser from '@typescript-eslint/parser';
import angularTemplateParser from '@angular-eslint/template-parser';

export default [
    {
        ignores: ['**/dist'],
    },
    // Configuración base para JavaScript y TypeScript
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        // Incluir eslint:recommended
        ...eslintRecommended.configs.recommended,
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    decorators: true
                }
            }
        },
        // Incluir plugin:@typescript-eslint/recommended
        plugins: {
            '@typescript-eslint': typescriptEslint,
            '@angular-eslint': angularEslint, // Añadir el plugin de Angular
        },
        rules: {
            ...typescriptEslint.configs.recommended.rules,
            'space-in-parens': ['error', 'always'],
            'array-bracket-spacing': ['error', 'always'],
            'object-curly-spacing': ['error', 'always'],
            '@typescript-eslint/no-var-requires': 'off',
            '@typescript-eslint/no-unused-vars': 'warn'
        },
    },
    // Configuración específica para TypeScript y Angular
    {
        files: ['**/*.ts'],
        rules: {
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: 'app',
                    style: 'camelCase',
                },
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'app',
                    style: 'kebab-case',
                },
            ],
        },
    },
    // Configuración específica para archivos de test
    {
        files: ['**/*.spec.ts'],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            'space-in-parens': ['error', 'always'],
            'array-bracket-spacing': ['error', 'always'],
            'object-curly-spacing': ['error', 'always'],
        },
    },
    // Configuración para archivos JavaScript
    {
        files: ['**/*.js'],
        rules: {
            'array-bracket-spacing': ['error', 'never'],
            'object-curly-spacing': ['error', 'never'],
        },
    },
    // Configuración para plantillas HTML de Angular
    {
        files: ['**/*.html'],
        languageOptions: {
            parser: angularTemplateParser, // Parser para plantillas HTML
        },
        plugins: {
            '@angular-eslint/template': angularTemplateEslint, // Añadir el plugin de plantillas
        },
        rules: {
            '@angular-eslint/template/no-negated-async': 'error',
        },
    },
];
