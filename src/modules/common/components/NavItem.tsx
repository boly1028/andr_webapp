import React, { FC, ReactText } from "react";
import { HStack, Icon, StackProps, Text } from "@chakra-ui/react";
import NextLink from "next/link";

type Props = {
  icon: React.ReactNode;
  href: string;
  children: ReactText;
  active?: boolean;
} & StackProps;

const NavItem: FC<Props> = ({ active = false, icon, href, children, ...props }) => {
  return (
    <NextLink href={href} passHref>
      <a>
        <HStack
          p="3"
          borderRadius="lg"
          color={active ? 'primary.500' : "base.white"}
          bg={active ? 'rgba(68, 129, 255, 0.12)' : 'transparent'}
          _hover={{
            bg: active ? 'rgba(68, 129, 255, 0.12)' : 'dark.200'
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
