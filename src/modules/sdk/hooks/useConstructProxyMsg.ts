import { ITemplateFormData } from "@/lib/schema/templates/types";
import { useCallback } from "react";
import { IProxyMessage } from "../types";
import { constructMsg } from "../utils";

/**
 * Provides a function to convert from a JSON Schema message to a valid Tx message
 * @returns A function to convert from a JSON Schema message to a valid Tx message
 */
export default function useConstructProxyMsg() {

  const constructAppMsg = useCallback(
    (data: ITemplateFormData) => {
      console.clear();
      const proxyPanel = data['proxy-message'];
      if (!proxyPanel || !proxyPanel['component_name']) throw new Error("Incorrect publish settings fields");

      const appContract: IProxyMessage = {
        'proxy_message': {
          name: proxyPanel['component_name'],
          msg: ''
        }
      };
      const filteredMsg = {}
      Object.entries(data).forEach(([id, panel]) => {
        // Do not add system panels in app data
        if (panel.$class === 'system') return;
        // If panel is disabled, skip it
        if (panel.$enabled === false) return;
        const filteredPanel = constructMsg(panel);
        Object.entries(filteredPanel).forEach(([executeId, executePanel]) => {
          const msg = constructMsg(executePanel);
          filteredMsg[executeId] = msg;
        })
      })
      
      console.log(`Unencoded data`, filteredMsg);
      const base64Encoded = btoa(JSON.stringify(filteredMsg));
      appContract.proxy_message.msg = base64Encoded;

      console.log("Consrtuct msg:", appContract);
      return appContract;
    },
    [],
  );

  return constructAppMsg;
}

