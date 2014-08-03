'use strict';


function SaveCommand(params, bpmnjs) {

  return {
    args: [ params.string('format') ],
    exec: function(format) {

      if (format === 'svg') {
        bpmnjs.saveSVG(function(err, svg) {

          if (err) {
            console.error(err);
          } else {
            console.info(svg);
          }
        });
      } else if (format === 'bpmn') {
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
  };
}

SaveCommand.$inject = [ 'cli._params', 'bpmnjs' ];

module.exports = SaveCommand;