import React from "react";
import { Button, MenuButton, ButtonProps } from "@chakra-ui/react";

import { ChevronDownIcon } from "@/modules/common";

function CustomMenuButton({ children, ...rest }: ButtonProps) {
  return (
    <MenuButton
      as={Button}
      rightIcon={<ChevronDownIcon color="gray.500" />}
      variant="outline"
      fontSize="md"
      size="lg"
      fontWeight={400}
      iconSpacing={2.5}
      px={3}
      {...rest}
    >
      {children}
    </MenuButton>
  );
}

export default CustomMenuButton;
