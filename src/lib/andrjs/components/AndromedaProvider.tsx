import { OfflineSigner } from "@cosmjs/proto-signing";
import React, { memo } from "react";

export interface AndromedaProviderProps {
  signer: OfflineSigner;
  chainId: string;
}

const AndromedaProvider: React.FC<AndromedaProviderProps> = memo(
  ({ children }) => {
    return <>{children}</>;
  },
);

export default AndromedaProvider;
