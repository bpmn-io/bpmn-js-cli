# bpmn-js-cli

An extensible command line interface for [bpmn-js](https://github.com/bpmn-io/bpmn-js).


## Demo

<img src="https://raw.githubusercontent.com/Nikku/bpmn-js-cli/master/docs/modeling-cli.gif" style="max-width: 800px; box-shadow: 1px 1px 10px 5px rgba(143,143,143,1);" />

The demo uses the following transcript:

```javascript
cli.elements();
var gateway = cli.append('StartEvent_1', 'bpmn:ExclusiveGateway', '150,0');
var serviceTask = cli.append(gateway, 'bpmn:ServiceTask', '150,0');
var callActivity = cli.append(gateway, 'bpmn:CallActivity', '150,90');
cli.undo();
callActivity = cli.append(gateway, 'bpmn:CallActivity', '150,120');
var endEvent = cli.append(serviceTask, 'bpmn:EndEvent', '150, 0');
cli.connect(callActivity, endEvent, 'bpmn:SequenceFlow');
cli.setLabel(callActivity, 'CallActivity');
var gatewayShape = cli.element(gateway);
var textAnnotation = cli.create('bpmn:TextAnnotation', { x: gatewayShape.x - 50, y: gatewayShape.y + 150 }, gatewayShape.parent);
cli.setLabel(textAnnotation, 'i-am-text')
cli.setLabel(gateway, 'ExclusiveGateway');
cli.move(callActivity, {x: 20, y: 30});
cli.undo();
cli.undo();
cli.undo();
cli.redo();
cli.redo();
cli.redo();
cli.save('bpmn');
```


## Features

* Model BPMN 2.0 diagrams in the browser, without a mouse
* Full undo and redo functionality
* Extensible through your own commands
* Numerous built-in commands:

   * `append source type [deltaPos]`
   * `connect source target type`
   * `create type position parent`
   * `element id`
   * `elements`
   * `move shape delta [newParentId]`
   * `undo`
   * `redo`
   * `save svg|bpmn`
   * `setLabel element label`


## Quickstart

Get the list of available commands:

```
cli.help();
```

Get the list of shapes:

```
cli.shapes();
```

Export SVG or BPMN 2.0 xml

```
cli.save('svg' || 'bpmn');
```


## Usage

Deploy the cli with [bpmn-js](https://github.com/bpmn-io/bpmn-js):

```
var BpmnModeler = require('bpmn-js/lib/Modeler'),
    CliModule = require('bpmn-js-cli');

var modeler = new BpmnModeler({
  container: document.body,
  additionalModules: [ CliModule ],
  cli: { bindTo: 'cli' }
});

modeler.importXML('some-bpmn-xml');
```

Access the cli as `cli` in your developer console (open via `F12` in most browsers).

Use the cli to model BPMN 2.0 diagrams in your browser. Pain free.


## License

MIT
