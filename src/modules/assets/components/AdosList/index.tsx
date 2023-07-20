import React, { FC, useEffect, useRef, useState } from "react";
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
import { FilterObjectType } from '@/lib/graphql/hooks/useQueryAssets';
import _ from "lodash";
import { AssetSortAdoType } from "@/lib/graphql/hooks/assets/ado.enum";

export const SORT_LIMIT = 10;
import ScrollToTop from "@/modules/common/components/ScrollToTop";
import ScrollToBottom from "@/modules/common/components/ScrollToBottom";

const AdosList: FC = () => {
  const wallet = useWallet();
  const [filteredData, setFilteredData] = useState<FilterObjectType>({
    orderBy: 'Desc'
  });

  const { data, loading, error, fetchMore, previousData, refetch } = useQueryAssets(
    wallet?.address ?? "",
    SORT_LIMIT,
    0,
    filteredData
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
    if (previousData?.assets && data?.length) {
      if (data?.length <= previousData?.assets?.length) {
        setHasMore(true);
      }
    }
  }, [data, previousData]);

  useEffect(() => {
    refetchData();
  }, [filteredData]);

  const refetchData = async () => {
    if (loading || !data) return;
    const res = await refetch();
    const assets = res.data.assets;
    if (assets.length === 0) { setHasMore(false); }
  }
  const searchHandler = _.debounce((value) => {
    setFilteredData((prevState) => ({
      ...prevState,
      search: value
    }))
  }, 500)

  const searchAndFilterHandler = (event, type: string) => {
    switch (type) {
      case 'Search': {
        searchHandler(event.target.value);
        break;
      }
      case 'AdoType': {
        setFilteredData((prevState) => ({
          ...prevState,
          adoType: event.target.value
        }))
        break;
      }
      case 'SortBy': {
        setFilteredData((prevState) => ({
          ...prevState,
          orderBy: event.target.value
        }))
        break;
      }
    }
  }
  if (error) {
    <Box>
      <FallbackPlaceholder
        title="ERROR!"
        desc="Something went wrong, we were not able to fetch data properly"
      ></FallbackPlaceholder>
    </Box>;
  }

  if (!loading && data?.length === 0 && !(filteredData.search || filteredData.adoType || filteredData.orderBy)) {
    return (
      <Center p="10">
        <FallbackPlaceholder
          title="You have no assets yet."
          desc=""
        >
          <Create />
        </FallbackPlaceholder>
      </Center>
    );
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
            <Input type='tel' placeholder='Search assets'
              onChange={(event: React.FormEvent<HTMLInputElement>) => searchAndFilterHandler(event, 'Search')}
            />
          </InputGroup>
        </Box>
        <Select
          size='sm'
          width='160px'
          h='40px'
          borderRadius='8px'
          placeholder="Type"
          onChange={(event) => { searchAndFilterHandler(event, 'AdoType') }}
        >
          {
            (Object.keys(AssetSortAdoType) as Array<keyof typeof AssetSortAdoType>).map((item) => {
              return isNaN(Number(item)) && (<option value={`${item}`} key={item}> {item}</option>)
            })
          }
        </Select>
        <Select size='sm' width='130px' h='40px' borderRadius='8px' placeholder="Sort by"
          onChange={(event) => { searchAndFilterHandler(event, 'SortBy') }}>
          <option value='Asc'>Asc</option>
          <option value='Desc'>Desc</option>
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
          return <AdoItem key={item.address} address={item.address} adoType={item.adoType as IAdoType} name={item.name ?? ''} />;
        })}
      </InfiniteScroll>
      <ScrollToBottom />
      <ScrollToTop />
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
      )
      }
      {
        !loading && data?.length === 0 && !!(filteredData.search || filteredData.adoType || filteredData.orderBy) &&
        <Center p="10">
          <FallbackPlaceholder
            title="No assets found for the search conditions."
            desc=""
          >
            <Create />
          </FallbackPlaceholder>
        </Center>
      }
    </Box >
  );
};

export default AdosList;
