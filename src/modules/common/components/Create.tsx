import { FC } from "react";
import Link from "next/link";
import {
  Button,
  Link as _Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Flex
} from "@chakra-ui/react";
import { PlusIcon } from "@/modules/common";
import { SITE_LINKS } from "../utils/sitelinks";

const Create: FC = () => {
  return (
    <Menu placement="bottom-end">
      <MenuButton
        as={Button}
        leftIcon={<PlusIcon boxSize={6} />}
        size="sm"
        minWidth="100px"
        fontWeight={'500'}
      >
        <Flex justifyContent="space-around" alignItems="center">
          Create
        </Flex>
      </MenuButton>

      <MenuList>
        <MenuItem as={Link} href={SITE_LINKS.flexBuilderHome()} fontWeight='medium' fontSize='sm'>
          ADO
        </MenuItem>
        <MenuItem as={Link} href={SITE_LINKS.flexBuilderHome()} fontWeight='medium' fontSize='sm'>
          App
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Create;
