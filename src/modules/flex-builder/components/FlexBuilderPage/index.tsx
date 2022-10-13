import React, { FC } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { PageHeader } from "@/modules/common";
import { ITemplate } from "@/lib/schema/types";
import AppTemplateItem from "./AppTemplateItem";
import FlexUploadCard from "./FlexUploadCard";

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
        title="Flex Builder Starter Templates"
        desc="You can custom build a variety of combinations with our Flex Builder, but we offer the following pre-configured starter templates to make things easier. Quickly setup NFT collectibles, DeFi instruments,
        generic ADOs and more in just a click of a button!"
      />
      <SimpleGrid
        gridAutoRows="1fr"
        columns={{ sm: 1, md: 2, lg: 3 }}
        spacing="4"
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
