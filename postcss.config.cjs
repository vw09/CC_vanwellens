module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: [require('autoprefixer'), require('postcss-preset-env')],
};
