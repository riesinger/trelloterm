import React from 'react';
import blessed from 'blessed'; // TODO: Switch out for neo-blessed
import {createBlessedRenderer} from 'react-blessed';
import { App } from './App';
import {TrelloAPIClient} from '../api/trello';

let screen = blessed.screen({
  smartCSR: true,
  dockBorders: true,
  title: 'Trello',
});

export function initUI(trello: TrelloAPIClient, onExit: Function) {
  screen = blessed.screen({
    smartCSR: true,
    dockBorders: true,
    title: 'Trello',
  });
  screen.enableInput();
  screen.key(['escape', 'q', 'C-c', 'C-d'], () => onExit());
  const render = createBlessedRenderer(blessed);
  render(<App trello={trello}/>, screen);
}

