import { useLCDClient } from "@terra-money/wallet-provider";
import { useTx, useAddress, estimateFee } from "@arthuryeti/terra";
import { MsgInstantiateContract } from "@terra-money/terra.js";

import { v4 as uuidv4 } from "uuid";
import { useAndromedaContext } from "@/modules/common";

const constructMsg = (data: any) => {
  let msg = "";
  const objData = {}; // Stores object data while processing
  const base64Data = {}; // Encoded message constructions for instantiate messages
  const appData = []; // Array to store base64 instantiation app data for submission message

  console.clear();
  console.log("formData", data);

  // Iterate through submitted panels by excluding UUID parent
  for (const panel in data) {
    //Only process panels when $enabled = true
    if (data[panel].$enabled) {
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
      console.log("objData: ", objData);
      console.log("MsgData", JSON.stringify(objData[tmpType]));

      // Process data to encode and ecapsulate into App broadcasrt message ////////////////////////////////////
      // Base64 Encoding of Panel Data
      const tmpID = uuidv4();
      base64Data[tmpID] = {};
      base64Data[tmpID]["name"] = tmpID;
      base64Data[tmpID]["ado_type"] = tmpType;
      base64Data[tmpID]["msg"] = btoa(JSON.stringify(objData[tmpType]));

      //Load object data message to appData array
      appData.push(base64Data[tmpID]);
    }
  }
  //Show results after panel processing
  console.log(JSON.stringify(appData));
};

export default function usePublishContract() {
  const { postTx } = useAndromedaContext();
  const client = useLCDClient();
  const address = useAddress();

  const publishContract = async (formData: any) => {
    console.log(constructMsg(formData));

    if (
      !postTx.canPost ||
      client == null ||
      formData == null ||
      address == null
    ) {
      return;
    }

    const msgs = [
      // @ts-expect-error - TODO
      new MsgInstantiateContract(address, "", 66251, constructMsg(formData)),
    ];

    if (msgs == null) {
      return;
    }

    await postTx.post({ msgs });
  };

  return {
    publishContract,
  };
}
