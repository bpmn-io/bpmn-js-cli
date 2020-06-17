'use strict';


function SaveCommand(params, bpmnjs) {

  return {
    args: [ params.string('format') ],
    exec: function(format) {
      if (format === 'svg') {
        bpmnjs.saveSVG()
          .then(({ svg }) => {
            console.info(svg);
          })
          .catch(err => {
            console.error(err);
          });
      } else if (format === 'bpmn') {
        bpmnjs.saveXML()
          .then(({ xml }) => {
            console.info(xml);
          })
          .catch(err => {
            console.error(err);
          });
      } else {
        throw new Error('unknown format, <svg> and <bpmn> are available');
      }
    }
  };
}

SaveCommand.$inject = [ 'cli._params', 'bpmnjs' ];

module.exports = SaveCommand;