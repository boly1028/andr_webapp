import React, { FC } from "react";
import { Button, ButtonProps, IconButton, Text, Tooltip } from "@chakra-ui/react";
import NextLink from "next/link";
import { useAppStateStore } from "@/zustand/appState";

interface Props extends ButtonProps {
  href: string;
  active?: boolean;
};

const NavItem: FC<Props> = ({ active = false, href, children, ...props }) => {
  const sidebarCollapse = useAppStateStore(state => state.sidebarCollapse);
  if (sidebarCollapse) {
    const { leftIcon, ...iconButtonProps } = props
    return (
      <Tooltip hasArrow label={children} placement="right" bgColor="white">
        <IconButton
          as={NextLink} href={href}
          aria-label={href}
          variant={active ? 'theme-low' : 'theme-ghost'}
          color={active ? 'primary.400' : 'content.medium'}
          rounded='xl'
          icon={leftIcon}
          {...iconButtonProps}
        />
      </Tooltip>
    )
  }

  return (
    <Button
      as={NextLink} href={href}
      justifyContent='start'
      variant={active ? 'theme-low' : 'theme-ghost'}
      color={active ? 'primary.400' : 'content.medium'}
      rounded='xl'
      {...props}
    >
      <Text textStyle="main-sm-medium">{children}</Text>
    </Button >
  );
};

export default NavItem;
