import React, { FC } from "react";

import NextLink from "next/link";

import { FlexBuilderTemplateProps } from "@/modules/flex-builder/types";

import { Button } from "@chakra-ui/react";

import { ChevronRightIcon } from "@/modules/common";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import { FlexBuilderTemplateListItemCard } from ".";

/**
 * Flex Builder Template Card with button as link which routes to template builder form component
 * @param {template} FlexBuilderTemplateProps
 */
type FlexBuilderTemplateListItemProps = {
  template: FlexBuilderTemplateProps;
};

const FlexBuilderTemplateListItem: FC<FlexBuilderTemplateListItemProps> = ({
  template,
}) => {
  return (
    <FlexBuilderTemplateListItemCard template={template}>
      {/* If template is disabled, render disabled coming soon button else render link to builder */}
      {template.disabled ? (
        <Button mt={10} isFullWidth size="lg" colorScheme="purple" disabled>
          Coming Soon
        </Button>
      ) : (
        <NextLink href={SITE_LINKS.flexBuilder(template.id)} passHref>
          <Button
            as="a"
            mt={10}
            isFullWidth
            size="lg"
            colorScheme="purple"
            rightIcon={<ChevronRightIcon boxSize={5} />}
          >
            Get Started
          </Button>
        </NextLink>
      )}
    </FlexBuilderTemplateListItemCard>
  );
};

export default FlexBuilderTemplateListItem;
