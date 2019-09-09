import Neon, { rpc } from "@cityofzion/neon-js";
import { helpers } from "@ftw-js/api";
import _ from "underscore";
import { StackItem } from "@cityofzion/neon-core/lib/sc/StackItem";

interface PaginatedBlockchainProps {
  rpcEndpoint: string;
  contractScriptHash: string;
  requestMethod: string;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  parser: (hexString: string) => void;
  args?: any[];
  sort?: 1 | -1;
}

export async function paginatedBlockchain({
  rpcEndpoint,
  contractScriptHash,
  requestMethod,
  args = [],
  currentPage,
  totalPages,
  totalItems,
  pageSize = 30,
  parser,
  sort = -1,
}: PaginatedBlockchainProps) {
  try {
    let start;
    let stop;
    if (sort === 1) {
      start = (currentPage - 1) * pageSize + 1;
      stop = totalPages === currentPage ? totalItems + 1 : start + pageSize;
    } else {
      const skip = (currentPage - 1) * pageSize;
      start = totalPages > 1 ? totalItems - skip : totalItems;
      stop = start - pageSize > 0 ? start - pageSize : 0;
    }

    const items = _.range(start, stop, sort);

    if (items.length > 0) {
      const sb = Neon.create.scriptBuilder();
      items.forEach(i => {
        sb.emitAppCall(contractScriptHash, requestMethod, [
          ...args,
          helpers.convertIntToHexstring(i),
        ]);
      });

      const result = await rpc.Query.invokeScript(sb.str).execute(rpcEndpoint);
      const { stack } = result.result;
      return stack.map((i: StackItem) => {
        // @ts-ignore
        return parser(i.value);
      });
    }
    return [];
  } catch (e) {
    throw new Error(e);
  }
}
