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
        icon={<PlusIcon boxSize={10} />}
        size="lg"
        minWidth="100px"
        fontWeight={'500'}
        variant="soliddark"
      >
        <Flex justifyContent="space-around" alignItems="center">
          <PlusIcon boxSize={6} />
          Create
        </Flex>
      </MenuButton>

      <MenuList>
        <Link href={SITE_LINKS.flexBuilderHome()} passHref>
          <MenuItem as={_Link} fontWeight='medium' fontSize='sm'>
            ADO
          </MenuItem>
        </Link>
        <Link href={SITE_LINKS.appBuilder()} passHref>
          <MenuItem as={_Link} fontWeight='medium' fontSize='sm'>
            App
          </MenuItem>
        </Link>
      </MenuList>
    </Menu>
  );
};

export default Create;
