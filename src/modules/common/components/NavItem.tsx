import React, { FC, ReactText } from "react";
import { Flex, Link, Icon, FlexProps } from "@chakra-ui/react";
import NextLink from "next/link";

type Props = {
  icon: any;
  href: string;
  children: ReactText;
} & FlexProps;

const NavItem: FC<Props> = ({ icon, href, children, ...props }) => {
  return (
    <NextLink href={href} passHref>
      <Link _focus={{ boxShadow: "none" }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "gray.200",
            color: "black",
          }}
          {...props}
        >
          {icon && (
            <Icon
              mr="4"
              _groupHover={{
                color: "black",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Link>
    </NextLink>
  );
};

export default NavItem;
