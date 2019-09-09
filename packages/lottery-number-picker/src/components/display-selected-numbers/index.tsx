import React from "react";
import _ from "underscore";
import Ball from "./components/ball";

interface Props {
  totalBalls: number;
  selectedNumbers: number[];
}

const DisplayNumbers = ({ totalBalls, selectedNumbers }: Props) => {
  const style = {
    wrapper: {
      display: "flex",
      justifyContent: "space-evenly",
    },
  };
  return (
    <div style={style.wrapper}>
      {_.range(1, totalBalls + 1).map((no: number, i: number) => {
        const selectedNo = selectedNumbers[i];
        return <Ball key={no} no={selectedNo} isActive={!!selectedNo} />;
      })}
    </div>
  );
};
export default DisplayNumbers;
