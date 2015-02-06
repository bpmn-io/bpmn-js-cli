'use strict';

var isArray = require('lodash/lang/isArray'),
    isObject = require('lodash/lang/isObject'),
    isString = require('lodash/lang/isString');


/**
 * Parses a list of spahes shape from a list of objects or a comma-separated string
 */
function ShapesParser(elementRegistry) {

  return function(args, options) {

    if (isString(args)) {
      args = args.split(',');
    } else
    if (!isArray(args)) {
      args = [ args ];
    }

    return args.map(function(arg) {

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
    }).filter(function(e) { return e; });
  };
}

ShapesParser.$inject = [ 'elementRegistry' ];

module.exports = ShapesParser;