'use strict';

function Initializer(cli) {

  // parsers
  cli._registerParser('point',    require('./parsers/point'));
  cli._registerParser('element',  require('./parsers/element'));
  cli._registerParser('shape',    require('./parsers/shape'));

  // commands
  cli._registerCommand('append',    require('./commands/append'));
  cli._registerCommand('connect',   require('./commands/connect'));
  cli._registerCommand('create',    require('./commands/create'));
  cli._registerCommand('element',   require('./commands/element'));
  cli._registerCommand('elements',  require('./commands/elements'));
  cli._registerCommand('move',      require('./commands/move'));
  cli._registerCommand('redo',      require('./commands/redo'));
  cli._registerCommand('save',      require('./commands/save'));
  cli._registerCommand('setLabel',  require('./commands/set-label'));
  cli._registerCommand('undo',      require('./commands/undo'));
}

Initializer.$inject = [ 'cli' ];

module.exports = Initializer;