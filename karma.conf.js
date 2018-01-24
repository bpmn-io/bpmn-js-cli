module.exports = function(karma) {
  karma.set({

    frameworks: [
      'browserify',
      'mocha',
      'chai'
    ],

    files: [
      'test/spec/**/*Spec.js'
    ],

    preprocessors: {
      'test/spec/**/*Spec.js': [ 'browserify' ]
    },

    reporters: [ 'dots' ],

    browsers: [ 'PhantomJS' ],

    browserNoActivityTimeout: 30000,

    singleRun: true,
    autoWatch: false,

    // browserify configuration
    browserify: {
      transform: [ 'brfs' ],
      debug: true
    }
  });

};
