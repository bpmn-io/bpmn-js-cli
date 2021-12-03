/**
 * Parses a list of shapes from a list of
 * objects or a comma-separated string
 */
export default function ShapesParser(params) {

  return function(args, options) {

    return params.elements(args, options).parse(args).filter(function(element) {
      if (element.waypoints) {
        throw new Error('element <' + element.id + '> is a connection');
      }

      return true;
    });
  };
}

ShapesParser.$inject = [ 'cli._params' ];