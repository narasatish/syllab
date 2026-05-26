import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import firebaseRulesPlugin from '@firebase/eslint-plugin-security-rules';

export default tseslint.config(
  {
    ignores: ['dist', 'firestore.rules'],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'warn',
      'react-hooks/set-state-in-effect': 'off',
      // React Compiler experimental rules — flag legitimate ref patterns + memo hints.
      // Refs ARE mutable by design (that's the whole point of useRef). Disable noise.
      'react-hooks/immutability': 'off',
      'react-hooks/preserve-manual-memoization': 'off',
      'react-hooks/no-deps-recompute': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  {
    files: ['firestore.rules'],
    plugins: {
      'firebase-rules': firebaseRulesPlugin,
    },
    rules: {
      ...firebaseRulesPlugin.configs['flat/recommended'].rules,
    },
  },
  // Content files (tutorials, question banks, syllabus, articles) contain intentional
  // escape sequences in code samples and question strings — ESLint can't tell these
  // are content vs source code, so silence those specific rules in data/.
  {
    files: ['src/data/**/*.ts', 'src/data/**/*.tsx'],
    rules: {
      'no-useless-escape': 'off',
      'no-empty': 'off',
      'no-misleading-character-class': 'off',
    },
  },
);
