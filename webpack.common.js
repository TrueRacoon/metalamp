const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PATHS = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
};
const PAGES_PATH = `${PATHS.src}/pages`;

const getFiles = (dir, fileType) => {
  return dir.map(pageFolder => {
    const PAGE_PATH = `${PAGES_PATH}/${pageFolder}`;
    return fs.readdirSync(PAGE_PATH).find(file => file.endsWith(`.${fileType}`));
  }).filter(e => e !== undefined);
};

const PAGES_PATH_CONTENT = fs.readdirSync(PAGES_PATH);
const JS_FILES = getFiles(PAGES_PATH_CONTENT, 'js');
const ENTRY = {};

JS_FILES.forEach((entryFile, index) => {
  const file = entryFile.split('.')[0];
  ENTRY[file] = `${PAGES_PATH}/${PAGES_PATH_CONTENT[index]}/${entryFile}`;
});

const PUG_FILES = getFiles(PAGES_PATH_CONTENT, 'pug');

module.exports = {
  externals: {
    paths: PATHS,
  },
  entry: ENTRY,
  output: {
    filename: `js/[name].min.js`,
    path: PATHS.dist,
    publicPath: './',
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: {
          loader: 'pug-loader',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          },
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
        generator: {
          filename: 'fonts/[name][ext]',
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        type: 'asset/resource',
        exclude: /fonts/,
        generator: {
          filename: 'img/[name][ext]'
        }
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new LiveReloadPlugin({ appendScriptTag: true }),
    ...PUG_FILES.map(
      (file, index) =>
        new HtmlWebpackPlugin({
          template: `${PAGES_PATH}/${PAGES_PATH_CONTENT[index]}/${file}`,
          filename: `./${file.replace(/\.pug/, '.html')}`,
          chunks: [`${file.replace(/\.pug/, '')}`],
        })
    ),
  ],
};
