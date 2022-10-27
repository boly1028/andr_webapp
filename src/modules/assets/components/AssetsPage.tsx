import React from "react";

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
} from "@/theme/ui-elements";
import { useWallet } from "@/lib/wallet";

const AssetsPage = () => {
  /**Check If wallet is connected, If yes then user is logged in */
  const wallet = useWallet();

  return (
    <Box>
      <PageHeader
        title="Assets"
        desc="Locate and interact with your ADOs, NFTs, tokens, currencies, and more"
      />
      {!wallet && (
        <Center w="full" p="6" mt="10">
          <Box bg="error.50" rounded="3xl" px="6" py="10">
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
