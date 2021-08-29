const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const buildWebpackConfig = merge(common, {
  mode: 'production',
  plugins: [],
});

module.exports = new Promise((resolve) => {
  resolve(buildWebpackConfig);
});
