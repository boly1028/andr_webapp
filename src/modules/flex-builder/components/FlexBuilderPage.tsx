import React, { FC, useEffect } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";

import { PageHeader } from "@/modules/common";
import {
  FlexBuilderTemplateListItem,
  FlexBuilderTemplateProps,
} from "@/modules/flex-builder";

import { useAndromedaContext } from "@/lib/andrjs";
import { useQueryTxByAddress } from "@/lib/graphql";
import { useWallet } from "@/lib/wallet";

type FlexBuilderPageProps = {
  templateList: Array<FlexBuilderTemplateProps>;
};

const FlexBuilderPage: FC<FlexBuilderPageProps> = ({ templateList }) => {
  return (
    <Box>
      <PageHeader
        title="Flex Builder Starter Templates"
        desc="You can custom build a variety of combinations with our Flex Builder, but we offer the following pre-configured starter templates to make things easier. Quickly setup NFT collectibles, DeFi instruments,
        generic ADOs and more in just a click of a button!"
      />
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="4" my={8}>
        {templateList.map((template: FlexBuilderTemplateProps) => (
          <FlexBuilderTemplateListItem key={template.id} template={template} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default FlexBuilderPage;
