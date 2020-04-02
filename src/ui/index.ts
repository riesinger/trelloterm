import blessed from 'blessed';
import { Widgets } from 'blessed';
import {BoardDetails} from './components/BoardDetails';
import {EventBus} from '../EventBus';
import {BoardList} from './components/BoardList';
import {log} from '../log';

let screen: Widgets.Screen | null = null;

export function initUI(eventbus: EventBus) {
  screen = blessed.screen({
    smartCSR: true,
    dockBorders: true,
    title: 'Trello',
  });
  screen.enableInput();
  screen.key('C-c', () => eventbus.publish('applicationExit'));
  screen.key('C-d', () => eventbus.publish('applicationExit'));
  new BoardList(eventbus).appendTo(screen);
  new BoardDetails(eventbus).appendTo(screen);
  screen.render();
  eventbus.subscribeTo('needsRender', () => {
    log('[UI] rendering');
    screen!.render();
  });
}

