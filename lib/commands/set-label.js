'use strict';


function SetLabelCommand(params, modeling) {

  return {
    args: [ params.element('element'), params.string('newLabel') ],
    exec: function(element, newLabel) {
      modeling.updateLabel(element, newLabel);
      return element;
    }
  };
}

SetLabelCommand.$inject = [ 'cli._params', 'modeling' ];

module.exports = SetLabelCommand;