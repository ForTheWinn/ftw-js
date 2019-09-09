import React from "react";

interface BallProps {
  no: number;
  isActive: boolean;
  onClick: (no: number) => void;
}

const Ball = ({ no, isActive, onClick }: BallProps) => {
  const style = {
    ballWrapper: {
      width: "30px",
      height: "30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      margin: "auto",
    },
  };

  return (
    <div
      onClick={() => onClick(no)}
      className={isActive ? "has-background-primary" : "has-background-light"}
      style={style.ballWrapper}
    >
      <span className="is-size-7">{no}</span>
    </div>
  );
};

export default Ball;
