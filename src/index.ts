import { initUI } from './ui';
import {TrelloAPIClient} from './api/trello';
import {EventBus} from './EventBus';
import dotenv from 'dotenv';
import {TrelloBoard} from 'src/models/Trello';
import {log} from './log';

async function main() {
  const eventbus = new EventBus();
  const key = process.env.TRELLO_KEY;
  const token = process.env.TRELLO_TOKEN;
  if (!key || !token) {
    throw new Error('TRELLO_KEY or TRELLO_TOKEN are missing');
  }
  const trello = new TrelloAPIClient(key, token);
  initUI(eventbus);
  try {
    const boards = await trello.listBoards();
    eventbus.publish('boardListUpdated', boards);
    eventbus.publish('boardListVisible', true);
    eventbus.subscribeTo('boardSelected', boardSelected);

    async function boardSelected(board: TrelloBoard) {
      eventbus.publish('boardDetailsVisible', true );
      eventbus.publish('boardListVisible', false );
      const boardDetails = await trello.getBoardDetails(board.id);
      const boardLists = await trello.getListsWithCardsOnBoard(board.id);
      if (boardDetails && boardLists) {
        eventbus.publish('boardUpdated', { ...boardDetails, lists: boardLists} );
      }
    }

  } catch (error) {
    log(error);
  }

  log('[Main] Setup done');
  eventbus.subscribeTo('applicationExit', () => {
    log('[Main] Bye');
    process.exit(0);
  });
}

dotenv.config();
main().then(() => log('[Main] Done')).catch(error => log(error));

