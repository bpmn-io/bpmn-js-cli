/* eslint-env node */

var path = require('path');

var singleStart = process.env.SINGLE_START;

// configures browsers to run test against
// any of [ 'ChromeHeadless', 'Chrome', 'Firefox' ]
var browsers = (process.env.TEST_BROWSERS || 'ChromeHeadless').split(',');

// use puppeteer provided Chrome for testing
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function(karma) {
  var config = {

    frameworks: [
      'mocha',
      'chai',
      'webpack'
    ],

    files: [
      'test/suite.js'
    ],

    preprocessors: {
      'test/suite.js': [ 'webpack', 'env' ]
    },

    reporters: [ 'dots' ],

    browsers,

    browserNoActivityTimeout: 30000,

    singleRun: true,
    autoWatch: false,

    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /(\.css|\.bpmn)$/,
            type: 'asset/source'
          }
        ]
      },
      resolve: {
        modules: [
          'node_modules',
          path.resolve(__dirname)
        ]
      }
    }
  };

  if (singleStart) {
    config.browsers = [].concat(config.browsers, 'Debug');
    config.envPreprocessor = [].concat(config.envPreprocessor || [], 'SINGLE_START');
  }

  karma.set(config);
};
