# bpmn-js-cli

An extensible command line interface for [bpmn-js](https://github.com/bpmn-io/bpmn-js).


## Demo

<img src="https://raw.githubusercontent.com/Nikku/bpmn-js-cli/master/docs/modeling-cli.gif" style="max-width: 800px; box-shadow: 1px 1px 10px 5px rgba(143,143,143,1);" />


## Features

* Model BPMN 2.0 diagrams in the browser, without a mouse
* Full undo and redo functionality
* Extensible through your own commands
* Numerous built-in commands:

   * `append sourceId type [deltaPos]`
   * `move shapeId delta [newParentId]`
   * `undo`
   * `redo`
   * `shape shapeId`
   * `shapes`
   * `save svg|bpmn`


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
