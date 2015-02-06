'use strict';

var isObject = require('lodash/lang/isObject');


/**
 * Parses a single shape from an object or string
 */
function ShapeParser(elementRegistry) {

  return function(arg, options) {

    // assume element passed is shape already
    if (isObject(arg)) {
      return arg;
    }

    var e = elementRegistry.get(arg);
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

    if (e.waypoints) {
      throw new Error('element <' + arg + '> is a connection');
    }

    return e;
  };
}

ShapeParser.$inject = [ 'elementRegistry' ];

module.exports = ShapeParser;