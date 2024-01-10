export default function UndoCommand(commandStack) {

  return {
    exec: function() {
      commandStack.undo();
    }
  };
}

UndoCommand.$inject = [ 'commandStack' ];