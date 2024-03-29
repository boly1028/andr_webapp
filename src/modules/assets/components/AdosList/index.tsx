import React, { FC, useEffect, useRef, useState } from "react";
import { Box, Button } from "@/theme/ui-elements";
import { useQueryAssets } from "@/lib/graphql";
import AdoItem from "./AdoItem";
import { Create, FallbackPlaceholder, SearchBar } from "@/modules/common";
import { Skeleton } from "@chakra-ui/skeleton";
import { Center, Stack } from "@chakra-ui/layout";
import InfiniteScroll from "react-infinite-scroll-component";
import { IAdoType } from "@/lib/schema/types";
import { Flex, Input, InputGroup, InputLeftElement, Select } from '@chakra-ui/react'
import { SearchIcon } from "@chakra-ui/icons";
import { FilterObjectType } from '@/lib/graphql/hooks/useQueryAssets';
import _ from "lodash";

export const SORT_LIMIT = 10;
import ScrollToTop from "@/modules/common/components/ScrollToTop";
import ScrollToBottom from "@/modules/common/components/ScrollToBottom";
import { IAdoType as ICodegenAdoType, IAndrOrderBy } from "@andromedaprotocol/gql/dist/__generated/react";
import { useAccount } from "@/lib/andrjs/hooks/useAccount";

const AdosList: FC = () => {
  const wallet = useAccount();
  const [filteredData, setFilteredData] = useState<FilterObjectType>({
    orderBy: IAndrOrderBy.DESC
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
    const assets = res.data.accounts.assets;
    if (assets.length === 0) {
      setHasMore(false);
    }
  };
  useEffect(() => {
    if (previousData?.accounts.assets && data?.length) {
      if (data?.length <= previousData?.accounts.assets?.length) {
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
    const assets = res.data.accounts.assets;
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
        <Box w='full' h='40px'>
          <SearchBar
            placeholder='Search assets'
            onChange={(event: React.FormEvent<HTMLInputElement>) => searchAndFilterHandler(event, 'Search')}
            variant="outline"
          />
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
            Object.keys(ICodegenAdoType).map((item) => {
              return <option value={ICodegenAdoType[item]} key={item}> {item}</option>
            })
          }
        </Select>
        <Select size='sm' width='130px' h='40px' borderRadius='8px' placeholder="Sort by"
          onChange={(event) => { searchAndFilterHandler(event, 'SortBy') }}>
          <option value={IAndrOrderBy.ASC}>Asc</option>
          <option value={IAndrOrderBy.DESC}>Desc</option>
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
          return <AdoItem
            key={item.address}
            address={item.address}
            name={item.name ?? ''}
            adoType={item.adoType.split('@')[0] as IAdoType}
          />;
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
