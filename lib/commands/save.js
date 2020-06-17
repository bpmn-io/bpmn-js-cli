'use strict';


function SaveCommand(params, bpmnjs) {

  return {
    args: [ params.string('format') ],
    exec: async function(format) {
      var result;
      if (format === 'svg') {
        try {
          result = await bpmnjs.saveSVG();
          var svg = result.svg;
          console.info(svg);
        } catch (err) {
          console.error(err);
        }

      } else if (format === 'bpmn') {
        try {
          result = await bpmnjs.saveXML();
          var xml = result.xml;
          console.info(xml);
        } catch (err) {
          console.error(err);
        }

      } else {
        throw new Error('unknown format, <svg> and <bpmn> are available');
      }
    }
  };
}

SaveCommand.$inject = [ 'cli._params', 'bpmnjs' ];

module.exports = SaveCommand;