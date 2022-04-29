import React, { FC } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";

import { PageHeader } from "@/modules/common";
import {
  FlexBuilderTemplateListItem,
  FlexBuilderTemplateProps,
} from "@/modules/flex-builder";

type FlexBuilderPageProps = {
  templateList: Array<FlexBuilderTemplateProps>;
};

const FlexBuilderPage: FC<FlexBuilderPageProps> = ({ templateList }) => {
  return (
    <Box>
      <PageHeader
        title="ADO & NFT Builder Templates"
        desc="Quickly create and publish NFT collectibles, DeFi instruments and
        generic ADOs from starter templates!"
      />
      <SimpleGrid columns={3} spacing="4" my={8}>
        {templateList.map((template: FlexBuilderTemplateProps) => (
          <FlexBuilderTemplateListItem key={template.id} template={template} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default FlexBuilderPage;
