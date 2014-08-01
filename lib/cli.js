'use strict';

var _ = require('lodash');


function Cli(config, bpmnjs, modeling, elementRegistry, commandStack) {

  if (config.cli && config.cli.bindTo) {
    console.info('binding bpmn-js cli to window.' + config.cli.bindTo);
    window[config.cli.bindTo] = this;
  }

  this._commands = {};

  function arg(name, parse) {
    return { name: name, parse: parse };
  }

  var params = this._params = {};

  params.Shape = function(name, optional) {
    return arg(name, function(id) {
      var e = elementRegistry.getById(id);
      if (!e) {
        if (optional) {
          return null;
        } else {
          throw new Error('shape with id <' + id + '> does not exist');
        }
      }

      if (e.waypoints) {
        throw new Error('element <' + id + '> is a connection');
      }

      return e;
    });
  };

  /**
   * Parses 12,12 to { dx: 12, dy: 12 }.
   * Allows nulls, i.e ,12 -> { dx: 0, dy: 12 }
   */
  params.Delta = function(name, defaultValue) {
    return arg(name, function(str) {

      if (!str && defaultValue) {
        return defaultValue;
      }

      var parts = str.split(/,/);

      if (parts.length !== 2) {
        throw new Error('expected delta to match (\\d*,\\d*)');
      }

      return {
        dx: parseInt(parts[0], 10) || 0,
        dy: parseInt(parts[1], 10) || 0
      };
    });
  };

  params.String = function(name) {
    return arg(name, function(str) { return str; });
  };

  this.registerCommands({
    help: {
      args: [],
      exec: function() {
        var help = 'available commands:\n';

        _.forEach(this._commands, function(c, name) {
          help += '\n\t' + name;
        });

        return help;
      }
    },
    move: {
      args: [ params.Shape('shape'), params.Delta('delta'), params.Shape('shape', true) ],
      exec: function(shape, delta, newParent) {
        modeling.moveShape(shape, delta, newParent);
        return shape;
      }
    },
    undo: {
      args: [],
      exec: function() {
        commandStack.undo();
      }
    },
    redo: {
      args: [],
      exec: function() {
        commandStack.redo();
      }
    },
    save: {
      args: [ params.String('format') ],
      exec: function(format) {

        if (format === 'svg') {
          bpmnjs.saveSVG(function(err, svg) {

            if (err) {
              console.error(err);
            } else {
              console.info(svg);
            }
          });
        } else
        if (format === 'bpmn') {
          return bpmnjs.saveXML(function(err, xml) {

            if (err) {
              console.error(err);
            } else {
              console.info(xml);
            }
          });
        } else {
          throw new Error('unknown format, <svg> and <bpmn> are available');
        }
      }
    },
    shape: {
      args: [ params.Shape('shape') ],
      exec: function(shape) {
        return shape;
      }
    },
    shapes: {
      args: [],
      exec: function() {
        var elements = [];
        _.forEach(elementRegistry._elementMap, function(c, id) {
          elements.push(id);
        });

        return elements;
      }
    },
    append: {
      args: [ params.Shape('source'), params.String('type'), params.Delta('delta', { dx: 200, dy: 0 }) ],
      exec: function(source, type, delta) {
        var newPosition = {
          x: source.x + source.width / 2 + delta.dx,
          y: source.y + source.height / 2 + delta.dy
        };

        return modeling.appendFlowNode(source, type, newPosition);
      }
    }
  });
}

Cli.$inject = [ 'config', 'bpmnjs', 'modeling', 'elementRegistry', 'commandStack' ];

module.exports = Cli;


Cli.prototype.registerCommands = function(commands) {
  _.extend(this._commands, commands);

  var self = this;

  _.forEach(commands, function(c, name) {
    self[name] = function(args) {
      return self.exec(name + ' ' + args);
    };
  });
};


Cli.prototype.parseArguments = function(args, command) {

  var results = [];

  _.forEach(command.args, function(c, i) {
    try {
      results.push(c.parse(args[i]));
    } catch (e) {
      throw new Error('failed to parse <' + c.name + '>: ' + e.message);
    }
  });

  return results;
};

Cli.prototype.exec = function(args) {

  args = args.split(/\s+/);

  var name = args.shift();

  var command = this._commands[name];
  if (!command) {
    throw new Error('no command <' + name + '>, execute <commands> to get a list of available commands');
  }

  var values = this.parseArguments(args, command);
  var result = command.exec.apply(this, values);

  return result;
};