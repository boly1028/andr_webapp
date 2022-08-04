import { useAndromedaContext, useInstantiate } from "@/lib/andrjs";
import { Fee, Msg } from "@andromedaprotocol/andromeda.js";
import { useCallback } from "react";

/**
 * Wrapper around useInstnatiate to convert form data to an instantiate message before sending
 * @param codeId
 * @returns
 */
export default function usePublishContract(codeId: number) {
  const instantiate = useInstantiate(codeId);
  const { registryAddress } = useAndromedaContext();

  const constructMsg = useCallback(
    (data: any) => {
      //Object definitions must be typed as "any" otherwise TS will raise error: type string can't be used to index type {}
      const objData = {}; // Stores object data while processing
      const base64Data = {}; // Encoded message constructions for instantiate messages
      const appData: any[] = []; // Array to store base64 instantiation app data for submission message
      const appInfo = {}; // The publish-settings for app message information
      console.clear();
      // console.log("formData", data);

      // Iterate through submitted panels by excluding UUID parent
      for (const panel in data) {
        // Separate system and process panels.
        if (data[panel]["$class"] === "system") {
          console.log("Panel: ", data[panel]);
          // When set as publish-settings load that data into the appInfo object
          appInfo["name"] = data[panel]["name"];
          appInfo["primitive_contract"] = registryAddress;
          // Operators is omissable, so only process if values have been declared
          // eslint-disable-next-line no-prototype-builtins
          if (data[panel].hasOwnProperty("operators")) {
            appInfo["operators"] = data[panel]["operators"] ?? [];
          }
          // console.log("appInfo: ", appInfo);
        } else {
          //Process non-system panels for message construction
          if (data[panel].$enabled) {
            //Only process panels when $enabled = true
            const tmpType = data[panel]["$type"];
            objData[tmpType] = {};

            // Process panel data
            for (const key in data[panel]) {
              // Add non-flex template meta-data to object data (which all begin with '$')
              if (key.charAt(0) !== "$") {
                //Load data to object for processing
                // console.log(typeof data[panel][key]);
                //   console.log("key: ", key, " value: ", data[panel][key]);
                //Push data to object data
                objData[tmpType][key] = data[panel][key];
                //objData[data[panel]["$type"]] = {objData, ...data[panel][key]};
              }
            }
            //Show results after panel has processed
            console.log("Unencoded Message Data: ", objData);
            // console.log("MsgData", JSON.stringify(objData[tmpType]));

            // Process data to encode and ecapsulate into App broadcasrt message ////////////////////////////////////
            // Base64 Encoding of Panel Data
            const tmpID = panel;
            base64Data[tmpID] = {};
            base64Data[tmpID]["name"] = tmpID;
            base64Data[tmpID]["ado_type"] = tmpType;
            base64Data[tmpID]["instantiate_msg"] = btoa(
              JSON.stringify(objData[tmpType]),
            );

            //Load object data message to appData array
            appData.push(base64Data[tmpID]);
          }
        }
      }
      // Load data into appInfo
      appInfo["app"] = appData;
      //Show results after panel processing
      // console.log(JSON.stringify(appData));
      console.log(JSON.stringify(appInfo));
      return appInfo;
    },
    [registryAddress],
  );

  const publish = useCallback(
    async (msg: Msg, label: string, fee?: Fee) => {
      const instMsg = constructMsg(msg);
      console.log(instMsg);
      return instantiate(instMsg, label, fee);
    },
    [instantiate, constructMsg],
  );
  return publish;
}

/////////////////////////////////////////////////////////////////////////////////////////
export function constructMsgSample(data: any) {
  //Object definitions must be typed as "any" otherwise TS will raise error: type string can't be used to index type {}
  const objData = {}; // Stores object data while processing
  const msgData = {}; // Object to store base64 encoded execute meassage data for submission message provided in return

  /* Using let to prevent nested declaration scope issues from within loop/if structures */
  let execType = ""; // The base structure level be assigned for the processing type (expanadable for future case) (current use of "proxy_message")

  console.clear();
  // console.log("formData", data);

  // Iterate through submitted panels by excluding UUID parent
  for (const panel in data) {
    // Separate system and process panels.
    if (data[panel]["$class"] === "system") {
      /* System-Panels: proxy-message, coin-attachment */
      console.log("Panel: ", data[panel]);

      // When system panel is set as proxy-message load that data into the appInfo object
      if (panel === "proxy-message") {
        execType = "proxy_message"; // setup the execute message type to be applied in processing (note variance in "-" and "_")
        objData[execType] = {}; // Implement empty object to facilitate reference calls (as will be undecalred if used in line below)
        objData[execType]["name"] = data[panel]["component_name"];
      }
      // console.log("appInfo: ", appInfo);
    } else {
      //Process non-system panels for message construction
      if (data[panel].$enabled) {
        //Only process panels when $enabled = true

        objData[execType]["msg"] = {};

        // Process panel data
        for (const key in data[panel]) {
          // Add non-flex template meta-data to object data (which all begin with '$')
          if (key.charAt(0) !== "$") {
            //Load data to object for processing
            // console.log(typeof data[panel][key]);
            //   console.log("key: ", key, " value: ", data[panel][key]);

            //Push data to object data
            objData[execType]["msg"][key] = data[panel][key];
          }
        }
        //Show results after panel has processed
        console.log(
          "Unencoded Message Data: ",
          JSON.stringify(objData[execType]["msg"]),
        );
        // console.log("MsgData", JSON.stringify(objData[tmpType]));
      }
    }
  }

  // After processing apply encoding to msg and replace current info in executeMessage field
  objData[execType]["msg"] = btoa(JSON.stringify(objData[execType]["msg"]));

  /* Suggested processing if encoded results need to be object encapsulated (Record<string, unknown>) */
  // const tmpObj = {}; //using a temporary object to assure encoded msg is provided as an object
  // tmpObj[0] = btoa(JSON.stringify(objData[execType]["msg"]));
  // objData[execType]["msg"] = tmpObj;

  // Load data into msgData for return statement
  msgData[execType] = objData[execType];
  // Show results after panel processing
  console.log(JSON.stringify(msgData));
  return msgData; // Needs a return of ConstructedMSG, contract, ?, (other props for execute message handling)
}
