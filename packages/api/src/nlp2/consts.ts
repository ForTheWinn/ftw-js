export const FTX_CONTRACT_SCRIPT_HASH = "aac66f9779ca67d819d05492805d251dab02fc7b";
export const CONTRACT_SCRIPT_HASH = "ada839286d23cdfb42eb556461b9382d02b6e12f";

export const FETCH_METHODS = {
  entry: "getLotteryTicket",
  result: "getLotteryResult",
  winner: "getLotteryWinner",
};

export const INVOKE_METHODS = {
  buy: (args: any) => {
    return {
      operation: "buyLotteryTicket",
      scriptHash: CONTRACT_SCRIPT_HASH,
      args: [
        {
          type: "Address",
          value: args[0],
        },
        {
          type: "Integer",
          value: args[1],
        },
        {
          type: "Integer",
          value: args[2],
        },
        {
          type: "Integer",
          value: args[3],
        },
        {
          type: "Integer",
          value: args[4],
        },
        {
          type: "Integer",
          value: args[5],
        },
        {
          type: "Integer",
          value: args[6],
        },
        {
          type: "Integer",
          value: args[7],
        },
      ],
    };
  },
  draw: (args: any) => {
    return {
      operation: "drawLottery",
      scriptHash: CONTRACT_SCRIPT_HASH,
      args: [
        {
          type: "Address",
          value: args[0],
        },
      ],
    };
  },
  verify: (args: any) => {
    const script = {
      operation: "verityLotteryTicket",
      scriptHash: CONTRACT_SCRIPT_HASH,
      args: [
        {
          type: "Address",
          value: args[0],
        },
      ],
    };
    // If there is ticket no
    if (args[1]) {
      script.args.push({
        type: "Integer",
        value: args[1],
      });
    }
    return script;
  },
  claim: (args: any) => {
    const script = {
      operation: "claimLotteryWinningTicket",
      scriptHash: CONTRACT_SCRIPT_HASH,
      args: [
        {
          type: "Address",
          value: args[0],
        },
      ],
    };
    // If there is ticket no
    if (args[1]) {
      script.args.push({
        type: "Integer",
        value: args[1],
      });
    }
    return script;
  },
  withdraw: (args: any) => {
    const script = {
      operation: "withdrawFund",
      scriptHash: CONTRACT_SCRIPT_HASH,
      args: [
        {
          type: "Address",
          value: args[0],
        },
        {
          type: "Integer",
          value: args[1],
        },
        {
          type: "ByteArray",
          value: args[2],
        },
      ],
    };
    return script;
  },
};
