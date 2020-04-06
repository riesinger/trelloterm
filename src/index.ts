import { initUI } from './ui';
import {TrelloAPIClient} from './api/trello';
import dotenv from 'dotenv';
import {log} from './log';

async function main() {
  const key = process.env.TRELLO_KEY;
  const token = process.env.TRELLO_TOKEN;
  if (!key || !token) {
    throw new Error('TRELLO_KEY or TRELLO_TOKEN are missing');
  }
  const trello = new TrelloAPIClient(key, token);
  initUI(trello, () => {
    process.exit(0);
  });
}

dotenv.config();
main()
  .then(() => log('[Main] Started'))
  .catch((error) => {
    log(error);
    process.exit(1);
  });

