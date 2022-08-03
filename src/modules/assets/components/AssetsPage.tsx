import React from "react";

import { NftsList, AdosList } from "@/modules/assets";
import { PageHeader } from "@/modules/common";

import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
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
        <Box>
          <Text>Add Login Component Here</Text>
        </Box>
      )}
      {wallet && (
        <Tabs mt={8} colorScheme="purple">
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
