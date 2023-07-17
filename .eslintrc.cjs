module.exports = {
  env: {
    browser: true,
    es6: true,
    es2020: true,
    es2022: true,
    jest: true,
    'jest/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'prettier',
    'plugin:storybook/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    jsx: true,
    useJSXTextNode: true,
  },
  plugins: [
    'node',
    '@typescript-eslint',
    'react',
    'react-hooks',
    'react-refresh',
    'jest',
    'prettier',
  ],
  rules: {
    semi: 'off',
    'no-debugger': 'error',
    '@typescript-eslint/semi': ['error', 'never'],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'prettier/prettier': ['error'],
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-refresh/only-export-components': 'warn',
    'react/jsx-closing-bracket-location': [2, 'tag-aligned'],
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/jsx-indent-props': [2, 2],
    'react/jsx-indent': [
      2,
      2,
      {
        indentLogicalExpressions: true,
      },
    ],
    'react/jsx-max-props-per-line': [
      2,
      {
        maximum: 1,
        when: 'multiline',
      },
    ],
    'react/jsx-uses-react': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.cjs'],
      },
    },
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['**/*.cjs'],
      env: {
        node: true,
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'react/react-in-jsx-scope': 'off',
      },
    },
  ],
  ignorePatterns: ['node_modules/', 'coverage/', 'build/', 'dist/', 'public/'],
}
