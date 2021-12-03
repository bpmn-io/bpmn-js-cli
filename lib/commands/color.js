'use strict';

var {
  isArray, isObject
} = require('min-dash');


/**
 * Colors a number of elements
 */
function ColorCommand(params, modeling) {

  function parseColors(colors) {

    // directly pass colors = { fill?, stroke? }
    if (isObject(colors)) {
      return colors;
    }

    var parts = isArray(colors) ? colors : colors.split(',');

    var opts = {};

    [ 'fill', 'stroke' ].forEach(function(part, idx) {

      var color = parts[idx];

      if (color) {
        opts[part] = color === 'unset' ? undefined : color;
      }
    });

    return opts;
  }

  return {
    args: [
      params.elements('elements'),
      params.string('colors')
    ],
    exec: function(elements, colors) {
      modeling.setColor(elements, parseColors(colors));
    }
  };
}

ColorCommand.$inject = [ 'cli._params', 'modeling' ];

module.exports = ColorCommand;
