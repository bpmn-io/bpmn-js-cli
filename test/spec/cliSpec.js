'use strict';

var TestHelper = require('bpmn-js/test/spec/TestHelper');

/* global bootstrapBpmnJS, inject */


var fs = require('fs');

var modelingModule = require('bpmn-js/lib/features/modeling'),
    drawModule = require('bpmn-js/lib/draw'),
    cliModule = require('../../');


describe('cli', function() {


  var diagramXML = fs.readFileSync('resources/start.bpmn', 'utf-8');

  var testModules = [ drawModule, cliModule, modelingModule ];

  beforeEach(bootstrapBpmnJS(diagramXML, { config: { cli: { bindTo: 'cli' } }, modules: testModules }));


  it('should model, cli based', inject(function(cli) {
    expect(window.cli).toBeDefined();
  }));

});