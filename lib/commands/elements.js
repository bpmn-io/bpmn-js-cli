'use strict';

var _ = require('lodash');


function ElementsCommand(params, elementRegistry) {

  return {
    exec: function() {
      function all() {
        return true;
      }

      function ids(e) {
        return e.id;
      }

      return elementRegistry.filter(all).map(ids);
    }
  };
}

ElementsCommand.$inject = [ 'cli._params', 'elementRegistry' ];

module.exports = ElementsCommand;