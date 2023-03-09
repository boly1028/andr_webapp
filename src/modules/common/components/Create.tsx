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
        maxHeight="40px"
      >
        <Flex justifyContent="space-around" alignItems="center">
          <PlusIcon boxSize={6} />
          Create
        </Flex>
      </MenuButton>

      <MenuList>
        <MenuItem>
          <Link href={SITE_LINKS.flexBuilderHome()} passHref>
            <_Link fontWeight={700} color="base.white" fontSize="sm">
              ADO
            </_Link>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href={SITE_LINKS.appBuilder()} passHref>
            <_Link fontWeight={700} color="base.white" fontSize="sm">
              App
            </_Link>
          </Link>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Create;
