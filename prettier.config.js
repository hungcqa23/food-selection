const prettierConfig = {
  arrowParens: 'avoid',
  trailingComma: 'none',
  tabWidth: 2,
  semi: true,
  endOfLine: 'auto',
  useTabs: false,
  singleQuote: true,
  printWidth: 100,
  jsxSingleQuote: true,
  quoteProps: 'as-needed',
  bracketSpacing: true,
  bracketSameLine: false,
  requirePragma: false,
  insertPragma: false,
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'css',
  embeddedLanguageFormatting: 'auto',
  singleAttributePerLine: false,
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss']
};

export default prettierConfig;
