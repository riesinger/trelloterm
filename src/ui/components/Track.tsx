import React, { useEffect, useRef, useState } from 'react';
import { TrelloCard } from '../../models/Trello';
import {Widgets} from 'blessed';
import {log} from '../../log';

const TRACK_HEIGHT = '95%';
const MIN_TRACK_WIDTH = 25;

interface Props {
  title: string;
  index: number;
  numberOfLists: number;
  cards: TrelloCard[];
  active: boolean;
  onSelectLeftList: () => void;
  onSelectRightList: () => void;
  onMoveCardToList: (card: TrelloCard, listIndex: number) => void;
}

const colorMap: { [trelloColorName: string]: string } = {
  "red": "red",
  "blue": "blue",
  "green": "green",
  "yellow": "yellow",
  "purple": "#c377e0",
  "orange": "#ff9f1a",
  "black": "#555555",
  "sky": "#ff9f1a",
  "pink": "#ff78cb",
  "lime": "#51e898",
  "white": "white",
}

const truncateText = (text: string, n: number) => text.length < n ? text : text.substring(0, n - 2) + '…';
const mapColor = (colorName: string) => colorMap[colorName] || 'black';

export const Track: React.FC<Props> = ({title, index, numberOfLists, cards, active,
                                       onSelectLeftList, onSelectRightList, onMoveCardToList}) => {
  // Fill the width of the parent. However, use a minimum width for each list.
  const width = Math.max(Math.floor(100 / numberOfLists), MIN_TRACK_WIDTH);
  const listRef = useRef<Widgets.BoxElement>(null);
  const [selectedCard, setSelectedCard] = useState(0);
  const [screenWidth, setScreenWidth] = useState(1);

  useEffect(() => {
    if (active) {
      log('[Track]', 'Focusing track', index);
      listRef?.current?.focus();
    }
  }, [active]);

  useEffect(() => {
    if (listRef?.current?.screen.width.valueOf()) {
      setScreenWidth(parseInt(listRef?.current?.screen.width.toString() || '1', 10));
    }
  }, [ listRef?.current?.screen.width ]);

  function onKeypress(key: string) {
    // TODO: Key press events to implement:
    // gg - Move to top
    // G - Move to bottom
    // Shift-J - Move selected card down
    // Shift-K - Move selected card up
    log('[Track]', 'Key pressed:', key);
    if (key === 'h') {
      onSelectLeftList();
    } else if (key === 'l') {
      onSelectRightList();
    } else if (key === 'j') {
      setSelectedCard(Math.min(cards.length, selectedCard + 1));
      log('[Track]', index, 'Selected card', selectedCard);
    } else if (key === 'k') {
      setSelectedCard(Math.max(0, selectedCard - 1));
      log('[Track]', index, 'Selected card', selectedCard);
    } else if (key === '>') {
      onMoveCardToList(cards[selectedCard], index + 1);
    } else if (key === '<') {
      onMoveCardToList(cards[selectedCard], index - 1);
    }

  }

  return (
    <blessed-box
      label={`᚜ ${title} ᚛`}
      width={`${width}%`}
      height={TRACK_HEIGHT}
      top={1}
      left={`${index * width}%`}
      border={{type: 'line'}}
      scrollable
      scrollbar={{ch: '█', fg: 'green'}}
      keys
      vi
      mouse
      interactive
      style={{selected: { bg: 'white', fg: 'black' }, border: { fg: active ? 'green': 'white' }}}
      onKeypress={onKeypress}
      ref={listRef}>
      { cards.map((card, i) => (
        <blessed-text
          top={i}
          left={0}
          width="100%-4"
          height={1}
          content={truncateText(card.name, Math.floor(screenWidth * (width / 100)) - 3)}
          key={card.name}
          style={{
            bg: (selectedCard === i) ? 'white': 'black',
            fg: (selectedCard !== i) ? mapColor((card.labels[0] !== undefined) ? card.labels[0].color : 'white') : 'black',
          }}/>
      )) }
      </blessed-box>
  )
}

