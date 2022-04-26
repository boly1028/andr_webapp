import React, { FC, ReactText } from "react";
import { HStack, StackProps, Text } from "@chakra-ui/react";
import NextLink from "next/link";

type Props = {
  icon: React.ReactNode;
  href: string;
  children: ReactText;
} & StackProps;

const NavItem: FC<Props> = ({ icon, href, children, ...props }) => {
  return (
    <NextLink href={href} passHref>
      <a>
        <HStack
          p="4"
          borderRadius="lg"
          _hover={{
            bg: "gray.200",
            color: "black",
          }}
          {...props}
        >
          {icon}
          <Text>{children}</Text>
        </HStack>
      </a>
    </NextLink>
  );
};

export default NavItem;
