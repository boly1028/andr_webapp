import { useAndromedaContext } from "@/lib/andrjs";
import { ITemplateFormData } from "@/lib/schema/templates/types";
import { IAdoType } from "@/lib/schema/types";
import { useCallback } from "react";
import { IAppContract } from "../types";
import { constructMsg } from "../utils";

/**
 * Provides a function to convert from a JSON Schema message to a valid Tx message
 * @returns A function to convert from a JSON Schema message to a valid Tx message
 */
export default function useConstructAppMsg() {
  const { registryAddress } = useAndromedaContext();

  const constructAppMsg = useCallback(
    (data: ITemplateFormData) => {
      console.clear();
      const publishSettingsPanel = data['publish-settings'];
      if (!publishSettingsPanel || !publishSettingsPanel.name) throw new Error("Incorrect publish settings fields");

      const appContract: IAppContract = {
        name: publishSettingsPanel.name,
        app: [],
        primitive_contract: registryAddress
      };

      Object.entries(data).forEach(([id, panel]) => {
        // Do not add system panels in app data
        if (panel.$class === 'system') return;
        // If panel is disabled, skip it
        if (panel.$enabled === false) return;

        // Ado Type of current panel
        const adoType = panel.$type as IAdoType;

        const msg = constructMsg(panel);

        console.log(`Unencoded data for panel: ${id}`, msg);

        // Instantiate Msg for app component is base64 encoded
        const instantiateMsg = btoa(JSON.stringify(msg));

        // Push current app data to app list of the contract
        appContract.app.push({
          'name': id,
          'ado_type': adoType,
          'instantiate_msg': instantiateMsg
        })
      })

      console.log("Consrtuct msg:", appContract);
      return appContract;
    },
    [registryAddress],
  );

  return constructAppMsg;
}

