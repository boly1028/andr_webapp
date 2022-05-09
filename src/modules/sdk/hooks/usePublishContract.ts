import { useLCDClient } from "@terra-money/wallet-provider";
import { useTx, useAddress, estimateFee } from "@arthuryeti/terra";
import { MsgInstantiateContract } from "@terra-money/terra.js";

import { useAndromedaContext } from "@/modules/common";

const constructMsg = (data: any) => {
  let msg = "";
  let objData = {};

  for (const key in data) {
    switch (key) {
      case "splitter":
        msg = `{
          "recipients": [
            {
              "recipient": {
                "addr": "`;
        msg += data[key]["address"];
        msg += `"
              },
              "percent": "`;
        msg += +data[key]["percentage"] / 100;
        msg += `"
            }
          ]
        }`;

        objData = JSON.parse(msg);

        msg = `{
          "name": "splitter-mission",
          "mission": [
            {
              "name": "splitter",
              "ado_type": "splitter",
              "instantiate_msg": "`;

        msg += btoa(JSON.stringify(objData));

        msg += `"
            }
          ],
          "operators": [],
          "primitive_contract": "terra1k6mk75ez5kedymp34u8eqsu3jp94pa0h60q4wz"
        }`;

        objData = JSON.parse(msg);

        return objData;
      case "timelock":
        return msg;
    }
  }
};

export default function usePublishContract() {
  const { postTx } = useAndromedaContext();
  const client = useLCDClient();
  const address = useAddress();

  const publishContract = async (formData: any) => {
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
