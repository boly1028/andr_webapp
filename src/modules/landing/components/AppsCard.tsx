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
    <NextLink href={link} passHref>
      <Box
        as="a"
        target={target}
        referrerPolicy="no-referrer"
        p="10"
        w="52"
        rounded={"xl"}
        overflow={"hidden"}
        textAlign="center"
        bg="dark.100"
        color="base.100"
        _hover={{ color: "gray.700", bg: "base.100" }}
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
