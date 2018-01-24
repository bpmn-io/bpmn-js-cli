/**
 * Commands running the demo shown in ./screencast.gif
 */

var cli = window.cli;

cli.elements();

var gateway = cli.append(
  'StartEvent_1',
  'bpmn:ExclusiveGateway',
  '150,0'
);

var serviceTask = cli.append(
  gateway,
  'bpmn:ServiceTask',
  '150,0'
);

var callActivity = cli.append(
  gateway,
  'bpmn:CallActivity',
  '150,90'
);

cli.undo();

callActivity = cli.append(
  gateway,
  'bpmn:CallActivity',
  '150,120'
);

var endEvent = cli.append(
  serviceTask,
  'bpmn:EndEvent',
  '150, 0'
);

cli.connect(
  callActivity,
  endEvent,
  'bpmn:SequenceFlow'
);

cli.setLabel(callActivity, 'CallActivity');

var gatewayShape = cli.element(gateway);

var textAnnotation = cli.create(
  'bpmn:TextAnnotation',
  {
    x: gatewayShape.x - 50,
    y: gatewayShape.y + 150
  },
  gatewayShape.parent
);

cli.setLabel(textAnnotation, 'i-am-text');

cli.setLabel(gateway, 'ExclusiveGateway');

cli.move(callActivity, { x: 20, y: 30 });

cli.undo();

cli.undo();

cli.undo();

cli.redo();

cli.redo();

cli.redo();

cli.save('bpmn');