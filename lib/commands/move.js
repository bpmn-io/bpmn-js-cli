'use strict';


function MoveCommand(params, modeling) {

  return {
    args: [
      params.shapes('shapes'),
      params.point('delta'),
      params.shape('newParent', { optional: true }),
      params.bool('isAttach', { optional: true })
    ],
    exec: function(shapes, delta, newParent, isAttach) {

      var hints;

      if (isAttach) {
        hints = {
          attach: true
        };
      }

      modeling.moveElements(shapes, delta, newParent, hints);
      return shapes;
    }
  };
}

MoveCommand.$inject = [ 'cli._params', 'modeling' ];

module.exports = MoveCommand;