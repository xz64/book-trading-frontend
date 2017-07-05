/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const path = require('path');
const webpack = require('webpack');
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
    new webpack.DefinePlugin({
      'process.env.RECAPTCHA_SITE_KEY': JSON.stringify(process.env.RECAPTCHA_SITE_KEY
        || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'),
    }),
    new HtmlWebpackPlugin({
      title: 'Book Trading',
      template: path.resolve(__dirname, 'src', 'index.template.ejs'),
    }),
  ],
  resolve: {
    alias: {
      domvm: path.resolve(__dirname, 'node_modules/domvm/dist/micro/domvm.micro.js'),
    },
  },
};
