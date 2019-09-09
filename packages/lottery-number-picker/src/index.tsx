import React, { useReducer } from "react";
import ChooseNumbers from "./components/choose-numbers";
import DisplaySelectedNumbers from "./components/display-selected-numbers";
import { addNumber, reducer, removeNumber, forceNumber } from "./reducer";
import _ from "underscore";
import { SelectedNumbers } from "./types";
import Header from "./components/header";
import Ball from "./components/display-selected-numbers/components/ball";

interface Props {
  onBuy: (numbers: SelectedNumbers) => void;
  maxNumber: number;
  totalBalls: number;
}

const Play = (props: Props) => {
  const { onBuy, maxNumber, totalBalls } = props;

  const [selectedNumbers, dispatch] = useReducer(reducer, []);

  const onClickNumber = (no: number): void => {
    if (selectedNumbers.includes(no)) {
      const index = selectedNumbers.indexOf(no);
      dispatch(removeNumber(index));
    } else {
      if (selectedNumbers.length < totalBalls) {
        dispatch(addNumber(no));
      }
    }
  };

  const onAutoPick = (): void => {
    let randomNumbers: SelectedNumbers = [];
    if (selectedNumbers.length === totalBalls) {
      randomNumbers = _.sample(_.range(1, maxNumber + 1), totalBalls);
    } else {
      const range = _.range(1, maxNumber + 1).filter(n => {
        return !selectedNumbers.includes(n);
      });
      const samples = _.sample(range, totalBalls - selectedNumbers.length);
      // @ts-ignore
      randomNumbers = _.union(selectedNumbers, samples);
    }
    dispatch(forceNumber(randomNumbers));
  };

  const resetNumbers = (): void => {
    dispatch(forceNumber([]));
  };

  return (
    <div className="box">
      <Header
        selectedNumbers={selectedNumbers}
        onAutoPick={onAutoPick}
        resetNumbers={resetNumbers}
      />
      <hr />
      <DisplaySelectedNumbers totalBalls={totalBalls} selectedNumbers={selectedNumbers} />
      <hr />
      <ChooseNumbers
        maxNumber={maxNumber}
        selectedNumbers={selectedNumbers}
        onClick={onClickNumber}
      />
      <hr />
      <button
        className="button is-primary"
        disabled={selectedNumbers.length === 0}
        onClick={() => onBuy(selectedNumbers)}
      >
        Buy ticket
      </button>
    </div>
  );
};

export { Ball };

export default Play;
