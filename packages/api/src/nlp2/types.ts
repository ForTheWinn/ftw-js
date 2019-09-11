export interface APIStatus {
  rpcEndpoint: string;
  address?: string;
  nextDrawingAt: number;
  currentJackpot: {
    FTX: number;
    CNEO: number;
    CGAS: number;
  };
  availableVerifications: number;
  lotteryParticipation: boolean;
  contractBalance: {
    FTX: number;
    CNEO: number;
    CGAS: number;
  };
  indexes: {
    currentLotteryNo: number;
    currentTicketHeight: number;
    currentWinnerHeight: number;
    currentResultHeight: number;
    currentVerificationHeight: number;
    currentClaimHeight: number;
  };
  settings: {
    totalBalls: number;
    maxNumber: number;
  };
  assets: {
    FTX: number;
  };
}

export interface StackItem {
  type: string;
  value: string;
}

export interface Entries {
  items: EntryItem[];
  totalItems: number;
}

export interface EntryItem {
  gameNo: number;
  ticketNo: number;
  ticketCurrency: number;
  player: string;
  numbers: [number];
  isVerified: boolean;
  matched: number;
  isClaimed: boolean;
  prize: number;
  createdAt: number;
  referral: string;
}

export interface Results {
  items: ResultItem[];
  totalItems: number;
}

export interface ResultItem {
  gameNo: number;
  winningNumbers: [number];
  lastTicketNo: number;
  caster: string;
  ftxWinners: [number];
  cneoWinners: [number];
  cgasWinners: [number];
  totalTickets: number;
  totalVerifiedTickets: number;
  createdAt: number;
}
