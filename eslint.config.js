import { fixupPluginRules } from '@eslint/compat';
import tsParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

const patchedReactHooksPlugin = fixupPluginRules(eslintPluginReactHooks);

const baseESLintConfig = {
  name: 'eslint',
  languageOptions: {
    parser: tsParser,
    ecmaVersion: 'latest',
    sourceType: 'module',
    globals: {
      ...globals.builtin,
      ...globals.browser,
      ...globals.es2025
    }
  },
  linterOptions: {
    reportUnusedDisableDirectives: 'error'
  },
  rules: {
    'no-await-in-loop': 'error',
    'no-constant-binary-expression': 'error',
    'no-duplicate-imports': 'error',
    'no-new-native-nonconstructor': 'error',
    'no-promise-executor-return': 'error',
    'no-self-compare': 'error',
    'no-template-curly-in-string': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unreachable-loop': 'error',
    'no-unused-private-class-members': 'error',
    'no-use-before-define': 'error',
    'require-atomic-updates': 'error',
    camelcase: 'error',
    'no-unused-vars': 'off'
  }
};

const reactConfig = {
  name: 'react',
  plugins: {
    react: eslintPluginReact,
    'react-hooks': patchedReactHooksPlugin
  },
  rules: {
    ...eslintPluginReact.configs.flat['jsx-runtime'].rules,
    'react/jsx-boolean-value': 'error',
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-no-target-blank': 'off',
    'react/jsx-max-props-per-line': 'off',
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        shorthandFirst: true,
        reservedFirst: true,
        multiline: 'last'
      }
    ],
    'react/no-unknown-property': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': 'error',
    ...patchedReactHooksPlugin.configs.recommended.rules
  }
};

const eslintConfig = [baseESLintConfig, reactConfig, eslintConfigPrettier];

eslintConfig.map(config => {
  config.files = ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx'];
  config.ignores = ['src/**/*.d.ts'];
});

export default eslintConfig;
