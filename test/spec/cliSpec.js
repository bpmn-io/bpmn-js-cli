'use strict';

var TestHelper = require('../test-helper');

/* global bootstrapModeler, inject */


var pick = require('lodash/object/pick');

var fs = require('fs');

var modelingModule = require('bpmn-js/lib/features/modeling'),
    coreModule = require('bpmn-js/lib/core'),
    cliModule = require('../../');


describe('cli', function() {

  var startDiagramXML = fs.readFileSync('resources/start.bpmn', 'utf8');
  var simpleDiagramXML = fs.readFileSync('resources/simple.bpmn', 'utf8');

  var testModules = [ coreModule, cliModule, modelingModule ];


  describe('bootstrap', function() {

    beforeEach(bootstrapModeler(startDiagramXML, {
      modules: testModules,
      cli: { bindTo: 'cli' }
    }));


    it('should bind to window', inject(function(cli) {
      expect(window.cli).to.be.defined;
    }));
  });


  describe('model', function() {

    beforeEach(bootstrapModeler(startDiagramXML, {
      modules: testModules,
      cli: { bindTo: 'cli' }
    }));


    it('should model process', inject(function(cli) {

      // elements
      var elements = cli.elements();

      // then
      expect(elements).to.eql([ 'Process_1', 'StartEvent_1', 'StartEvent_1_label' ]);


      // element
      var startEventElement = cli.element('StartEvent_1');

      // then
      expect(startEventElement.id).to.equal('StartEvent_1');


      // move
      var startEventPos = pick(startEventElement, [ 'x', 'y' ]);
      cli.move('StartEvent_1', '0,100');

      // then
      expect(startEventElement.x).to.equal(startEventPos.x);
      expect(startEventElement.y).to.equal(startEventPos.y + 100);


      // append
      var orGateway = cli.append('StartEvent_1', 'bpmn:InclusiveGateway', { x: 150, y: 0});

      // then
      expect(orGateway).to.be.defined;


      // set label
      cli.setLabel(orGateway, 'You have to decide');

      // then
      expect(cli.element(orGateway).businessObject.name).to.equal('You have to decide');


      // append user task
      var userTask = cli.append(orGateway, 'bpmn:UserTask 150,0');

      // then
      expect(userTask).to.be.defined;


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
      var association = cli.connect(orGateway, textAnnotation, 'bpmn:Association');


      // move some nodes
      cli.move([ joiningGateway, orGateway, intermediateCatchEvent ], '0,30');

      // var
      // export as svg
      cli.save('svg');


      // export as bpmn
      cli.save('bpmn');

    }));
  });


  describe('remove', function() {

    // given that
    // expect(cli.elements()).to.eql([ 'ID_PROCESS_1', 'ID_TASK_1', 'ID_TASK_2', 'ID_CONNECTION_1', 'ID_CONNECTION_2_label' ]);
    beforeEach(bootstrapModeler(simpleDiagramXML, {
      modules: testModules,
      cli: { bindTo: 'cli' }
    }));


    it('should remove shape', inject(function(cli) {

      // when
      cli.removeShape('ID_TASK_1');

      // then
      var elements = cli.elements();
      expect(elements).to.eql([ 'ID_PROCESS_1', 'ID_TASK_2' ]);
    }));


    it('should remove connection', inject(function(cli) {

      // when
      cli.removeConnection('ID_CONNECTION_1');

      // then
      var elements = cli.elements();
      expect(elements).to.eql([ 'ID_PROCESS_1', 'ID_TASK_1', 'ID_TASK_2' ]);
    }));

  });


  describe('attach', function() {

    beforeEach(bootstrapModeler(simpleDiagramXML, {
      modules: testModules,
    }));


    it('should create', inject(function(cli) {

      // when
      var newElement = cli.create('bpmn:BoundaryEvent', '400,150', 'ID_TASK_2', true);
      var connectedTask = cli.append(newElement, 'bpmn:ExclusiveGateway', '50,50');

      // then
      var elements = cli.elements();

      expect(elements).to.contain(newElement);
      expect(elements).to.contain(connectedTask);
    }));


    it('should move', inject(function(cli) {

      // given
      var newElement = cli.create('bpmn:BoundaryEvent', '400,150', 'ID_TASK_2', true);
      var connectedTask = cli.append(newElement, 'bpmn:ExclusiveGateway', '50,50');

      // when
      cli.move(newElement, '-200,0', 'ID_TASK_1', true);

      // then
      var taskElement = cli.element('ID_TASK_1');
      var boundaryElement = cli.element(newElement);

      expect(boundaryElement.host).to.eql(taskElement);
    }));

  });

});
