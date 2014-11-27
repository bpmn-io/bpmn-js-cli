'use strict';


function MoveCommand(params, modeling) {

  return {
    args: [ params.shapes('shapes'), params.point('delta'), params.shape('newParent', { optional: true }) ],
    exec: function(shapes, delta, newParent) {
      modeling.moveShapes(shapes, delta, newParent);
      return shapes;
    }
  };
}

MoveCommand.$inject = [ 'cli._params', 'modeling' ];

module.exports = MoveCommand;