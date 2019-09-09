import {
  ActionTypes,
  ADD_NUMBER,
  AddNumberAction,
  FORCE_NUMBER,
  ForceNumberAction,
  REMOVE_NUMBER,
  RemoveNumberAction,
  SelectedNumbers,
} from "./types";

export const reducer = (numbers: SelectedNumbers, action: ActionTypes) => {
  switch (action.type) {
    case ADD_NUMBER:
      return [...numbers, action.payload];
    case REMOVE_NUMBER:
      return numbers.filter((_, index) => index !== action.payload);
    case FORCE_NUMBER:
      return action.payload;
    default:
      return numbers;
  }
};

export const addNumber = (no: number): AddNumberAction => {
  return {
    type: ADD_NUMBER,
    payload: no,
  };
};

export const removeNumber = (index: number): RemoveNumberAction => {
  return {
    type: REMOVE_NUMBER,
    payload: index,
  };
};

export const forceNumber = (numbers: number[]): ForceNumberAction => {
  return {
    type: FORCE_NUMBER,
    payload: numbers,
  };
};
