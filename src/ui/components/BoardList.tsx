import React, { useEffect, useRef } from 'react';
import {TrelloBoard} from "../../models/Trello";
import {log} from '../../log';
import {Widgets} from 'blessed';

interface Props {
  boards: TrelloBoard[];
  onSelect: (_: TrelloBoard | undefined) => void;
}

export const BoardList = ({ boards, onSelect: onSelectEvent }: Props) => {
  const listRef = useRef<Widgets.ListElement>(null);

  useEffect(() => {
    listRef?.current?.focus();
  }, [])

  function onSelect(event: any) {
    const board = boards.find(board => board.name === event.getText());
    log('[BoardList]', 'Selected board with name', event.getText());
    onSelectEvent(board);
  }

  return (
    <blessed-list
      width="50%"
      height="90%"
      top="center"
      left="center"
      label="[Board List]"
      border={{type: 'line'}}
      style={{ selected: { bg: 'white', fg: 'black' } }}
      scrollbar={{ch: '█', fg: 'green'}}
      scrollable
      mouse
      keys
      vi
      focus
      content="Loading boards..."
      items={boards && boards.map(board => board.name)}
      onSelect={onSelect}
      ref={listRef}>
    </blessed-list>
  );
}
