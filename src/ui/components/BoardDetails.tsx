import React from 'react';
import {TrelloBoardWithLists} from '../../models/Trello';
import {Track} from './Track';

export const BoardDetails: React.FC<{board: TrelloBoardWithLists}> = ({board}) => {
  return (
    <blessed-box width="100%" height="100%">
      <blessed-text width="100%" content={board.lists ? board.name : `Loading board ${board.name}...`} style={{bg: 'white', fg: 'black'}} />
      <>
        { board.lists && board.lists.map((list, i) => (<Track key={list.name} title={list.name} index={i} cards={list.cards} active={false}/> )) }
      </>
    </blessed-box>
  )
}

