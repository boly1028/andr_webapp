import { MsgInstantiateContract } from "@terra-money/terra.js";

export const constructMsg = (data: any) => {
  let msg = "";
  let objData = {};

  for (const key in data) {
    switch (key) {
      case "splitter":
        console.log(data[key]);
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
        break;
    }
  }
};

type CreateBuilderMsgsOpts = {
  data: any;
};

export const createBuilderMsgs = (
  options: CreateBuilderMsgsOpts,
  sender: string,
) => {
  const { data } = options;

  // @ts-expect-error - TODO
  const msg = new MsgInstantiateContract(sender, "", 66251, constructMsg(data));

  return [msg];
};

// export const createBuilderMsgs = (
//   options: CreateBuilderMsgsOpts,
//   sender: string,
// ) => {
//   const { data } = options;

//   const msg = new MsgInstantiateContract(sender, "", 66251, {
//     name: "splitter-mission",
//     mission: [
//       {
//         name: "splitter",
//         ado_type: "splitter",
//         instantiate_msg:
//           "eyJyZWNpcGllbnRzIjpbeyJyZWNpcGllbnQiOnsiYWRkciI6InRlcnJhZmQ4OThkZjdmZDk4ZmRzOWZkczk4ZGYifSwicGVyY2VudCI6IjAuMiJ9XX0=",
//       },
//     ],
//     operators: [],
//     primitive_contract: "terra1k6mk75ez5kedymp34u8eqsu3jp94pa0h60q4wz",
//   });

//   return [msg];
// };
