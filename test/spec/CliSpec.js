import {
  bootstrapModeler,
  inject
} from '../TestHelper';

import {
  pick
} from 'min-dash';

import modelingModule from 'bpmn-js/lib/features/modeling';
import coreModule from 'bpmn-js/lib/core';
import cliModule from '../../';

var singleStart = !!(window.__env__ && window.__env__.SINGLE_START);


describe('cli', function() {

  var startDiagramXML = require('resources/start.bpmn');
  var simpleDiagramXML = require('resources/simple.bpmn');

  var testModules = [
    coreModule,
    cliModule,
    modelingModule
  ];


  describe('bootstrap', function() {

    beforeEach(bootstrapModeler(startDiagramXML, {
      modules: testModules,
      cli: {
        bindTo: 'cli'
      }
    }));


    (singleStart ? it.only : it)('should bind to window', inject(function(cli) {
      expect(window.cli).to.equal(cli);
    }));

  });


  describe('model', function() {

    beforeEach(bootstrapModeler(startDiagramXML, {
      modules: testModules,
      cli: {
        bindTo: 'cli'
      }
    }));


    it('should model process', inject(function(cli) {

      // elements
      var elements = cli.elements();

      // then
      expect(elements).to.eql([
        'Process_1',
        'StartEvent_1'
      ]);


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
      var orGateway = cli.append(
        'StartEvent_1',
        'bpmn:InclusiveGateway',
        { x: 150, y: 0 }
      );

      // then
      expect(orGateway).to.exist;


      // set label
      cli.setLabel(orGateway, 'You have to decide');

      // then
      expect(cli.element(orGateway).businessObject.name).to.equal('You have to decide');


      // append user task
      var userTask = cli.append(orGateway, 'bpmn:UserTask 150,0');

      // then
      expect(userTask).to.exist;


      // continue modeling

      // append gateway
      var gateway = cli.append(userTask, 'bpmn:ExclusiveGateway');

      // append manual task
      var manualTask = cli.append(
        gateway,
        'bpmn:ManualTask',
        { x: 150, y: -70 }
      );

      // append intermediate catch event
      var intermediateCatchEvent = cli.append(
        gateway,
        'bpmn:IntermediateCatchEvent',
        { x: 150, y: 70 }
      );

      // append joining gateway
      var joiningGateway = cli.append(
        manualTask,
        'bpmn:ExclusiveGateway',
        '150,70'
      );

      // connect event -> gateway
      cli.connect(
        intermediateCatchEvent,
        joiningGateway,
        'bpmn:SequenceFlow'
      );


      // create text-annotation next to orGateway
      var orGatewayShape = cli.element(orGateway);


      var textAnnotation = cli.create(
        'bpmn:TextAnnotation',
        {
          x: orGatewayShape.x + 100,
          y: orGatewayShape.y - 100
        },
        orGatewayShape.parent
      );

      cli.setLabel(textAnnotation, 'What do you choose, yes or no?');


      // create association
      cli.connect(orGateway, textAnnotation, 'bpmn:Association');


      // move some nodes
      cli.move([
        joiningGateway,
        orGateway,
        intermediateCatchEvent
      ], '0,30');

      // var
      // export as svg
      cli.save('svg');


      // export as bpmn
      cli.save('bpmn');

    }));

  });


  describe('set label', function() {

    // given that
    beforeEach(bootstrapModeler(simpleDiagramXML, {
      modules: testModules
    }));


    it('should set TextAnnotation label', inject(function(cli) {

      // given
      var textAnnotation = cli.create(
        'bpmn:TextAnnotation',
        {
          x: 100,
          y: 100
        },
        'ID_PROCESS_1'
      );

      var text = 'What do you choose, yes or no?';

      // when
      cli.setLabel(textAnnotation, text);

      // then
      var shape = cli.element(textAnnotation);

      expect(shape.businessObject.text).to.eql(text);
    }));

  });


  describe('help', function() {

    // given that
    beforeEach(bootstrapModeler(simpleDiagramXML, {
      modules: testModules
    }));


    it('should show available commands', inject(function(cli) {

      // when
      var helpText = cli.help();

      // then
      expect(helpText).to.match(/available commands:/);

      expect(helpText).to.contain('undo');
      expect(helpText).to.contain('removeShape');
      expect(helpText).to.contain('append');
    }));

  });


  describe('remove', function() {

    // given that
    beforeEach(bootstrapModeler(simpleDiagramXML, {
      modules: testModules
    }));


    it('should remove shape', inject(function(cli) {

      // when
      cli.removeShape('ID_TASK_1');

      // then
      var elements = cli.elements();

      expect(elements).to.eql([
        'ID_PROCESS_1',
        'ID_TASK_2'
      ]);
    }));


    it('should remove connection', inject(function(cli) {

      // when
      cli.removeConnection('ID_CONNECTION_1');

      // then
      var elements = cli.elements();
      expect(elements).to.eql([
        'ID_PROCESS_1',
        'ID_TASK_1',
        'ID_TASK_2'
      ]);
    }));

  });


  describe('attach', function() {

    beforeEach(bootstrapModeler(simpleDiagramXML, {
      modules: testModules,
    }));


    it('should create', inject(function(cli) {

      // when
      var newElement = cli.create(
        'bpmn:BoundaryEvent',
        '400,150',
        'ID_TASK_2',
        true
      );

      var connectedTask = cli.append(
        newElement,
        'bpmn:ExclusiveGateway',
        '50,50'
      );

      // then
      var elements = cli.elements();

      expect(elements).to.contain(newElement);
      expect(elements).to.contain(connectedTask);
    }));


    it('should move', inject(function(cli) {

      // given
      var newElement = cli.create(
        'bpmn:BoundaryEvent',
        '400,150',
        'ID_TASK_2',
        true
      );

      cli.append(newElement, 'bpmn:ExclusiveGateway', '50,50');

      // when
      cli.move(newElement, '-200,0', 'ID_TASK_1', true);

      // then
      var taskElement = cli.element('ID_TASK_1');
      var boundaryElement = cli.element(newElement);

      expect(boundaryElement.host).to.eql(taskElement);
    }));

  });

});
