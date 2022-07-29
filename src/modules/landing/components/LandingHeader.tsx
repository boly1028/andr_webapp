import React, { FC } from "react";
import Link from "next/link";
import {
  Flex,
  HStack,
  Button,
  Link as _Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { PlusIcon, Wallet } from "@/modules/common";

interface LandingHeaderProps {}

const LandingHeader: FC<LandingHeaderProps> = () => {
  return (
    <Flex
      height="20"
      alignItems="center"
      justifyContent={{ base: "space-between", md: "flex-end" }}
    >
      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <HStack spacing={2}>
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
            <Wallet />
          </HStack>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default LandingHeader;
