import React, { FC } from "react";

import NextLink from "next/link";

import { FlexBuilderTemplateProps } from "@/modules/flex-builder/types";

import { Button } from "@chakra-ui/react";

import { ChevronRightIcon } from "@/modules/common";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import { FlexBuilderTemplateListItemCard } from ".";

type FlexBuilderTemplateListItemProps = {
  template: FlexBuilderTemplateProps;
};

const FlexBuilderTemplateListItem: FC<FlexBuilderTemplateListItemProps> = ({
  template,
}) => {
  return (
    <FlexBuilderTemplateListItemCard template={template}>
      {/* Set href to '#' if assigned for coming soon /disabled */}
      <NextLink
        href={!template.disabled ? SITE_LINKS.flexBuilder(template.id) : "#"}
        passHref
      >
        <Button
          as="a"
          mt={10}
          isFullWidth
          size="lg"
          colorScheme="purple"
          rightIcon={
            !template.disabled ? <ChevronRightIcon boxSize={5} /> : undefined
          }
          isDisabled={template.disabled}
        >
          {template.disabled ? "Coming Soon" : "Get Started"}
        </Button>
      </NextLink>
    </FlexBuilderTemplateListItemCard>
  );
};

export default FlexBuilderTemplateListItem;
