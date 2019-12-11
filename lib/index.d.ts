declare module 'bpmn-js-cli' {
  export { Cli, Initializer } from 'bpmn-js-cli/lib';
}

declare module 'bpmn-js-cli/lib' {
  import { Connection, Shape } from 'bpmn-js';
  import { Injector } from 'didi';

  export interface Point {
    x: number;
    y: number;
  }

  /**
   * The default CLI initializer that sets up available parsers and commands.
   *
   * @param cli The Cli object to initialize
   */
  export function Initializer(cli: Cli): void;

  export class Cli {
    constructor(config: any, injector: Injector);

    append(source: string | Shape, type: string, delta: string | Point): string;

    connect(
      sourceId: string | Shape,
      target: string | Shape,
      type: string,
      parent?: string | Shape
    ): string;

    create(
      type: string,
      position: Point,
      parent: string | Shape,
      isAttach?: boolean
    ): string;

    elements(): string[];

    move(
      shapes: (string | Shape)[],
      delta: Point,
      newParent?: string | Shape,
      isAttach?: boolean
    ): Shape[];

    removeConnection(element: string | Connection): Connection;

    removeShape(shape: string | Shape): Shape;

    setLabel(element: string | Shape, label: string): void;

    undo(): void;

    redo(): void;

    save(format: 'svg' | 'bpmn'): void;
  }
}
