'use strict';

var _ = require('lodash');


function ElementsCommand(params, elementRegistry) {

  return {
    exec: function() {
      var elements = [];
      _.forEach(elementRegistry._elementMap, function(c, id) {
        elements.push(id);
      });

      return elements;
    }
  };
}

ElementsCommand.$inject = [ 'cli._params', 'elementRegistry' ];

module.exports = ElementsCommand;