import React from "react";
import AutopickButtons from "../autopic-button";

interface HeaderProps {
  onAutoPick: () => void;
  resetNumbers: () => void;
  selectedNumbers: number[];
}

const Header = ({ onAutoPick, resetNumbers, selectedNumbers }: HeaderProps) => {
  return (
    <div
      className="is-flex"
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px",
      }}
    >
      <h5 className="title is-6 is-marginless">Buy ticket</h5>
      <AutopickButtons
        onPick={onAutoPick}
        onReset={resetNumbers}
        hasNumber={selectedNumbers.length > 0}
      />
    </div>
  );
};

export default Header;
