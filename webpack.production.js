/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin('styles.[contenthash].css'),
    new CleanWebpackPlugin(['dist']),
    new OptimizeCssAssetsPlugin(),
    new PurifyCSSPlugin({
      paths: glob.sync(path.join(__dirname, 'src/**/*.js')),
    }),
  ],
};
