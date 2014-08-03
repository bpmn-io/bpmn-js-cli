'use strict';

var _ = require('lodash');


/**
 * Parses 12,12 to { x: 12, y: 12 }.
 * Allows nulls, i.e ,12 -> { x: 0, y: 12 }
 */
function PointParser() {

  return function(arg, options) {
    // assume element passed is delta already
    if (_.isObject(arg)) {
      return arg;
    }

    if (!arg && options.defaultValue) {
      return options.defaultValue;
    }

    var parts = arg.split(/,/);

    if (parts.length !== 2) {
      throw new Error('expected delta to match (\\d*,\\d*)');
    }

    return {
      x: parseInt(parts[0], 10) || 0,
      y: parseInt(parts[1], 10) || 0
    };
  };
}

module.exports = PointParser;