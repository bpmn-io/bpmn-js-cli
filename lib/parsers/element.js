'use strict';

var _ = require('lodash');


function ElementParser(elementRegistry) {

  return function(arg, options) {
    // assume element passed is shape already
    if (_.isObject(arg)) {
      return arg;
    }

    var e = elementRegistry.getById(arg);
    if (!e) {
      if (options.optional) {
        return null;
      } else {
        if (arg) {
          throw new Error('element with id <' + arg + '> does not exist');
        } else {
          throw new Error('argument required');
        }
      }
    }

    return e;
  };
}

ElementParser.$inject = [ 'elementRegistry' ];

module.exports = ElementParser;