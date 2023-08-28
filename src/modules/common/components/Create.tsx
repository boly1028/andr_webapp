import { FC } from "react";
import Link from "next/link";
import {
  Button,
  Link as _Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Flex,
  Icon,
  Box
} from "@chakra-ui/react";
import { SITE_LINKS } from "../utils/sitelinks";
import { Plus } from "lucide-react";

const Create: FC = () => {
  return (
    <Menu placement="bottom-end">
      <MenuButton
        as={Button}
        leftIcon={<Icon as={Plus} boxSize='4' />}
        size="sm"
        variant='theme-filled'
      >
        Create
      </MenuButton>

      <MenuList>
        <MenuItem as={Link} href={SITE_LINKS.flexBuilderHome()} fontWeight='medium' fontSize='sm'>
          ADO
        </MenuItem>
        <MenuItem as={Link} href={SITE_LINKS.flexBuilderHome()} fontWeight='medium' fontSize='sm'>
          App
        </MenuItem>
      </MenuList>
    </Menu >
  );
};

export default Create;
