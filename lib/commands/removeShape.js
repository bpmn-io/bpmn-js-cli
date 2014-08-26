'use strict';


function RemoveShapeCommand(params, modeling) {

  return {
    args: [
      params.shape('shape')
    ],
    exec: function(shape) {
      return modeling.removeShape(shape);
    }
  };
}

RemoveShapeCommand.$inject = [ 'cli._params', 'modeling' ];

module.exports = RemoveShapeCommand;
