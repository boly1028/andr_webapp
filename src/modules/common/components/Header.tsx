import React, { FC } from "react";
import {
  Flex,
  HStack,
  FlexProps,
  IconButton,
  Link as _Link,
  Icon,
} from "@chakra-ui/react";

import { Wallet, MenuIcon, Create, SearchBar } from "@/modules/common";
import {
  ArchiveIcon,
  CheckCircleIcon,
  FlameIcon,
  MoreHorizontalIcon,
  TerraIcon,
} from "@/modules/common";
import { Grip } from "lucide-react";

type Props = {
  onOpen: () => void;
} & FlexProps;

const Header: FC<Props> = ({ onOpen, ...props }) => {
  return (
    <Flex
      alignItems="center"
      justifyContent={{ base: "space-between", md: "space-between" }}
      py="2"
      {...props}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<MenuIcon />}
      />
      <HStack
        spacing={{ base: "0", md: "6" }}
        display={{ base: "none", md: "flex" }}
      >
        {/* <SearchBar /> */}
      </HStack>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <HStack spacing={2}>
            {/* <Button
              leftIcon={<PlusIcon boxSize={5} />}
              variant="outline"
              size="lg"
            >
              Create
            </Button> */}

            <Create />
            <Wallet />
            <IconButton
              aria-label="more-button"
              icon={<Icon as={Grip} />}
              size='sm'
              colorScheme="gray"
            />
          </HStack>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default Header;
