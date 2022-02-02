module.exports = {
  ignorePatterns: ['.eslintrc.js', 'migrations/*'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'semi': ['error', `always`],
    'curly': ['error', `all`],
    'eqeqeq': ['error', 'always'],
    'no-var': 'error',
    // 'indent': ['error', 4,
    //     {
    //         SwitchCase: 1,
    //         VariableDeclarator: {"var": 2, "let": 2, "const": 3},
    //         FunctionExpression: {"body": 1, "parameters": 1},
    //         ObjectExpression: "first",
    //         MemberExpression: 1,
    //         outerIIFEBody: 2,
    //         CallExpression: {"arguments":2},
    //         flatTernaryExpressions: false,
    //     }],
    'eol-last': ['error', 'always'],
    'no-proto': 'error',
    'no-console': 'off',
    'quote-props': ['error', `consistent-as-needed`],
    'no-multiple-empty-lines': ['error', {max: 3, maxEOF: 0}],
    'max-lines-per-function': ['error', {max: 50, skipBlankLines: true, skipComments: true}],
    'max-lines': ['error', {max: 300, skipBlankLines:true, skipComments: true}],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'only-multiline',
    }],
    'padded-blocks': ['error', 'never'],
    'comma-spacing': ['error', {"before": false, "after": true}],
    'block-spacing': ['error', 'always'],
    'no-unused-vars': 'off',
    'space-in-parens': ['error', 'never'],
    'keyword-spacing': ['error', {before: true, after: true}],
    'no-return-await': 'error',
    'object-shorthand': "error",
    'no-trailing-spaces': 'error',
    'space-before-blocks': ['error', 'always'],
    'no-duplicate-imports': 'error',
    'object-curly-spacing': ['error', 'always'],
    //'array-bracket-spacing': ['error', `always`],
    '@typescript-eslint/indent': ['error', 4, {

      /**
       * "SwitchCase" (default: 0) enforces indentation level for `case` clauses in `switch` statements
       */
      SwitchCase: 1,

      /**
       * "VariableDeclarator" (default: 1) enforces indentation level for var declarators;
       * can also take an object to define separate rules for `var`, `let` and `const` declarations.
       */
      VariableDeclarator: {"var": 2, "let": 2, "const": 3},

      /**
       * "outerIIFEBody" (default: 1) enforces indentation level for file-level IIFEs.
       */
      outerIIFEBody: 2,

      /**
       * "FunctionDeclaration" takes an object to define rules for function declarations.
       * * `parameters` (default: 1) enforces indentation level for parameters in a function declaration. This can either be a number indicating indentation level, or the string "first" indicating that all parameters of the declaration must be aligned with the first parameter. This can also be set to `"off"` to disable checking for FunctionDeclaration parameters.
       * * `body` (default: 1) enforces indentation level for the body of a function declaration.
       */
      FunctionDeclaration: {"parameters": 1, "body": 1},

      /**
       * "FunctionExpression" takes an object to define rules for function expressions.
       * * `parameters` (default: 1) enforces indentation level for parameters in a function expression. This can either be a number indicating indentation level, or the string "first" indicating that all parameters of the expression must be aligned with the first parameter. This can also be set to "off" to disable checking for FunctionExpression parameters.
       * * `body` (default: 1) enforces indentation level for the body of a function expression.
       */
      FunctionExpression: {"body": 1, "parameters": 1},
      /**
       * "ObjectExpression" (default: 1) enforces indentation level for properties in objects. It can be set to the string "first", indicating that all properties in the object should be aligned with the first property. This can also be set to "off" to disable checking for object properties.
       */
      ObjectExpression: 1,
      /**
       * "ArrayExpression" (default: 1) enforces indentation level for elements in arrays. It can also be set to the string "first", indicating that all the elements in the array should be aligned with the first element. This can also be set to "off" to disable checking for array elements.
       */
      ArrayExpression: 1,
      /**
       * takes an object to define rules for function call expressions.
       * * `arguments` (default: 1) enforces indentation level for arguments in a call expression. This can either be a number indicating indentation level, or the string "first" indicating that all arguments of the expression must be aligned with the first argument. This can also be set to "off" to disable checking for CallExpression arguments.
       */
      CallExpression: {arguments: 1},
      /**
       *  (default: 1) enforces indentation level for multi-line property chains. This can also be set to `"off"` to disable checking for MemberExpression indentation.
       */
      MemberExpression: 1,
      /**
       * "flatTernaryExpressions": true (false by default) requires no indentation for ternary expressions which are nested in other ternary expressions.
       */
      flatTernaryExpressions: false,
        /**
         * generic indent fix: issue https://github.com/typescript-eslint/typescript-eslint/issues/1824
         */
        ignoredNodes: ['TSTypeParameterInstantiation'],
    }],
    '@typescript-eslint/quotes': ['error', 'single'],
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', {argsIgnorePattern: '^_'}],
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
      // {
      //     selector: 'variable',
      //     format: ['camelCase'],
      //     leadingUnderscore: 'allow',
      //     trailingUnderscore: 'allow',
      // },

      {
        selector: 'property',
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
      {
        selector: 'variable',
        // modifiers: ['const'],
        format: ['camelCase', 'UPPER_CASE', 'snake_case'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
      {
        selector: 'parameter',
        format: ['camelCase', 'UPPER_CASE', 'snake_case'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
      {
        selector: 'property',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE', 'snake_case'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      {
        selector: 'enumMember',
        format: ['PascalCase'],
      },
    ],
    // NOTE: works incorrectly with two recursive calling functions
    "@typescript-eslint/no-namespace": "off",
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
