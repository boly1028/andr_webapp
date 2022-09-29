import React, { FC, useEffect, useState } from "react";
import { Box } from "@/theme/ui-elements";
import { useQueryAssets } from "@/lib/graphql";
import { useWallet } from "@/lib/wallet";
import AppItem from "./AppItem";
import { Create, FallbackPlaceholder } from "@/modules/common";
import { Skeleton } from "@chakra-ui/skeleton";
import { Center, Stack } from "@chakra-ui/layout";
import InfiniteScroll from "react-infinite-scroll-component";
import { cloneDeep } from "@apollo/client/utilities";

const LIMIT = 10;
const AdosList: FC = () => {
  const wallet = useWallet();

  const { data, loading, error, fetchMore } = useQueryAssets(
    wallet?.address ?? "",
    LIMIT,
    0,
  );
  const [prevData, setPrevData] = useState<typeof data>([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreAsset = async () => {
    if (loading) return;
    console.log("REFETCH");
    const res = await fetchMore({
      variables: {
        offset: prevData?.length ?? 0,
      },
    });
    const assets = res.data.assets;
    setHasMore(!!assets.length);
    setPrevData((prev) => {
      const result = cloneDeep(prev) ?? [];
      const filteredData =
        assets?.filter((d) => !prev?.some((nd) => nd.address === d.address)) ??
        [];
      result.push(...filteredData);
      return result;
    });
  };

  useEffect(() => {
    setPrevData(data);
    setHasMore(!!data?.length);
  }, [data]);

  if (error) {
    <Box>
      <FallbackPlaceholder
        title="ERROR!"
        desc="Something went wrong, we were not able to fetch data properly"
      ></FallbackPlaceholder>
    </Box>;
  }

  if (!loading && prevData?.length === 0) {
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
      {/* There is an issue with the Infinite Scroll. If all elements for initial render are loaded and there
      is no scroll overflow, next function is not called even though loadmore is there. A hack for this is to
      use limit as some large value */}
      <InfiniteScroll
        next={fetchMoreAsset}
        hasMore={hasMore}
        dataLength={prevData?.length ?? 0}
        loader={
          <Stack>
            <Skeleton h="14" rounded="xl" />
            <Skeleton h="14" rounded="xl" />
            <Skeleton h="14" rounded="xl" />
          </Stack>
        }
      >
        {prevData?.map((item) => {
          return <AppItem key={item.address} app={item} />;
        })}
      </InfiniteScroll>
      {loading && (
        <Stack>
          <Skeleton h="14" rounded="xl" />
          <Skeleton h="14" rounded="xl" />
          <Skeleton h="14" rounded="xl" />
        </Stack>
      )}
    </Box>
  );
};

export default AdosList;
