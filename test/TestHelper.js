export * from 'bpmn-js/test/helper';

import {
  insertCSS
} from 'bpmn-js/test/helper';

// insert diagram.css
insertCSS(
  'diagram-js.css',
  require('diagram-js/assets/diagram-js.css')
);