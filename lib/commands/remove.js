'use strict';

function RemoveCommand(params, modeling) {

  return {
    args: [
      params.elements('elements')
    ],
    exec: function(elements) {
      return modeling.removeElements(elements);
    }
  };
}

RemoveCommand.$inject = [ 'cli._params', 'modeling' ];

module.exports = RemoveCommand;
