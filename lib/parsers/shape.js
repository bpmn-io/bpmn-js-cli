/**
 * Parses a single shape from an object or string
 */
export default function ShapeParser(params) {

  return function(arg, options) {

    const element = params.element(arg, options).parse(arg);

    if (element && element.waypoints) {
      throw new Error('element <' + arg + '> is a connection');
    }

    return element;
  };
}

ShapeParser.$inject = [ 'cli._params' ];