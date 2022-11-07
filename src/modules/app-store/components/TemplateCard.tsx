import { ITemplate } from "@/lib/schema/types";
import { BackdropCard } from "@/modules/common";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import { Box, Button, HStack, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import React, { FC } from "react";

interface TemplateCardProps {
  template: ITemplate;
}
const TemplateCard: FC<TemplateCardProps> = (props) => {
  const { template } = props;

  return (
    <Link href={SITE_LINKS.appStoreItem(template.id)}>
      <Box
        h="full"
        rounded="lg"
        overflow="hidden"
        _hover={{ scale: "105%", borderWidth: "1px" }}
        borderColor="dark.300"
        cursor="pointer"
        transform="auto"
        transition="all"
        transitionDuration="150ms"
        transitionTimingFunction="ease-out"
      >
        <BackdropCard
          logoComponent={<Image w="50%" mb="20%" src={template.icon} />}
        >
          <Box pb="6" px="2">
            <HStack>
              <Image src="/verified.png" w="4" />
              <Text fontSize="sm" fontWeight="medium">
                Andromeda
              </Text>
            </HStack>
            <Text
              textOverflow="ellipsis"
              w="80%"
              whiteSpace="nowrap"
              overflow="hidden"
              fontSize="xl"
              fontWeight="bold"
              mt="2"
            >
              {template.name}
            </Text>
            <Text
              textOverflow="ellipsis"
              w="full"
              whiteSpace="nowrap"
              overflow="hidden"
              mt="1"
              fontSize="sm"
              fontWeight="light"
              color="dark.500"
            >
              {template.description}
            </Text>
          </Box>
        </BackdropCard>
      </Box>
    </Link>
  );
};
export default TemplateCard;
