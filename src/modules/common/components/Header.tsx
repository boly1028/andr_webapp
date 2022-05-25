import React, { FC } from "react";
import Link from "next/link";
import {
  Flex,
  HStack,
  Button,
  FlexProps,
  IconButton,
  Link as _Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

import { PlusIcon, TerraWallet, MenuIcon } from "@/modules/common";
import {
  ArchiveIcon,
  CheckCircleIcon,
  FlameIcon,
  MoreHorizontalIcon,
  TerraIcon,
} from "@/modules/common";

type Props = {
  onOpen: () => void;
} & FlexProps;

const Header: FC<Props> = ({ onOpen, ...props }) => {
  return (
    <Flex
      height="20"
      alignItems="center"
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...props}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<MenuIcon />}
      />
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
            <Menu placement="bottom-end">
              <MenuButton
                as={Button}
                icon={<PlusIcon boxSize={5} />}
                variant="outline"
                size="lg"
              >
                <PlusIcon boxSize={5} />
                Create
              </MenuButton>

              <MenuList>
                <MenuItem>
                  <Link href={`/flex-builder/new`} passHref>
                    <_Link fontWeight={700} color="primary.600" fontSize="sm">
                      ADO
                    </_Link>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href={`app-builder/create`} passHref>
                    <_Link fontWeight={700} color="primary.600" fontSize="sm">
                      App
                    </_Link>
                  </Link>
                </MenuItem>
              </MenuList>
            </Menu>
            <TerraWallet />
          </HStack>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default Header;
