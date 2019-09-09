export const ADD_NUMBER = "app/play/ADD_NUMBER";
export const REMOVE_NUMBER = "app/play/REMOVE_NUMBER";
export const FORCE_NUMBER = "app/play/FORCE_NUMBER";

export type SelectedNumbers = number[];

export interface AddNumberAction {
  type: typeof ADD_NUMBER;
  payload: number;
}

export interface RemoveNumberAction {
  type: typeof REMOVE_NUMBER;
  payload: number;
}

export interface ForceNumberAction {
  type: typeof FORCE_NUMBER;
  payload: number[];
}

export type ActionTypes =
  | AddNumberAction
  | RemoveNumberAction
  | ForceNumberAction;
