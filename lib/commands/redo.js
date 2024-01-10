export default function RedoCommand(commandStack) {

  return {
    exec: function() {
      commandStack.redo();
    }
  };
}

RedoCommand.$inject = [ 'commandStack' ];