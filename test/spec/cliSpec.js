'use strict';

var TestHelper = require('bpmn-js/test/TestHelper'),
    Matchers = require('bpmn-js/test/Matchers');

/* global bootstrapBpmnJS, inject */


var _ = require('lodash');

var fs = require('fs');

var modelingModule = require('bpmn-js/lib/features/modeling'),
    drawModule = require('bpmn-js/lib/draw'),
    cliModule = require('../../');


describe('cli', function() {

  beforeEach(Matchers.addDeepEquals);


  var diagramXML = fs.readFileSync('resources/start.bpmn', 'utf-8');

  var testModules = [ drawModule, cliModule, modelingModule ];

  beforeEach(bootstrapBpmnJS(diagramXML, {
    modules: testModules,
    cli: { bindTo: 'cli' }
  }));


  it('should bind to window', inject(function(cli) {
    expect(window.cli).toBeDefined();
  }));


  it('should model, cli based', inject(function(cli) {

    // shapes
    var shapes = cli.shapes('shapes');

    // then
    expect(shapes).toDeepEqual([ 'StartEvent_1', 'StartEvent_1_label' ]);


    // shape
    var startEventElement = cli.shape('StartEvent_1');

    // then
    expect(startEventElement.id).toBe('StartEvent_1');


    // move
    var startEventPos = _.pick(startEventElement, [ 'x', 'y' ]);
    cli.move('StartEvent_1 0,50');

    // then
    expect(startEventElement.x).toBe(startEventPos.x);
    expect(startEventElement.y).toBe(startEventPos.y + 50);


    // append
    var task = cli.append('StartEvent_1 bpmn:ServiceTask');

    // then
    expect(task).toBeDefined();


    // append another
    var otherTask = cli.append(task.id + ' bpmn:UserTask 150,0');

    // then
    expect(otherTask).toBeDefined();


    // export as svg
    cli.save('svg');


    // export as bpmn
    cli.save('bpmn');

  }));

});