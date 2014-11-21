'use strict';


function MoveCommand(params, modeling) {

  return {
    args: [ params.shape('shape'), params.point('delta'), params.shape('newParent', { optional: true }) ],
    exec: function(shape, delta, newParent) {
      modeling.moveShapes([ shape ], delta, newParent);
      return shape;
    }
  };
}

MoveCommand.$inject = [ 'cli._params', 'modeling' ];

module.exports = MoveCommand;