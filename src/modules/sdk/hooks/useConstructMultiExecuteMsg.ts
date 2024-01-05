import { ITemplateFormData } from "@/lib/schema/templates/types";
import type { Msg } from "@andromedaprotocol/andromeda.js";
import { useCallback } from "react";
import { IImportantAdoKeys } from "@/lib/schema/types";
import useConstructProxyMsg from "./useConstructProxyMsg";
import useConstructADOExecuteMsg from "./useConstructaADOExecuteMsg";


export default function useConstructMultiExecuteMsg() {
  const constructProxyMsg = useConstructProxyMsg();
  const constructExecuteMsg = useConstructADOExecuteMsg();

  const construct = useCallback(
    (data: ITemplateFormData, proxy = false) => {
      const msgs: Msg[] = [];
      const panels = Object.entries(data).filter(([id, panel]) => panel.$class !== 'system' && panel.$enabled === true);
      if (panels.length === 0) throw new Error("No Ado for processing");
      panels.sort(([id1], [id2]) => id1 > id2 ? 1 : -1).forEach(([id, panel]) => {
        if (proxy) {
          const proxyPanel = data[IImportantAdoKeys.PROXY_SETTING.key];
          const msg = constructProxyMsg({
            [IImportantAdoKeys.PROXY_SETTING.key]: proxyPanel,
            [id]: panel
          })
          msgs.push(msg)
        } else {
          const msg = constructExecuteMsg({
            [id]: panel
          })
          msgs.push(msg)
        }
      })
      return msgs;
    },
    [constructExecuteMsg, constructProxyMsg],
  );

  return construct;
}

