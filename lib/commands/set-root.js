export default function SetRootCommand(params, canvas) {

  return {
    args: [ params.element('element') ],
    exec: function(element) {
      canvas.setRootElement(element);
      return element;
    }
  };
}

SetRootCommand.$inject = [ 'cli._params', 'canvas' ];