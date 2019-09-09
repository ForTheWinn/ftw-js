import Neon, { api, rpc } from "@cityofzion/neon-js";
import _ from "underscore";
import { helpers } from "./index";

interface PaginatedBlockchainProps {
  rpcEndpoint: string;
  contractScriptHash: string;
  requestMethod: string;
  currentPage: number;
  totalItems: number;
  pageSize: number;
  args?: any[];
  sort?: 1 | -1;
}

class NEOAPI {
  static async getRpcNode(): Promise<string> {
    try {
      const provider = new api.neoscan.instance("MainNet");
      return await provider.getRPCEndpoint();
    } catch (e) {
      throw new Error(e);
    }
  }

  static async fetchBlockchainData({
    rpcEndpoint,
    contractScriptHash,
    requestMethod,
    args = [],
    currentPage,
    totalItems,
    pageSize,
    sort = -1,
  }: PaginatedBlockchainProps) {
    let start;
    let stop;
    const totalPages = Math.ceil(totalItems / pageSize);
    if (sort === 1) {
      start = (currentPage - 1) * pageSize + 1;
      stop = totalPages === currentPage ? totalItems + 1 : start + pageSize;
    } else {
      const skip = (currentPage - 1) * pageSize;
      start = totalPages > 1 ? totalItems - skip : totalItems;
      stop = start - pageSize > 0 ? start - pageSize : 0;
    }

    const items = _.range(start, stop, sort);

    const sb = Neon.create.scriptBuilder();
    items.forEach(i => {
      sb.emitAppCall(contractScriptHash, requestMethod, [
        ...args,
        helpers.convertIntToHexstring(i),
      ]);
    });
    try {
      const result = await rpc.Query.invokeScript(sb.str).execute(rpcEndpoint);
      const { stack } = result.result;
      return stack;
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default NEOAPI;
