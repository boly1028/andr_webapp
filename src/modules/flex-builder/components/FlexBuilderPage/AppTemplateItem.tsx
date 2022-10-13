import React, { FC } from "react";
import NextLink from "next/link";
import { Button } from "@chakra-ui/react";
import { ChevronRightIcon } from "@/modules/common";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import TemplateCard from "./TemplateCard";
import { ITemplate } from "@/lib/schema/types";

/**
 * Flex Builder Template Card with button as link which routes to template builder form component
 * @param {template} ITemplate
 */
type AppTemplateListItemProps = {
  template: ITemplate;
};

const AppTemplateItem: FC<AppTemplateListItemProps> = ({
  template,
}) => {
  return (
    <TemplateCard template={template}>
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
    </TemplateCard>
  );
};

export default AppTemplateItem;
