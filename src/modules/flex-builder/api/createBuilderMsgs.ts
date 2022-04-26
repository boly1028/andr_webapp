import { MsgInstantiateContract } from "@terra-money/terra.js";

MsgInstantiateContract;

type CreateBuilderMsgsOpts = {
  contract: string;
  data: any;
};

export const createBuilderMsgs = (
  options: CreateBuilderMsgsOpts,
  sender: string,
) => {
  const { data } = options;

  const msg = new MsgInstantiateContract(sender, "", 66251, {
    name: "splitter-mission",
    mission: [
      {
        name: "splitter",
        ado_type: "splitter",
        instantiate_msg:
          "eyJyZWNpcGllbnRzIjpbeyJyZWNpcGllbnQiOnsiYWRkciI6InRlcnJhZmQ4OThkZjdmZDk4ZmRzOWZkczk4ZGYifSwicGVyY2VudCI6IjAuMiJ9XX0=",
      },
    ],
    operators: [],
    primitive_contract: "terra1k6mk75ez5kedymp34u8eqsu3jp94pa0h60q4wz",
  });

  return [msg];
};
