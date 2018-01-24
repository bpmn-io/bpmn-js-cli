'use strict';


function CreateCommand(params, modeling) {

  return {
    args: [
      params.string('type'),
      params.point('position'),
      params.shape('parent'),
      params.bool('isAttach', { optional: true })
    ],
    exec: function(type, position, parent, isAttach) {

      var hints;

      if (isAttach) {
        hints = {
          attach: true
        };
      }

      return modeling.createShape({ type: type }, position, parent, hints).id;
    }
  };
}

CreateCommand.$inject = [ 'cli._params', 'modeling' ];

module.exports = CreateCommand;