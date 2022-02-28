export * from 'bpmn-js/test/helper';

import semver from 'semver';

import {
  insertCSS
} from 'bpmn-js/test/helper';


// insert diagram.css
insertCSS(
  'diagram-js.css',
  require('diagram-js/assets/diagram-js.css')
);

if (bpmnJsSatisfies('>=9')) {
  insertCSS(
    'bpmn-js.css',
    require('bpmn-js/dist/assets/bpmn-js.css').default
  );
}

/**
 * Execute test only if currently installed bpmn-js is of given version.
 *
 * @param {string} versionRange
 * @param {boolean} only
 */
export function withBpmnJs(versionRange, only = false) {
  if (bpmnJsSatisfies(versionRange)) {
    return only ? it.only : it;
  } else {
    return it.skip;
  }
}

function bpmnJsSatisfies(versionRange) {
  const bpmnJsVersion = require('bpmn-js/package.json').version;

  return semver.satisfies(bpmnJsVersion, versionRange, { includePrerelease: true });
}
