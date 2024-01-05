import React, { AnchorHTMLAttributes, Component, FC } from "react";
import NextLink from "next/link";

import { Box, VStack, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

type AppsCardProps = {
  icon: React.ReactNode;
  title: string;
  link: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
};

const AppsCard: FC<AppsCardProps> = ({ icon, link, title, target }) => {
  return (
    <NextLink href={link} passHref legacyBehavior>
      <Box
        as="a"
        target={target}
        referrerPolicy="no-referrer"
        p="10"
        w="full"
        rounded={"xl"}
        overflow={"hidden"}
        textAlign="center"
        bg="background.800"
        color="content.high"
        _hover={{ color: "contentOnLight.hight", bg: "base.light" }}
      >
        <VStack spacing="6">
          <Box>{icon}</Box>
          <Text fontWeight="medium">{title}</Text>
        </VStack>
      </Box>
    </NextLink>
  );
};

export default AppsCard;
