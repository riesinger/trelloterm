import { ControlledWidget } from '../Drawable';
import blessed, {Widgets} from 'blessed';
import { Track } from './Track';
import { EventBus } from '../../EventBus';
import { TrelloListWithCards, TrelloCard } from 'src/models/Trello';
import {Card} from 'src/models/Card';

export class BoardDetails implements ControlledWidget {
  private box : Widgets.BoxElement;
  private headerBar : Widgets.TextElement;
  private tracks : Widgets.ListElement[] = [];

  constructor(private eventbus: EventBus) {
    this.box = blessed.box({
      width: '100%',
      height: '100%',
      content: 'Hello {bold}world{/bold}',
      tags: true,
    });

    this.headerBar = blessed.text({
      width: '100%',
      content: 'Loading Board...',
      style: {
        bg: 'white',
        fg: 'black',
      },
    })
    this.box.append(this.headerBar);
    this.box.hide();
    eventbus.subscribeTo('boardUpdated', this.onBoardUpdated);
    eventbus.subscribeTo('boardDetailsVisible', (visible: boolean) => {
      if (visible) {
        this.box.show();
        this.box.focus();
      } else {
        this.box.hide();
      }
    });
  }

  private onBoardUpdated = (message: any) => {
    this.headerBar.setContent(message.name!);
    for (let track of this.tracks) {
      this.box.remove(track);
    }
    this.tracks = message.lists.map(this.buildTrackFromList);
    for (let track of this.tracks) {
      this.box.append(track);
    }
    this.eventbus.publish('needsRender', null);
  }

  private buildTrackFromList = (list: TrelloListWithCards, index: number) => (
    Track(list.name, index, this.buildCards(list.cards))
  )

  private buildCards = (cards: TrelloCard[]): Card[] => cards.map(card => ({
    title: card.name,
    description: card.desc,
    labels: [],
    members: [],
  }));

  public appendTo = (screen: Widgets.Screen) => {
    screen.append(this.box);
  }

  public removeFrom = (screen: Widgets.Screen) => {
    screen.remove(this.box);
  }

}
