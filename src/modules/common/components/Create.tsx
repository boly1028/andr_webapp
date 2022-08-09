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
  );
};

export default Create;
