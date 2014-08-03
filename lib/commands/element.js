'use strict';

function ElementCommand(params) {

  return {
    args: [ params.element('element') ],
    exec: function(element) {
      return element;
    }
  };
}

ElementCommand.$inject = [ 'cli._params' ];

module.exports = ElementCommand;