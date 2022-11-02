import React, { FC } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { PageHeader } from "@/modules/common";
import { ITemplate } from "@/lib/schema/types";
import AppTemplateItem from "./AppTemplateItem";
import FlexUploadCard from "./FlexUploadCard";
import Header from "./Header";

/**
 * Display all predefined templates
 * @param {templateList} Array<ITemplate>
 */

type FlexBuilderPageProps = {
  templateList: Array<ITemplate>;
};

const FlexBuilderPage: FC<FlexBuilderPageProps> = ({ templateList }) => {
  return (
    <Box>
      <PageHeader
        title="Get Started"
        desc="Start from scratch to publish NFT collectibles, DeFi instruments and generic ADOs from starter templates!"
      />
      <Box my='6'>
        <Header />
      </Box>
      <SimpleGrid
        gridAutoRows="1fr"
        columns={{ sm: 1, md: 2, lg: 3 }}
        spacing="6"
        my={8}
      >
        {/* Render First template in templateList */}
        {templateList.slice(0, 1).map((template) => (
          <AppTemplateItem key={template.id} template={template} />
        ))}

        {/* Flex upload template card */}
        <FlexUploadCard />

        {/* All other predifined templates from templateList */}
        {templateList.slice(1).map((template) => (
          <AppTemplateItem key={template.id} template={template} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default FlexBuilderPage;
