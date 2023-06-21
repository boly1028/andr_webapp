import React, { FC, useEffect, useState } from "react";
import { Box, Button } from "@/theme/ui-elements";
import { useQueryAssets } from "@/lib/graphql";
import { useWallet } from "@/lib/wallet";
import AdoItem from "./AdoItem";
import { Create, FallbackPlaceholder } from "@/modules/common";
import { Skeleton } from "@chakra-ui/skeleton";
import { Center, Stack } from "@chakra-ui/layout";
import InfiniteScroll from "react-infinite-scroll-component";
import { IAdoType } from "@/lib/schema/types";
import { Flex, Input, InputGroup, InputLeftElement, Select } from '@chakra-ui/react'
import { SearchIcon } from "@chakra-ui/icons";

const LIMIT = 10;
const AdosList: FC = () => {
  const wallet = useWallet();

  const { data, loading, error, fetchMore, previousData } = useQueryAssets(
    wallet?.address ?? "",
    LIMIT,
    0,
  );

  const [hasMore, setHasMore] = useState(true);

  const fetchMoreAsset = async () => {
    if (loading || !data) return;
    const res = await fetchMore({
      variables: {
        offset: data.length,
      },
    });
    const assets = res.data.assets;
    if (assets.length === 0) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    if (previousData?.assets && data) {
      if (data?.length <= previousData?.assets?.length) {
        setHasMore(true);
      }
    }
  }, [data, previousData]);

  if (error) {
    <Box>
      <FallbackPlaceholder
        title="ERROR!"
        desc="Something went wrong, we were not able to fetch data properly"
      ></FallbackPlaceholder>
    </Box>;
  }

  if (!loading && data?.length === 0) {
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
  console.log('data:', data);
  const searchHandler = (event: React.FormEvent<HTMLInputElement>) => {
    // const target  = event.target as Element;
    // if(event){

    // }
  }
  return (
    <Box>
      {/* Asset Filter UI from here */}
      <Flex mb='24px' gap='16px'>
        <Box w='702px' h='40px'>
          <InputGroup borderRadius={'8px'}>
            <InputLeftElement pointerEvents='none'>
              <SearchIcon color='gray.300' />
            </InputLeftElement>
            <Input type='tel' placeholder='Search assets' onKeyDown={(event: React.FormEvent<HTMLInputElement>) => searchHandler} />
          </InputGroup>
        </Box>
        <Select size='sm' width='160px' h='40px' borderRadius='8px'>
          <option disabled selected>Type</option>
          <option>CW20</option>
          <option>CW721</option>
          <option>Crowdfund</option>
        </Select>
        <Select size='sm' width='130px' h='40px' borderRadius='8px'>
          <option disabled selected>Sort by</option>
          <option>Asc</option>
          <option>Desc</option>
        </Select>
      </Flex>
      {/* There is an issue with the Infinite Scroll. If all elements for initial render are loaded and there
      is no scroll overflow, next function is not called even though loadmore is there. A hack for this is to
      use limit as some large value */}
      <InfiniteScroll
        next={fetchMoreAsset}
        hasMore={hasMore}
        dataLength={data?.length ?? 0}
        loader={
          <Skeleton h="14" rounded="xl" />
        }
      >
        {data?.map((item) => {
          return <AdoItem key={item.address} address={item.address} adoType={item.adoType as IAdoType} />;
        })}
      </InfiniteScroll>
      {loading ? (
        <Stack mt='6' gap='4'>
          <Skeleton h="14" rounded="xl" />
          <Skeleton h="14" rounded="xl" />
          <Skeleton h="14" rounded="xl" />
        </Stack>
      ) : hasMore && (
        <Center mt='6'>
          <Button variant='ghost' onClick={fetchMoreAsset}>
            Load more
          </Button>
        </Center>
      )}
    </Box>
  );
};

export default AdosList;
