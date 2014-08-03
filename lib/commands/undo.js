'use strict';


function UndoCommand(commandStack) {

  return {
    exec: function() {
      commandStack.undo();
    }
  };
}

UndoCommand.$inject = [ 'commandStack' ];

module.exports = UndoCommand;