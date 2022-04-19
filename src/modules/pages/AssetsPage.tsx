import React from "react";
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import { PageHeader } from "@/modules/common";

const AssetsPage = () => {
  return (
    <Box maxW="container.lg" mx="auto" px={{ base: 4, md: 8 }}>
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
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AssetsPage;
