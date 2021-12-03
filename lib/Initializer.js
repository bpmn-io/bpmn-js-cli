import {
  PointParser,
  ElementParser,
  ElementsParser,
  ShapeParser,
  ShapesParser
} from './parsers';

import {
  AppendCommand,
  ConnectCommand,
  ColorCommand,
  CreateCommand,
  ElementCommand,
  ElementsCommand,
  MoveCommand,
  RedoCommand,
  SaveCommand,
  SetLabelCommand,
  UndoCommand,
  RemoveShapeCommand,
  RemoveConnectionCommand,
  RemoveCommand
} from './commands';

/**
 * The default CLI initializer that sets up available
 * parsers and commands.
 *
 * @param {Cli} cli
 */
export default function Initializer(cli) {

  // parsers
  cli._registerParser('point', PointParser);
  cli._registerParser('element', ElementParser);
  cli._registerParser('elements', ElementsParser);
  cli._registerParser('shape', ShapeParser);
  cli._registerParser('shapes', ShapesParser);

  // commands
  cli._registerCommand('append', AppendCommand);
  cli._registerCommand('connect', ConnectCommand);
  cli._registerCommand('color', ColorCommand);
  cli._registerCommand('create', CreateCommand);
  cli._registerCommand('element', ElementCommand);
  cli._registerCommand('elements', ElementsCommand);
  cli._registerCommand('move', MoveCommand);
  cli._registerCommand('redo', RedoCommand);
  cli._registerCommand('save', SaveCommand);
  cli._registerCommand('setLabel', SetLabelCommand);
  cli._registerCommand('undo', UndoCommand);
  cli._registerCommand('removeShape', RemoveShapeCommand);
  cli._registerCommand('removeConnection', RemoveConnectionCommand);
  cli._registerCommand('remove', RemoveCommand);
}

Initializer.$inject = [ 'cli' ];