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
          p="3"
          borderRadius="lg"
          color="base.white"
          _hover={{
            bg: "dark.200",
            color: "primary.500",
          }}
          {...props}
        >
          {icon}
          <Text fontWeight={500}>{children}</Text>
        </HStack>
      </a>
    </NextLink>
  );
};

export default NavItem;
