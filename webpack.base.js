/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src', 'main.js'),
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'eslint-loader',
          },
        ],
      },
      {
        test: /\.ftl$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            query: {
              name: '[name].[ext]',
              outputPath: 'l10n/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Book Trading',
      template: path.resolve(__dirname, 'src', 'index.template.ejs'),
    }),
  ],
  resolve: {
    alias: {
      domvm: path.resolve(__dirname, 'node_modules/domvm/dist/nano/domvm.nano.js'),
    },
  },
};
