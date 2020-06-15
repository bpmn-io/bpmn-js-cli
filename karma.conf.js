var path = require('path');

// configures browsers to run test against
// any of [ 'ChromeHeadless', 'Chrome', 'Firefox' ]
var browsers = (process.env.TEST_BROWSERS || 'ChromeHeadless').split(',');

module.exports = function(karma) {
  karma.set({

    frameworks: [
      'mocha',
      'chai'
    ],

    files: [
      'test/suite.js'
    ],

    preprocessors: {
      'test/suite.js': [ 'webpack' ]
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
            use: 'raw-loader'
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
  });

};
