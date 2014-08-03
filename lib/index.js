module.exports = {
  __init__: [ 'cliInitializer' ],
  cli: [ 'type', require('./cli') ],
  cliInitializer: [ 'type', require('./initializer') ]
};