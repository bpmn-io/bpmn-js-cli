'use strict';


function RedoCommand(commandStack) {

  return {
    exec: function() {
      commandStack.redo();
    }
  };
}

RedoCommand.$inject = [ 'commandStack' ];

module.exports = RedoCommand;