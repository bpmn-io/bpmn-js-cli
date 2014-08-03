'use strict';


function ConnectCommand(params, modeling) {

  return {
    args: [
      params.shape('source'),
      params.shape('target'),
      params.string('type'),
      params.shape('parent', { optional: true }),
    ],
    exec: function(source, target, type, parent) {
      return modeling.createConnection(source, target, {
        type: type,
      }, parent || source.parent).id;
    }
  };
}

ConnectCommand.$inject = [ 'cli._params', 'modeling' ];

module.exports = ConnectCommand;