import React, { createContext, useContext } from 'react';
import {TrelloBoard} from '../models/Trello';

export const BoardContext = createContext<{boards: TrelloBoard[]}>({boards: []});

export const withBoards = <P extends object>(Component: React.ComponentType<P>) => (props: any) => {
  const context = useContext(BoardContext);
  return (<Component {...props} {...context} />);
}
