import fetch, { RequestInit } from 'node-fetch';
import { TrelloList, TrelloBoard, TrelloCard } from '../models/Trello';

export class TrelloAPIClient {
  constructor(private readonly key: string, private readonly token: string) {
  }

  public listBoards = async () => {
    return await this.doRequest<TrelloBoard[]>('/members/me/boards', {fields: ['name', 'id'], filter: ['open']});
  }

  public getBoardDetails = async (boardID: string) => {
    return await this.doRequest<TrelloBoard>(`/boards/${boardID}`);
  }

  public getListsOnBoard = async (boardID: string) => {
    return await this.doRequest<TrelloList[]>(`/boards/${boardID}/lists`, {fields: ['name', 'id', 'closed', 'subscribed']});
  }

  public getCardsInList = async (listID: string) => {
    return await this.doRequest<TrelloCard[]>(`/lists/${listID}/cards`);
  }

  public getListsWithCardsOnBoard = async (boardID: string) => {
    const lists = await this.getListsOnBoard(boardID);
    // Enrich lists with card information
    return await Promise.all(lists.map(async (list: TrelloList) => ({ ...list, cards: await this.getCardsInList(list.id) })));
  }

  public moveCardToList = async (card: TrelloCard, list: TrelloList) => {
    return await this.doRequest<null>(`/cards/${card.id}`, { 'idList': [list.id] }, { method: 'PUT' });
  }

  private doRequest = async <T>(endpoint: string, queryParams?: QueryParams, options?: RequestInit): Promise<T> => {
    const response = await fetch(`https://api.trello.com/1${endpoint}?${this.buildQueryParams(queryParams)}key=${this.key}&token=${this.token}`, options);
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Failed to fetch ${endpoint}: ${JSON.stringify(await response.text())}`);
    }
    return await response.json();
  }

  private buildQueryParams(queryParams?: QueryParams) {
    if (!queryParams) {
      return '';
    }
    return `${Object.entries(queryParams).map(([key, values]) => `${key}=${values.join(',')}`).join('&')}&`
  }
}

interface QueryParams {
  [param: string]: string[]
}

