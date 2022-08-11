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
  const text = useColorModeValue('orange.700', "orange.700");
  return (
    <NextLink href={link} passHref>
      <Box
        as="a"
        target={target}
        referrerPolicy="no-referrer"
        p="10"
        w='52'
        rounded={"xl"}
        overflow={"hidden"}
        textAlign="center"
        bg="white"
        _hover={{ color: text }}
      >
        <VStack spacing="6">
          <Box>{icon}</Box>
          <Text color="gray.700" fontWeight="medium">
            {title}
          </Text>
        </VStack>
      </Box>
    </NextLink>
  );
};

export default AppsCard;
