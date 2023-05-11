import APP_TEMPLATES from "@/lib/schema/templates";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  GridItem,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { FC } from "react";
import Header from "./Header";
import TemplateCard from "./TemplateCard";

interface AppStorePageProps {}
const AppStorePage: FC<AppStorePageProps> = (props) => {
  const {} = props;

  return (
    <Box pb="10">
      <Header />
      <SimpleGrid gridAutoRows="1fr" columns={3} mt="10" gap="6">
        {APP_TEMPLATES.filter((t) => !t.system).map((template, idx) => (
          <GridItem key={idx}>
            <TemplateCard template={template} />
          </GridItem>
        ))}
      </SimpleGrid>
      <Divider color="dark.300" my="10" />
      <SimpleGrid columns={3} gap="6" gridAutoRows="1fr">
        <GridItem>
          <Box bg="dark.50" rounded="xl" p="6">
            <Image src="/logo_outline.png" w="16" />
            <Text fontWeight="bold" fontSize="4xl" mt="4">
              Build Your App
            </Text>
            <Text color="dark.500" mt="6">
            Quickly build your app with a template or start from scratch.
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
