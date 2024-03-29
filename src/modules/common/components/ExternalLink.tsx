/*** REMOVE ***/
// This file has been relocated to @/theme/ui-elements
import React, { FC } from "react";
import { HStack, Text, chakra } from "@chakra-ui/react";

import { ExternalLinkIcon } from "@/modules/common";

type Props = {
  label: string;
  href: string;
  color?: string;
};

const ExternalLink: FC<Props> = ({ href, label, color = "primary.600" }) => {
  return (
    <chakra.a href={href} target="_blank" display="inline-block">
      <HStack color={color}>
        <Text fontWeight={500}>{label}</Text>
        <ExternalLinkIcon boxSize={5} />
      </HStack>
    </chakra.a>
  );
};

export default ExternalLink;
