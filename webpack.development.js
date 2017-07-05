/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  devtool: 'cheap-eval-source-map',
  devServer: {
    proxy: {
      '/api': 'http://localhost:8081',
    },
  },
};
