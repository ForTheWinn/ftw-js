import React, { ReactElement } from "react";

interface Props {
  isDisabled: boolean;
  handleSubmit: () => void;
}

const BuyButton = ({ handleSubmit, isDisabled }: Props): ReactElement => {
  return (
    <button
      className="button is-primary"
      disabled={isDisabled}
      onClick={handleSubmit}
      type="button"
    >
      Buy ticket
    </button>
  );
};

export default BuyButton;
