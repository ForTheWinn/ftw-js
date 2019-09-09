import React from "react";
import { FaMagic, FaTrash } from "react-icons/fa";

interface Props {
  onPick: () => void;
  onReset: () => void;
  hasNumber: boolean;
}

const AutopickButtons = ({ onPick, onReset, hasNumber }: Props) => {
  return (
    <div className="buttons">
      <button className="button is-small" onClick={onPick}>
        <FaMagic />
      </button>
      {hasNumber ? (
        <button className="button is-small" onClick={onReset}>
          <FaTrash />
        </button>
      ) : (
        false
      )}
    </div>
  );
};

export default AutopickButtons;
