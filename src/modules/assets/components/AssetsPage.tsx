import React, { useState } from "react";

import { NftsList, AdosList } from "@/modules/assets";
import { PageHeader, Wallet, FallbackPlaceholder } from "@/modules/common";

import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Center,
  Button,
} from "@/theme/ui-elements";
import { useWallet } from "@/lib/wallet";
import { useApolloClient } from "@apollo/client";
import { QUERY_APP, QUERY_ASSETS } from "@andromedaprotocol/andromeda.js";

const AssetsPage = () => {
  /**Check If wallet is connected, If yes then user is logged in */
  const wallet = useWallet();
  const [loading, setLoading] = useState(false);
  const apolloClient = useApolloClient();

  return (
    <Box>
      <PageHeader
        title="Assets"
        desc="Locate and interact with your ADOs, NFTs, tokens, currencies, and more"
      />
      {!wallet && (
        <Center w="full" p="6" mt="10">
          <Box borderColor='error.300' borderWidth='1px' rounded="3xl" px="6" py="10">
            <FallbackPlaceholder
              title="You are not logged in."
              desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit deleniti sapiente fugit."
            >
              <Wallet />
            </FallbackPlaceholder>
          </Box>
        </Center>
      )}
      {wallet && (
        <Tabs mt={8} colorScheme="primary">
          <TabList>
            <Tab>All</Tab>
            <Tab>NFT</Tab>
            <Tab>ADOs</Tab>
            <Tab>Others</Tab>
            <Button
              variant="ghost"
              size="xs"
              ml="auto"
              alignSelf="center"
              isLoading={loading}
              onClick={() => {
                setLoading(true);
                apolloClient
                  .refetchQueries({
                    include: ["QUERY_APP", "QUERY_ASSETS"],
                  })
                  .catch((err) => {
                    console.log(err);
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              }}
            >
              Refresh
            </Button>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Box mb={5}>
                <AdosList />
              </Box>
              <NftsList />
            </TabPanel>
            <TabPanel>
              <NftsList />
            </TabPanel>
            <TabPanel>
              <AdosList />
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </Box>
  );
};

export default AssetsPage;
