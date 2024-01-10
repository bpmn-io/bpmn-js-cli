export default function RemoveConnectionCommand(params, modeling) {

  return {
    args: [
      params.element('connection')
    ],
    exec: function(connection) {
      return modeling.removeConnection(connection);
    }
  };
}

RemoveConnectionCommand.$inject = [ 'cli._params', 'modeling' ];