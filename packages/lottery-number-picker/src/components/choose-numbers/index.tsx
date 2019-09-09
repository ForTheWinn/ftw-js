import React from "react";
import _ from "underscore";
import Ball from "./components/ball";

interface Props {
  maxNumber: number;
  selectedNumbers: number[];
  onClick: (no: number) => void;
}

const ChooseNumbers = ({ maxNumber, selectedNumbers, onClick }: Props) => {
  return (
    <div className="columns is-mobile is-multiline">
      {_.range(1, maxNumber + 1).map((no: number, i) => {
        return (
          <div key={no} className="column is-2">
            <Ball onClick={onClick} no={no} isActive={selectedNumbers.includes(no)} />
          </div>
        );
      })}
    </div>
  );
};

export default ChooseNumbers;
