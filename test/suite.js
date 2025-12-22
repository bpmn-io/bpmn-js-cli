import './test-globals';

var allTests = require.context('.', true, /Spec\.js$/);

allTests.keys().forEach(allTests);