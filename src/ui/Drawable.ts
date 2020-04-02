import { Widgets } from 'blessed';

export interface ControlledWidget {
  appendTo(node: Widgets.Node): void,
  removeFrom(node: Widgets.Node): void,
}

export type UncontrolledWidget = Widgets.Node;

