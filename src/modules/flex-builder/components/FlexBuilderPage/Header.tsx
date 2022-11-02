import { PlusIcon } from "@/modules/common";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import {
  Box,
  Button,
  Center,
  HStack,
  Text,
  useTheme,
  VStack,
} from "@chakra-ui/react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { FC } from "react";

interface HeaderProps {}
const Header: FC<HeaderProps> = (props) => {
  const {} = props;
  const theme = useTheme();
  const dark = theme.colors.dark;

  return (
    <Box border="1px" borderColor="dark.300" p="4" rounded="lg">
      <HStack alignItems="stretch" spacing={6}>
        <Center
          rounded="lg"
          background={`${dark[50]} url("/logo_outline.png") no-repeat center`}
          backgroundSize="12rem"
          w="20rem"
          h="15rem"
          flexShrink={0}
        >
          <PlusIcon boxSize='3rem' mt='2' />
        </Center>
        <VStack alignItems="start" pb="3">
          <Text fontSize="lg" fontWeight="bold">
            Blank Canvas
          </Text>
          <Text fontSize="sm" color="dark.500">
            You don't have to use a template! Start from scratch building out
            your own ADO structure to be just the way you like it.
          </Text>
          <Link href={SITE_LINKS.flexBuilder("app")} passHref>
            <Button
              as="a"
              colorScheme="primary"
              w="xs"
              mt="auto !important"
              rightIcon={<ChevronRight width="16" />}
            >
              Get Started
            </Button>
          </Link>
        </VStack>
      </HStack>
    </Box>
  );
};
export default Header;
