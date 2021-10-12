const path = require('path');
const { basename } = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const PATHS = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
};

const PAGES_DIR = `${PATHS.src}/pages`;

const getFiles = (dir, fileType) => (
  dir.map((pageFolder) => (
    fs.readdirSync(
      `${PAGES_DIR}/${pageFolder}`,
    ).find((file) => (
      file.endsWith(`.${fileType}`)
    ))
  ))
);

const JS_FILES = getFiles(fs.readdirSync(PAGES_DIR), 'js');
const PUG_FILES = getFiles(fs.readdirSync(PAGES_DIR), 'pug');

const getEntry = () => (
  JS_FILES.reduce((entry, file, index) => (
    { ...entry, [file.split('.')[0]]: `${PAGES_DIR}/${fs.readdirSync(PAGES_DIR)[index]}/${file}` }
  ), {})
);

module.exports = {
  cache: { type: 'filesystem' },
  externals: {
    paths: PATHS,
  },
  entry: getEntry(),
  output: {
    filename: 'js/[name].min.js',
    path: PATHS.dist,
    publicPath: './',
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: { loader: 'pug-loader' },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env'] },
        },
      },
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|svg)$/i,
        type: 'asset/resource',
        generator: { filename: 'fonts/[name][ext]' },
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        type: 'asset/resource',
        exclude: /fonts/,
        generator: { filename: 'img/[name][ext]' },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new LiveReloadPlugin({ appendScriptTag: true }),
    ...PUG_FILES.map(
      (file, index) => new HtmlWebpackPlugin({
        template: `${PAGES_DIR}/${fs.readdirSync(PAGES_DIR)[index]}/${file}`,
        filename: `./${file.replace(/\.pug/, '.html')}`,
        chunks: [`${file.replace(/\.pug/, '')}`],
        inject: 'body',
        scriptLoading: 'defer',
      }),
    ),
    ...PUG_FILES.map(
      (file) => new FaviconsWebpackPlugin({
        logo: 'src/favicon/favicon.svg',
        cache: true,
        prefix: 'favicons/',
        inject: (htmlPlugin) => basename(htmlPlugin.options.filename) === `${file.replace(/\.pug/, '.html')}`,
      }),
    ),
  ],
};
