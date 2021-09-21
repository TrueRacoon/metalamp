const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const buildWebpackConfig = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    filename: 'js/[name].js',
    path: common.externals.paths.dist,
    publicPath: '/',
  },
  devServer: {
    static: {
      directory: common.externals.paths.dist,
    },
    hot: true,
  },
  plugins: [],
});

module.exports = new Promise((resolve) => {
  resolve(buildWebpackConfig);
});
