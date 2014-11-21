var TestHelper = module.exports = require('bpmn-js/test/helper');

var fs = require('fs');

// insert diagram.css
TestHelper.insertCSS('diagram-js.css', fs.readFileSync(__dirname + '/../node_modules/bpmn-js/node_modules/diagram-js/assets/diagram-js.css', 'utf8'));
