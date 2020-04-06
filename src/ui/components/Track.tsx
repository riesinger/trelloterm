import React from 'react';
import { TrelloCard } from '../../models/Trello';

const TRACK_WIDTH = 35;
const TRACK_HEIGHT = '95%';

interface Props {
  title: string;
  index: number;
  cards: TrelloCard[];
  active: boolean;
}

export const Track: React.FC<Props> = ({title, index, cards, active}) => {
  return (
    <blessed-list
      items={cards.map(card => card.name)}
      label={`᚜ ${title} ᚛`}
      width={TRACK_WIDTH}
      height={TRACK_HEIGHT}
      top={1}
      left={index * TRACK_WIDTH}
      border={{type: 'line'}}
      style={{selected: { bg: 'white', fg: 'black' }}}>
    </blessed-list>
  )
}

