import React, { FC } from "react";
import { Box } from "@/theme/ui-elements";
import { useQueryAssets } from "@/lib/graphql";
import { useWallet } from "@/lib/wallet";
import AppItem from "./AppItem";

const AdosList: FC = () => {
  const wallet = useWallet();
  const { data } = useQueryAssets(wallet?.address ?? "");
  return (
    <Box>
      {data?.map((item) => {
        return <AppItem key={item.contractAddress} app={item} />;
      })}
    </Box>
  );
};

export default AdosList;
