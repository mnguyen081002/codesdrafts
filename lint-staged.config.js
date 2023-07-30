module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'eslint'],
  '**/*.ts?(x)': () => 'npm run check-types',
  '*.{json,yaml}': ['prettier --write'],
  '/src/**/*.{js,jsx,ts,tsx}': ['eslint --fix', 'eslint'],
};
