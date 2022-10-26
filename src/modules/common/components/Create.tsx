import { FC } from "react";
import Link from "next/link";
import {
  Button,
  Link as _Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { PlusIcon } from "@/modules/common";
import { SITE_LINKS } from "../utils/sitelinks";

const Create: FC = () => {
  return (
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
          <Link href={SITE_LINKS.flexBuilderHome()} passHref>
            <_Link fontWeight={700} color="base.100" fontSize="sm">
              ADO
            </_Link>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href={SITE_LINKS.appBuilder()} passHref>
            <_Link fontWeight={700} color="base.100" fontSize="sm">
              App
            </_Link>
          </Link>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Create;
