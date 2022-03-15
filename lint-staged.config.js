const path = require('node:path');

const files = (
  filenames,
  joinKey = ' ' // joinKey can be " --file "
) => filenames.map(f => path.relative(process.cwd(), f)).join(joinKey);

module.exports = {
  // Type check TypeScript files
  '**/*.(ts|tsx)': () => 'tsc --pretty --noEmit --incremental',
  // Lint then format TypeScript and JavaScript files
  '**/*.(ts|tsx|js|jsx)': filenames => [
    `eslint --fix ${files(filenames)}`,
    `prettier --write ${files(filenames)}`,
  ],
  // Format HTML and CSS
  '**/*.{html,css}': filenames => `prettier --write ${files(filenames)}`,
  // Format MarkDown and JSON
  '**/*.(md|json)': filenames => `prettier --write ${files(filenames)}`,
};
