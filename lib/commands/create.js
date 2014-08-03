'use strict';


function CreateCommand(params, modeling) {

  return {
    args: [
      params.string('type'),
      params.point('position'),
      params.shape('parent')
    ],
    exec: function(type, position, parent) {
      return modeling.createShape({
        type: type
      }, position, parent).id;
    }
  };
}

CreateCommand.$inject = [ 'cli._params', 'modeling' ];

module.exports = CreateCommand;