import React, {useState, useEffect} from 'react';
import {BoardList} from './components/BoardList';
import {BoardContext, withBoards} from './BoardContext';
import {TrelloAPIClient} from '../api/trello';
import {TrelloBoard, TrelloBoardWithLists} from '../models/Trello';
import {log} from '../log';
import {BoardDetails} from './components/BoardDetails';

const WBoardList = withBoards(BoardList);

interface Props {
  trello: TrelloAPIClient;
}


export const App: React.FC<Props> = ({trello}) => {
  const [activeBoard, setActiveBoard] = useState<TrelloBoardWithLists | undefined>(undefined);
  const [boards, setBoards] = useState<TrelloBoard[]>([]);

  async function loadBoards() {
    setBoards(await trello.listBoards());
  }

  useEffect(() => {
    loadBoards();
  }, []);

  function onBoardSelected(board?: TrelloBoard) {
    log('[App]', 'Selected board', board?.name);
    if (board) {
      setActiveBoard(board);
      loadListsForBoard(board);
    }
  }

  async function loadListsForBoard(board: TrelloBoard) {
    log('[App]', 'Loading lists for selected board');
    const lists = await trello.getListsWithCardsOnBoard(board.id);
    log('[App]', 'Got lists for board');
    setActiveBoard({ ...board, lists });
  }

  return (
    <BoardContext.Provider value={{boards}}>
      { !activeBoard ? (<WBoardList onSelect={onBoardSelected} />) : (<BoardDetails board={activeBoard} />)  }
    </BoardContext.Provider>
  );
}

