import React, { FC } from "react";
import NextLink from "next/link";
import { Box, Button, HStack, Image, Text } from "@chakra-ui/react";
import { BackdropCard, ChevronRightIcon } from "@/modules/common";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import TemplateCard from "./TemplateCard";
import { IImportantAdoKeys, ITemplate } from "@/lib/schema/types";
import Link from "next/link";

/**
 * Flex Builder Template Card with button as link which routes to template builder form component
 * @param {template} ITemplate
 */
type AppTemplateListItemProps = {
  template: ITemplate;
};

const AppTemplateItem: FC<AppTemplateListItemProps> = ({ template }) => {
  return (
    <Link href={SITE_LINKS.flexBuilder(template.id)} legacyBehavior>
      <Box
        h="full"
        rounded="lg"
        overflow="hidden"
        // _hover={{ scale: "105%", borderWidth: "1px" }}
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
          <Box px="2">
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
              mb="3"
              fontSize="sm"
              fontWeight="light"
              color="dark.500"
            >
              {template.description}
            </Text>
            <HStack justifyContent="end" mt="auto">
              {template.id !== IImportantAdoKeys.BLANK_CANVAS && (
                <Link href={SITE_LINKS.appStoreItem(template.id)} passHref legacyBehavior>
                  <Button as="a">Read More</Button>
                </Link>
              )}
            </HStack>
          </Box>
        </BackdropCard>
      </Box>
    </Link>
  );
};

export default AppTemplateItem;
