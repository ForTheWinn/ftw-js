import { u } from "@cityofzion/neon-js";
import { convertAddress, convertNumber, deserializeValue } from "./helpers";
import { APIStatus, EntryItem, ResultItem, StackItem } from "./types";

type NLP2Status = Omit<APIStatus, "address" | "rpcEndpoint">;

export function parseStatus(stack: StackItem[]): NLP2Status {
  const jackpots = deserializeValue(stack[1].value);
  return {
    nextDrawingAt: Date.now() + Math.abs(parseInt(stack[0].value) * 1000),
    availableVerifications: convertNumber(stack[2].value),
    lotteryParticipation: !!stack[3].value,
    contractBalance: {
      FTX: u.fixed82num(stack[4].value),
      CNEO: u.fixed82num(stack[5].value),
      CGAS: u.fixed82num(stack[6].value),
    },
    currentJackpot: {
      FTX: u.fixed82num(jackpots[0].value),
      CNEO: u.fixed82num(jackpots[1].value),
      CGAS: u.fixed82num(jackpots[2].value),
    },
    indexes: {
      currentLotteryNo: convertNumber(stack[7].value),
      currentTicketHeight: convertNumber(stack[8].value),
      currentWinnerHeight: convertNumber(stack[9].value),
      currentResultHeight: convertNumber(stack[7].value) - 1,
      currentVerificationHeight: convertNumber(stack[10].value),
      currentClaimHeight: convertNumber(stack[11].value),
    },
    settings: {
      totalBalls: 5,
      maxNumber: 49,
    },
    assets: {
      FTX: u.fixed82num(stack[12].value),
    },
  };
}

export function parseEntry(byteArray: string): EntryItem {
  const data = deserializeValue(byteArray);
  return {
    gameNo: convertNumber(data[0].value),
    ticketNo: convertNumber(data[1].value),
    ticketCurrency: convertNumber(data[2].value),
    player: convertAddress(data[3].value),
    numbers: data[4].value.map((item: StackItem) => convertNumber(item.value)),
    isVerified: !!data[5].value[0].value,
    matched: convertNumber(data[5].value[1].value),
    isClaimed: !!data[6].value[0].value,
    prize: u.fixed82num(data[6].value[1].value),
    createdAt: convertNumber(data[7].value),
    referral: convertAddress(data[8].value),
  };
}

export function parseResult(byteArray: string): ResultItem {
  const data = deserializeValue(byteArray);
  return {
    gameNo: convertNumber(data[0].value),
    winningNumbers: data[1].value.map((item: StackItem) => convertNumber(item.value)),
    lastTicketNo: convertNumber(data[2].value),
    caster: convertAddress(data[3].value),
    ftxWinners: data[6].value.map((item: StackItem) => convertNumber(item.value)),
    cneoWinners: data[7].value.map((item: StackItem) => convertNumber(item.value)),
    cgasWinners: data[8].value.map((item: StackItem) => convertNumber(item.value)),
    totalTickets: convertNumber(data[9].value[0].value),
    totalVerifiedTickets: convertNumber(data[9].value[1].value),
    createdAt: convertNumber(data[10].value),
  };
}

export default {
  status: parseStatus,
  entry: parseEntry,
  result: parseResult,
};
