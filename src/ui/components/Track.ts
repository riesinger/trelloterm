import { Card as CardModel } from '../../models/Card';
import blessed, {Widgets} from 'blessed';

const TRACK_WIDTH = 35;
const TRACK_HEIGHT = '95%';

export function Track(title: string, index: number, cards: CardModel[]): Widgets.ListElement {
  return blessed.list({
      vi: true,
      items: cards.map(card => card.title),
      label: `᚜ ${title} ᚛`,
      width: TRACK_WIDTH,
      height: TRACK_HEIGHT,
      top: 1,
      left: index * TRACK_WIDTH,
      border: {
        type: 'line',
      }
    });
}

