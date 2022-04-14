import React, { FC, ReactText } from "react";
import { Flex, Link, Icon, FlexProps } from "@chakra-ui/react";

type Props = {
  icon: any;
  path: String;
  children: ReactText;
} & FlexProps;

const NavItem: FC<Props> = ({ icon, path, children, ...props }) => {
  return (
    <Link
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
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
            fontSize="16"
            _groupHover={{
              color: "black",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default NavItem;
