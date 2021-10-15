const { merge } = require('webpack-merge');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const { basename } = require('path');
const common = require('./webpack.common');

const buildWebpackConfig = merge(common, {
  mode: 'production',
  plugins: [
    ...common.externals.pugFiles.map(
      (file) => new FaviconsWebpackPlugin({
        logo: 'src/favicon/favicon.svg',
        cache: true,
        prefix: 'favicons/',
        inject: (htmlPlugin) => basename(htmlPlugin.options.filename) === `${file.replace(/\.pug/, '.html')}`,
      }),
    ),
  ],
});

module.exports = new Promise((resolve) => {
  resolve(buildWebpackConfig);
});
