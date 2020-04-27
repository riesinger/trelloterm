import React, { useState, useEffect } from 'react';
import {TrelloBoardWithLists, TrelloCard, TrelloList} from '../../models/Trello';
import {Track} from './Track';
import {log} from '../../log';

interface Props {
  board: TrelloBoardWithLists;
  onMoveCard: (card: TrelloCard, newList: TrelloList) => void;
}

export const BoardDetails: React.FC<Props> = ({board, onMoveCard}) => {
  const [ activeTrack, setActiveTrack ] = useState(0);

  useEffect(() => {
    log('[BoardDetails]', 'Opening for board', board.name);
  }, []);

  function onSelectLeftList() {
    log('[BoardDetails]', 'Selecting list', activeTrack - 1);
    setActiveTrack(Math.max(0, activeTrack - 1));
  }

  function onSelectRightList() {
    log('[BoardDetails]', 'Selecting list', activeTrack + 1);
    setActiveTrack(Math.min(board.lists?.length || 0, activeTrack + 1));
  }

  function onMoveCardToList(card: TrelloCard, listIndex: number) {
    if (listIndex < 0 || listIndex > (board.lists?.length || 0) - 1) {
      return;
    }
    if (board.lists?.[listIndex]) {
      onMoveCard(card, board.lists?.[listIndex]);
    }
  }

  // onKeypress does not work here
  return (
    <blessed-box width="100%" height="100%" scrollable>
      <blessed-text width="100%" content={board.lists ? board.name : `Loading board ${board.name}...`} style={{bg: 'white', fg: 'black'}} />
      <>
        { board.lists && board.lists.map((list, i) => (
          <Track key={list.name} title={list.name} index={i} numberOfLists={board.lists?.length || 0} cards={list.cards}
          active={i === activeTrack} onSelectLeftList={onSelectLeftList}
          onSelectRightList={onSelectRightList}
          onMoveCardToList={onMoveCardToList}/>
        )) }
      </>
    </blessed-box>
  )
}

