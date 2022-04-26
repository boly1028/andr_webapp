import { MsgExecuteContract } from "@terra-money/terra.js";

type CreateBuilderMsgsOpts = {
  contract: string;
  data: any;
};

export const createBuilderMsgs = (
  options: CreateBuilderMsgsOpts,
  sender: string,
) => {
  const { contract, data } = options;

  const executeMsg = {
    data,
  };

  const msg = new MsgExecuteContract(sender, contract, executeMsg);

  return [msg];
};
