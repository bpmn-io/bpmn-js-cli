'use strict';


function AppendCommand(params, modeling) {

  return {
    args: [
      params.shape('source'),
      params.string('type'),
      params.point('delta', { defaultValue: { x: 200, y: 0 } } )
    ],
    exec: function(source, type, delta) {
      var newPosition = {
        x: source.x + source.width / 2 + delta.x,
        y: source.y + source.height / 2 + delta.y
      };

      return modeling.appendShape(source, { type: type }, newPosition).id;
    }
  };
}

AppendCommand.$inject = [ 'cli._params', 'modeling' ];

module.exports = AppendCommand;