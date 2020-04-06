export interface TrelloBoard {
  name: string,
  id: string,
}

export interface TrelloBoardDetails {
  name: string,
  id: string,
}

export interface TrelloBoardWithLists extends TrelloBoard {
  lists?: TrelloListWithCards[];
}

export interface TrelloList {
  id: string,
  name: string,
  closed: boolean,
  subscribed: boolean,
}

export interface TrelloListWithCards extends TrelloList {
  cards: TrelloCard[],
}

export interface TrelloCard {
  id: string,
  closed: boolean,
  dateLastActivity: string,
  desc: string,
  descData: any | null,
  idLabels: string[],
  name: string,
  due: unknown | null,
  dueComplete: boolean,
  idMembers: string[],
  subscribed: boolean,
  labels: TrelloLabel[],
}

export interface TrelloLabel {
  id: string,
  idBoard: string,
  name: string,
  color: string,
}
