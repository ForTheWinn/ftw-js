import Neon, { u, wallet, rpc } from "@cityofzion/neon-js";
import NEOAPI from "../neo";
import Parsers from "./parsers";
import {
  CONTRACT_SCRIPT_HASH,
  FETCH_METHODS,
  FTX_CONTRACT_SCRIPT_HASH,
  INVOKE_METHODS,
} from "./consts";
import { APIStatus, Entries, StackItem, Results } from "./types";

class NLP2API extends NEOAPI {
  status: APIStatus;

  static getContractScriptHash = CONTRACT_SCRIPT_HASH;
  static getFetchMethod = FETCH_METHODS;
  static getInvokeScript = INVOKE_METHODS;
  static getParser = Parsers;

  constructor(status: APIStatus) {
    super();
    this.status = status;
  }

  static async getStatus(address?: string): Promise<APIStatus> {
    const addressHash = address ? u.reverseHex(wallet.getScriptHashFromAddress(address)) : "";
    const sb = Neon.create.scriptBuilder();
    sb.emitAppCall(CONTRACT_SCRIPT_HASH, "getTimeLeft", []);
    sb.emitAppCall(CONTRACT_SCRIPT_HASH, "getLotteryCurrentJackpots", []);
    sb.emitAppCall(CONTRACT_SCRIPT_HASH, "getLotteryVerification", []);
    sb.emitAppCall(CONTRACT_SCRIPT_HASH, "getLotteryParticipation", [addressHash]);
    sb.emitAppCall(CONTRACT_SCRIPT_HASH, "getLotteryUserBalance", [
      addressHash,
      u.str2hexstring("FTX"),
    ]);
    sb.emitAppCall(CONTRACT_SCRIPT_HASH, "getLotteryUserBalance", [
      addressHash,
      u.str2hexstring("CNEO"),
    ]);
    sb.emitAppCall(CONTRACT_SCRIPT_HASH, "getLotteryUserBalance", [
      addressHash,
      u.str2hexstring("CGAS"),
    ]);
    sb.emitAppCall(CONTRACT_SCRIPT_HASH, "getLotteryHeight", []);
    sb.emitAppCall(CONTRACT_SCRIPT_HASH, "getLotteryEntryHeight", []);
    sb.emitAppCall(CONTRACT_SCRIPT_HASH, "getLotteryWinnerHeight", []);
    sb.emitAppCall(CONTRACT_SCRIPT_HASH, "getLotteryVerificationHeight", []);
    sb.emitAppCall(CONTRACT_SCRIPT_HASH, "getLotteryClaimHeight", []);
    sb.emitAppCall(FTX_CONTRACT_SCRIPT_HASH, "balanceOf", [addressHash]);
    try {
      const rpcEndpoint = await NLP2API.getRpcNode();
      const result = await rpc.Query.invokeScript(sb.str).execute(rpcEndpoint);
      let { stack } = result.result;
      const data = Parsers.status(stack);
      return {
        ...data,
        rpcEndpoint,
        address,
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  getEntries = async (currentPage: number, pageSize: number = 30): Promise<Entries> => {
    const totalItems = this.status.indexes.currentTicketHeight;
    const entries = await NLP2API.fetchBlockchainData({
      currentPage,
      pageSize,
      totalItems,
      rpcEndpoint: this.status.rpcEndpoint,
      contractScriptHash: CONTRACT_SCRIPT_HASH,
      requestMethod: FETCH_METHODS.entry,
    });
    return {
      items: entries.map((item: StackItem) => Parsers.entry(item.value)),
      totalItems,
    };
  };

  getResults = async (currentPage: number, pageSize: number = 30): Promise<Results> => {
    const totalItems = this.status.indexes.currentResultHeight;
    const entries = await NLP2API.fetchBlockchainData({
      currentPage,
      pageSize,
      totalItems,
      rpcEndpoint: this.status.rpcEndpoint,
      contractScriptHash: CONTRACT_SCRIPT_HASH,
      requestMethod: FETCH_METHODS.result,
    });
    return {
      items: entries.map((item: StackItem) => Parsers.result(item.value)),
      totalItems,
    };
  };

  getWinners = async (currentPage: number, pageSize: number): Promise<Entries> => {
    const totalItems = this.status.indexes.currentWinnerHeight;
    const entries = await NLP2API.fetchBlockchainData({
      currentPage,
      pageSize,
      totalItems,
      rpcEndpoint: this.status.rpcEndpoint,
      contractScriptHash: CONTRACT_SCRIPT_HASH,
      requestMethod: FETCH_METHODS.winner,
    });
    return {
      items: entries.map((item: StackItem) => Parsers.entry(item.value)),
      totalItems,
    };
  };
}
export default NLP2API;
