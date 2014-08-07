'use strict';

var TestHelper = require('bpmn-js/test/TestHelper'),
    Matchers = require('bpmn-js/test/Matchers');

/* global bootstrapModeler, inject */


var _ = require('lodash');

var fs = require('fs');

var modelingModule = require('bpmn-js/lib/features/modeling'),
    drawModule = require('bpmn-js/lib/draw'),
    cliModule = require('../../');


describe('cli', function() {

  beforeEach(Matchers.addDeepEquals);


  var diagramXML = fs.readFileSync('resources/start.bpmn', 'utf-8');

  var testModules = [ drawModule, cliModule, modelingModule ];

  beforeEach(bootstrapModeler(diagramXML, {
    modules: testModules,
    cli: { bindTo: 'cli' }
  }));


  it('should bind to window', inject(function(cli) {
    expect(window.cli).toBeDefined();
  }));


  it('should model, cli based', inject(function(cli) {

    // elements
    var elements = cli.elements();

    // then
    expect(elements).toDeepEqual([ 'StartEvent_1', 'StartEvent_1_label' ]);


    // element
    var startEventElement = cli.element('StartEvent_1');

    // then
    expect(startEventElement.id).toBe('StartEvent_1');


    // move
    var startEventPos = _.pick(startEventElement, [ 'x', 'y' ]);
    cli.move('StartEvent_1', '0,100 0');

    // then
    expect(startEventElement.x).toBe(startEventPos.x);
    expect(startEventElement.y).toBe(startEventPos.y + 100);


    // append
    var orGateway = cli.append('StartEvent_1', 'bpmn:InclusiveGateway', { x: 150, y: 0});

    // then
    expect(orGateway).toBeDefined();


    // set label
    cli.setLabel(orGateway, 'You have to decide');

    // then
    expect(cli.element(orGateway).businessObject.name).toBe('You have to decide');


    // append user task
    var userTask = cli.append(orGateway, 'bpmn:UserTask 150,0');

    // then
    expect(userTask).toBeDefined();


    // continue modeling

    // append gateway
    var gateway = cli.append(userTask, 'bpmn:ExclusiveGateway');

    // append manual task
    var manualTask = cli.append(gateway, 'bpmn:ManualTask', { x: 150, y: -70 });

    // append intermediate catch event
    var intermediateCatchEvent = cli.append(gateway, 'bpmn:IntermediateCatchEvent', { x: 150, y: 70 });

    // append joining gateway
    var joiningGateway = cli.append(manualTask, 'bpmn:ExclusiveGateway', '150,70');

    // connect event -> gateway
    var catchEventJoiningGatewayConnection = cli.connect(intermediateCatchEvent, joiningGateway, 'bpmn:SequenceFlow');


    // create text-annotation next to orGateway
    var orGatewayShape = cli.element(orGateway);


    var textAnnotation = cli.create('bpmn:TextAnnotation', {
      x: orGatewayShape.x + 100,
      y: orGatewayShape.y - 100
    }, orGatewayShape.parent);

    cli.setLabel(textAnnotation, 'What do you choose, yes or no?');


    // create association
    // var association = cli.connect(orGateway, textAnnotation, 'bpmn:Association');

    // var
    // export as svg
    cli.save('svg');


    // export as bpmn
    cli.save('bpmn');

  }));

});