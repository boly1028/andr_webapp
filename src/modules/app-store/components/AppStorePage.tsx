import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  GridItem,
  Image,
  LinkBox,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { FC } from "react";
import { APP_STORE_TEMPLATES } from "../constants";
import Header from "./Header";

interface AppStorePageProps {}
const AppStorePage: FC<AppStorePageProps> = (props) => {
  const {} = props;

  return (
    <Box pb="10">
      <Header />
      <SimpleGrid gridAutoRows="1fr" columns={3} mt="10" gap="6">
        {APP_STORE_TEMPLATES.map((template, idx) => (
          <GridItem key={idx}>
            <Link href={SITE_LINKS.appStoreItem(template.id)}>
              <Box
                cursor="pointer"
                _hover={{
                  scale: "105%",
                  borderWidth: "1px",
                }}
                borderColor="dark.500"
                rounded="xl"
                transition="all"
                transitionDuration="500ms"
                transitionTimingFunction="ease-out"
                transform="auto"
              >
                <Image src={template.src} w="full" />
              </Box>
            </Link>
          </GridItem>
        ))}
      </SimpleGrid>
      <Divider color="dark.300" my="10" />
      <SimpleGrid columns={3} gap="6" gridAutoRows="1fr">
        <GridItem>
          <Box bg="dark.50" rounded="xl" p="6">
            <Image src="/logo_outline.png" w="16" />
            <Text fontWeight="bold" fontSize="4xl" mt="4">
              Build your app
            </Text>
            <Text color="dark.500" mt="6">
              Start from scratch to build your own app.
            </Text>
            <Link href={SITE_LINKS.flexBuilder("app")} passHref>
              <Button
                as="a"
                mt={10}
                w="full"
                size="lg"
                colorScheme="primary"
                rightIcon={<ChevronRightIcon boxSize={5} />}
              >
                Get Started
              </Button>
            </Link>
          </Box>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};
export default AppStorePage;
