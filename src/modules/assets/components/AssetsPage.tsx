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
} from "@/theme/ui-elements";

const AssetsPage = () => {
  // const wallet = useWallet();
  // const { data } = useQueryAssets(wallet ? wallet.address : ""); //Uncomment when data needed

  return (
    <Box>
      <PageHeader
        title="Assets"
        desc="Locate and interact with your ADOs, NFTs, tokens, currencies, and more"
      />

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
    </Box>
  );
};

export default AssetsPage;
