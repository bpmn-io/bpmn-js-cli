var TestHelper = module.exports = require('bpmn-js/test/helper');

var fs = require('fs');

// insert diagram.css
TestHelper.insertCSS(
  'diagram-js.css',
  fs.readFileSync(require.resolve('diagram-js/assets/diagram-js.css'), 'utf8')
);
