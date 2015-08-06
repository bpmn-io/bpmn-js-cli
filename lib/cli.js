'use strict';

var isArray = require('lodash/lang/isArray'),
    isNumber = require('lodash/lang/isNumber'),
    isString = require('lodash/lang/isString'),
    isFunction = require('lodash/lang/isFunction'),
    forEach = require('lodash/collection/forEach');

function asArray(args) {
  return Array.prototype.slice.call(args);
}

function asParam(parse) {
  return function(name, options) {
    return {
      name: name,
      parse: function(val) {
        return parse(val, options || {});
      }
    };
  };
}

function StringParser() {
  return function(arg, options) {
    // support variable arguments
    if (isArray(arg)) {
      arg = arg.join(' ');
    }

    if (arg !== '' && !arg) {
      if (options.defaultValue) {
        return options.defaultValue;
      } else {
        throw new Error('no value given');
      }
    } else {
      return arg;
    }
  };
}

function BooleanParser() {
  return function(arg, options) {
    if (!arg) {
      if (options.defaultValue) {
        return options.defaultValue;
      }

      if (options.optional) {
        return undefined;
      }

      throw new Error('no value given');
    } else {
      return arg && arg !== 'false';
    }
  };
}

function NumberParser() {
  return function(arg, options) {
    if (arg !== 0 && !arg) {
      if (options.defaultValue) {
        return options.defaultValue;
      } else {
        throw new Error('no value given');
      }
    } else {
      return isNumber(arg) ? arg : parseFloat(arg, 10);
    }
  };
}

function Cli(config, injector) {

  this._commands = {};
  this._params = {};

  this._injector = injector;

  this._registerParsers();
  this._registerCommands();

  this._bind(config);
}

Cli.$inject = [ 'config', 'injector' ];

module.exports = Cli;


// reset prototype (ain't gonna inherit from object)

Cli.prototype = {};


/////// helpers //////////////////////////

Cli.prototype._bind = function(config) {
  if (config.cli && config.cli.bindTo) {
    console.info('bpmn-js-cli is available via window.' + config.cli.bindTo);
    window[config.cli.bindTo] = this;
  }
};

Cli.prototype._registerParser = function(name, Parser) {
  var parser = this._injector.invoke(Parser);

  // must return a function(val, options) -> result
  if (!isFunction(parser)) {
    throw new Error('parser must be a Function<String, Object> -> Object');
  }

  this._params[name] = asParam(parser);
};

Cli.prototype._registerCommand = function(name, Command) {

  var command = isFunction(Command) ? this._injector.invoke(Command) : Command;

  command.args = command.args || [];

  this._commands[name] = command;

  var self = this;

  this[name] = function() {
    var args = asArray(arguments);
    args.unshift(name);

    return self.exec.apply(self, args);
  };
};

Cli.prototype._registerParsers = function() {
  this._registerParser('string', StringParser);
  this._registerParser('number', NumberParser);
  this._registerParser('bool', BooleanParser);
};

Cli.prototype._registerCommands = function() {

  var self = this;

  // special <help> command
  this._registerCommand('help', {
    exec: function() {
      var help = 'available commands:\n';

      forEach(self._commands, function(c, name) {
        help += '\n\t' + name;
      });

      return help;
    }
  });
};

Cli.prototype.parseArguments = function(args, command) {

  var results = [];

  var last = command.args.length -1;

  forEach(command.args, function(c, i) {

    var val;

    // last arg receives array of all remaining parameters
    if (i === last && args.length > command.args.length) {
      val = args.slice(i);
    } else {
      val = args[i];
    }

    try {
      results.push(c.parse(val));
    } catch (e) {
      throw new Error('could not parse <' + c.name + '>: ' + e.message);
    }
  });

  return results;
};

Cli.prototype.exec = function() {

  var args = [];

  // convert mixed whitespace separated string / object assignments in args list
  // to correct argument representation
  asArray(arguments).forEach(function(arg) {
    if (isString(arg)) {
      args = args.concat(arg.split(/\s+/));
    } else {
      args.push(arg);
    }
  });

  var name = args.shift();

  var command = this._commands[name];
  if (!command) {
    throw new Error('no command <' + name + '>, execute <commands> to get a list of available commands');
  }

  var values, result;

  try {
    values = this.parseArguments(args, command);
    result = command.exec.apply(this, values);
  } catch (e) {
    throw new Error('failed to execute <' + name + '> with args <[' + args.join(', ') + ']> : ' + e.message);
  }

  return result;
};