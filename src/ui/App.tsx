import React, {useState, useEffect} from 'react';
import {BoardList} from './components/BoardList';
import {BoardContext, withBoards} from './BoardContext';
import {TrelloAPIClient} from '../api/trello';
import {TrelloBoard, TrelloBoardWithLists, TrelloList, TrelloCard} from '../models/Trello';
import {log} from '../log';
import {BoardDetails} from './components/BoardDetails';

const WBoardList = withBoards(BoardList);

interface Props {
  trello: TrelloAPIClient;
}


export const App: React.FC<Props> = ({trello}) => {
  const [activeBoard, setActiveBoard] = useState<TrelloBoardWithLists | undefined>(undefined);
  const [boards, setBoards] = useState<TrelloBoard[]>([]);
  const [operationIsPending, setOperationIsPending] = useState(false);

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
      setOperationIsPending(true);
      loadListsForBoard(board);
    }
  }

  async function loadListsForBoard(board: TrelloBoard) {
    log('[App]', 'Loading lists for selected board');
    const lists = await trello.getListsWithCardsOnBoard(board.id);
    log('[App]', 'Got lists for board');
    setActiveBoard({ ...board, lists });
    setOperationIsPending(false);
  }

  async function onMoveCard(card: TrelloCard, newList: TrelloList) {
    setOperationIsPending(true);
    log('[App]', 'Moving card', card.name, 'to list', newList.name);
    await trello.moveCardToList(card, newList);
    if (activeBoard) {
      loadListsForBoard(activeBoard);
    }
  }

  return (
    <BoardContext.Provider value={{boards}}>
      { !activeBoard ? (<WBoardList onSelect={onBoardSelected} />) : (<BoardDetails
      board={activeBoard} onMoveCard={onMoveCard} operationIsPending={operationIsPending}/>)  }
    </BoardContext.Provider>
  );
}

