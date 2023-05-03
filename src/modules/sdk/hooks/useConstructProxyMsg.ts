import { ITemplateFormData } from "@/lib/schema/templates/types";
import { IImportantAdoKeys } from "@/lib/schema/types";
import { useCallback } from "react";
import { IProxyMessage } from "../types";
import { constructMsg } from "../utils";

/**
 * Provides function to create proxy contruct message. System ado 'proxy-message' is used to fetch app data.
 * Proxy message contract structure can be found in schema/app-contract/proxy-message
 */
export default function useConstructProxyMsg() {

  const constructAppMsg = useCallback(
    (data: ITemplateFormData) => {
      console.clear();

      // Our system ado to store panel data
      const proxyPanel = data[IImportantAdoKeys.PROXY_MESSAGE];
      if (!proxyPanel || !proxyPanel['component_name']) throw new Error("Incorrect publish settings fields");

      // Our proxy app contract
      const appContract: IProxyMessage = {
        'proxy_message': {
          name: proxyPanel['component_name'],
          msg: ''
        }
      };

      // Filtered msg stores panel data without our custom key. For example, our key is
      // place-bid which contains place_bid key inside. So we flatten one level deep and 
      // store place_bid directly at root level
      const filteredMsg = {}

      Object.entries(data).forEach(([id, panel]) => {
        // Do not add system panels in app data
        if (panel.$class === 'system') return;
        // If panel is disabled, skip it
        if (panel.$enabled === false) return;

        // Remove hidden fields from panel
        const filteredPanel = constructMsg(panel);

        // Traverse through actual keys which were present in modifier schema as explained above
        Object.entries(filteredPanel).forEach(([executeId, executePanel]) => {
          // We do not have any hidden fields here as its nested field from original schema
          // const msg = constructMsg(executePanel);

          // Add the schema key and value to filteredMsg
          filteredMsg[executeId] = executePanel;
        })
      })

      console.log(`Unencoded data`, filteredMsg);
      // Encode filterd msg for proxy
      const base64Encoded = btoa(JSON.stringify(filteredMsg));
      appContract.proxy_message.msg = base64Encoded;

      console.log("Consrtuct msg:", appContract);
      return appContract;
    },
    [],
  );

  return constructAppMsg;
}

