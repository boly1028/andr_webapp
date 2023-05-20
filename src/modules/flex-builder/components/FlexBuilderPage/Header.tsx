// import { PlusIcon } from "@/modules/common";
// import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import {
  Box,
  // Button,
  // Center,
  Flex,
  // HStack,
  Text,
  // useTheme,
  // VStack,
  Image,
  Heading
} from "@chakra-ui/react";
// import { ChevronRight } from "lucide-react";
// import Link from "next/link";
import React, { FC } from "react";

interface HeaderProps { }
const Header: FC<HeaderProps> = (props) => {
  const { } = props;
  // const theme = useTheme();
  // const dark = theme.colors.dark;

  return (
    // <Box border="1px" borderColor="dark.300" p="4" rounded="lg">
    //   <HStack alignItems="stretch" spacing={6}>
    //     <Center
    //       rounded="lg"
    //       background={`${dark[50]} url("/logo_outline.png") no-repeat center`}
    //       backgroundSize="12rem"
    //       w="20rem"
    //       h="15rem"
    //       flexShrink={0}
    //     >
    //       <PlusIcon boxSize='3rem' mt='2' />
    //     </Center>
    //     <VStack alignItems="start" pb="3">
    //       <Text fontSize="lg" fontWeight="bold">
    //         Blank Canvas
    //       </Text>
    //       <Text fontSize="sm" color="dark.500">
    //         You don&apos;t have to use a template! Start from scratch building out
    //         your own ADO structure to be just the way you like it.
    //       </Text>
    //       <Link href={SITE_LINKS.flexBuilder("app")} passHref>
    //         <Button
    //           as="a"
    //           colorScheme="primary"
    //           w="xs"
    //           mt="auto !important"
    //           rightIcon={<ChevronRight width="16" />}
    //         >
    //           Get Started
    //         </Button>
    //       </Link>
    //     </VStack>
    //   </HStack>
    // </Box>
    <Box>
      <Flex alignItems={'center'} justifyContent='space-between'>
        <Box width='402px'>
          <Heading fontSize={'36px'} fontWeight={'600'} lineHeight={'44px'} pb='20px'>Ready, Set, Build!</Heading>
          <Text fontSize={14} fontWeight={400} lineHeight={'20px'} color='rgba(255, 255, 255, 0.6)'>Get started with ready-made apps and templates or develop from scratch.</Text>
        </Box>
        <Box>
          <Image alt="" src='/desktop/new_ado_starter_img.png' />
        </Box>
      </Flex>
    </Box >
  );
};
export default Header;
