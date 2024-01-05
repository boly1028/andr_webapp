import React, { FC } from "react";
import {
  Box,
  Button,
  Divider,
  GridItem,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { PageHeader, SparklesIcon } from "@/modules/common";
import { ITemplate } from "@/lib/schema/types";
import AppTemplateItem from "./AppTemplateItem";
import FlexUploadCard from "./FlexUploadCard";
import Header from "./Header";
import Link from "next/link";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import { ChevronRightIcon } from "@chakra-ui/icons";

/**
 * Display all predefined templates
 * @param {templateList} Array<ITemplate>
 */

type FlexBuilderPageProps = {
  templateList: Array<ITemplate>;
};

const FlexBuilderPage: FC<FlexBuilderPageProps> = ({ templateList }) => {
  return (
    <Box>
      {/* <PageHeader
        title="Get Started"
        desc="Start from scratch to publish NFT collectibles, DeFi instruments and generic ADOs from starter templates!"
      /> */}
      <Box my="6">
        <Header />
      </Box>
      <PageHeader
        title="Use our templates"
        desc="Get Started with our templates and you are in the fast lane to your next ADO/App."
      />
      <SimpleGrid
        gridAutoRows="1fr"
        columns={{ sm: 1, md: 2, lg: 3 }}
        spacing="6"
        my={8}
      >
        {/* Render First template in templateList */}
        {templateList.slice(0, 1).map((template) => (
          <GridItem key={template.id}>
            <AppTemplateItem template={template} />
          </GridItem>
        ))}

        {/* Flex upload template card */}
        <GridItem>
          <FlexUploadCard />
        </GridItem>

        {/* All other predifined templates from templateList */}
        {templateList.slice(1).map((template) => (
          <GridItem key={template.id}>
            <AppTemplateItem template={template} />
          </GridItem>
        ))}
      </SimpleGrid>
      <Divider color="dark.300" my="6" />

      <SimpleGrid columns={3} gap="6" gridAutoRows="1fr">
        <GridItem>
          <Box bg="backgroundState.idle" rounded="xl" p="6">
            <SparklesIcon boxSize="12" color="primary.500" />
            <Text textStyle="main-2xl-semibold" mt="4">
              More on App Store
            </Text>
            <Text mt="6" textStyle="main-sm-regular" color='content.medium'>
              Build with ready-made apps and templates by Andromeda and the
              community.
            </Text>
            <Link href={SITE_LINKS.appStore()} passHref legacyBehavior>
              <Button
                as="a"
                mt={10}
                w="full"
                size="lg"
                variant="theme-low"
                rightIcon={<ChevronRightIcon boxSize={5} />}
              >
                App Store
              </Button>
            </Link>
          </Box>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default FlexBuilderPage;
