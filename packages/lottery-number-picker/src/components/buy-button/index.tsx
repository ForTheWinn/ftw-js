import React, { ReactElement } from "react";
import { Button } from "antd";

interface Props {
  isDisabled: boolean;
  handleSubmit: () => void;
}

const BuyButton = ({ handleSubmit, isDisabled }: Props): ReactElement => {
  return (
    <Button disabled={isDisabled} onClick={handleSubmit} type="primary" block>
      Buy ticket
    </Button>
  );
};

export default BuyButton;
