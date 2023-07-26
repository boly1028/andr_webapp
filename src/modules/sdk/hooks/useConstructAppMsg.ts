import { ITemplateFormData } from "@/lib/schema/templates/types";
import { IAdoType, IImportantAdoKeys, IPublishSettingsFormData } from "@/lib/schema/types";
import { useCallback } from "react";
import { IAppContract } from "../types";
import useConstructADOMsg from "./useConstructADOMsg";

/**
 * Provides a function to create app construct messages. Apps are list of app component but
 * instantiate msg (ie data of app component) is base64 encoded. We get a Record<panelId,panelData>
 * from form-builder. So here we first get app data from system panel and create app-contract.
 * Then we add panels to app list by encoding their data in base64. Ultimately, we return the msg
 * generated which will then be used by andromeda client to process contract.
 * Refer docs https://docs.andromedaprotocol.io/andromeda/andromeda-digital-objects/app#instantiatemsg 
 */
export default function useConstructAppMsg() {
  const constructAdoMsg = useConstructADOMsg();

  const constructAppMsg = useCallback(
    (data: ITemplateFormData, appName?: string) => {
      console.clear();
      if (!appName) {
        // Our system panel name is 'publish-settings'. Refer app template in schema
        const publishSettingsPanel = data[IImportantAdoKeys.PUBLISH_SETTINGS] as IPublishSettingsFormData;
        if (!publishSettingsPanel || !publishSettingsPanel.name) throw new Error("Incorrect publish settings fields");
        appName = publishSettingsPanel.name
      }

      if (!appName) throw new Error("App name is required")
      // App contract which we will use to initialise. We will add app components in app list here.
      const appContract: IAppContract = {
        name: appName,
        app_components: [],
        kernel_address: ''
      };

      // Traverse each panel
      Object.entries(data).forEach(([id, panel]) => {
        // Do not add system panels in app data
        if (panel.$class === 'system') return;
        // If panel is disabled, skip it
        if (panel.$enabled === false) return;

        // Ado Type of current panel
        const adoType = panel.$type === 'app-contract' ? 'app' : panel.$type;
        const adoVersion = panel.$version;

        // Remove hidden fields from panel data
        const msg = constructAdoMsg({
          '--no-use-of-this': panel
        });

        console.log(`Unencoded data for panel: ${id}`, msg);

        // Instantiate Msg for app component is base64 encoded
        const instantiateMsg = btoa(JSON.stringify(msg));

        // Push current app data to app list of the contract
        appContract.app_components.push({
          'name': id,
          'ado_type': `${adoType}_${adoVersion}`,
          'instantiate_msg': instantiateMsg
        })
      })

      console.log("Consrtuct msg:", appContract);
      return constructAdoMsg({
        '--no-use-of-this-key': appContract as any
      });
    },
    [constructAdoMsg],
  );

  return constructAppMsg;
}

