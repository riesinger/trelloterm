import blessed, {Widgets} from "blessed";
import {ControlledWidget} from '../Drawable';
import {TrelloList} from "src/models/Trello";
import {EventBus} from "src/EventBus";
import {log} from "../../log";

export class BoardList implements ControlledWidget {
  private listComponent: Widgets.ListElement;
  private list: TrelloList[] = [];

  constructor(private eventbus: EventBus) {
    this.listComponent = blessed.list({
      width: '50%',
      height: '90%',
      top: 'center',
      left: 'center',
      content: 'Loading boards...',
      label: '[ Board List ]',
      border: {
        type: 'line',
      },
      style: {
        selected: {
          bg: 'white',
          fg: 'black',
        }
      },
      scrollbar: {
        ch: '█',
      },
      mouse: true,
      keys: true,
      vi: true,
    });
    this.listComponent.hide();
    // this.listComponent.key(['enter'], this.onBoardSelected);
    this.listComponent.on('select', this.onBoardSelected);
    eventbus.subscribeTo('boardListVisible', this.setVisible);
    eventbus.subscribeTo('boardListUpdated', this.listUpdated);
  }

  private setVisible = (visible: boolean) => {
    log('Setting board list', visible ? 'visible' : 'hidden');
    if (visible) {
      this.listComponent.show();
      this.listComponent.focus();
    } else {
      this.listComponent.hide();
    }
    this.eventbus.publish('needsRender', null);
  }

  private listUpdated = (list: TrelloList[]) => {
    this.list = list;
    this.listComponent.clearItems();
    this.list.forEach(board => this.listComponent.add(board.name));
    this.eventbus.publish('needsRender', null);
  }

  private onBoardSelected = (event: any) => {
    this.eventbus.publish('boardSelected', this.list.find(board => board.name === event.getText()));
  }

  public appendTo = (node: Widgets.Node) => {
    node.append(this.listComponent);
  }

  public removeFrom = (node: Widgets.Node) => {
    node.remove(this.listComponent);
  }
}
