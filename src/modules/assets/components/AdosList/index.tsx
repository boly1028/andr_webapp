import React, { FC, useState } from "react";
import { Box } from "@/theme/ui-elements";
import { useQueryAssets } from "@/lib/graphql";
import { useWallet } from "@/lib/wallet";
import AppItem from "./AppItem";
import { Create, FallbackPlaceholder } from "@/modules/common";
import { Skeleton } from "@chakra-ui/skeleton";
import { Center, Stack } from "@chakra-ui/layout";

const AdosList: FC = () => {
  const wallet = useWallet();
  // TODO: IMPLEMENT PAGINATION
  const [offset] = useState<number>(0);
  const [limit] = useState<number>(25);
  const { data, loading, error } = useQueryAssets(
    wallet?.address ?? "",
    limit,
    offset,
  );
  console.log(data, loading, error);
  if (error) {
    <Box>
      <FallbackPlaceholder
        title="ERROR!"
        desc="Something went wrong, we were not able to fetch data properly"
      ></FallbackPlaceholder>
    </Box>;
  }
  if (loading) {
    return (
      <Stack>
        <Skeleton h="14" rounded="xl" />
        <Skeleton h="14" rounded="xl" />
        <Skeleton h="14" rounded="xl" />
      </Stack>
    );
  }

  if (data?.length === 0) {
    return (
      <Center p="10">
        <FallbackPlaceholder
          title="You have no asset yet."
          desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit deleniti sapiente fugit."
        >
          <Create />
        </FallbackPlaceholder>
      </Center>
    );
  }
  return (
    <Box>
      {data?.map((item) => {
        return <AppItem key={item.address} app={item} />;
      })}
    </Box>
  );
};

export default AdosList;
