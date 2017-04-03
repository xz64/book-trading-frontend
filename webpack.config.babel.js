/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import System from 'es6-micro-loader';
import merge from 'webpack-merge';

import baseConfig from './webpack.base';

module.exports = env =>
  System.import(`./webpack.${env}`)
    .then(envConfig => merge(baseConfig, envConfig));
