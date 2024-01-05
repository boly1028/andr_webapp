import { useGetSchemaJson } from "@/lib/schema/hooks";
import { ITemplate } from "@/lib/schema/types";
import { createFlexUrl } from "@/lib/schema/utils/flexFile";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import ClassifierIcon from "@/theme/icons/classifiers";
import { ExternalLink } from "@/theme/ui-elements";
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  GridItem,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, ReactNode } from "react";
import RelatedResources from "./RelatedResources";

interface AppStoreItemPageProps {
  template: ITemplate;
}
const AppStoreItemPage: FC<AppStoreItemPageProps> = (props) => {
  const { template } = props;
  return (
    <Box py="6">
      <Flex direction="row" gap="10" alignItems="start">
        <Flex direction="column" w="full" gap="6">
          <HStack spacing={4}>
            <Image src={template.icon} w="10" />
            <Text textStyle="main-2xl-medium">
              {template.name}
            </Text>
          </HStack>
          <Text textStyle="main-sm-regular" color="content.medium">
            {template.description}
          </Text>

          <Box maxW="xs">
            {template.installed ? (
              <ButtonGroup size='sm' variant="theme-low">
                <Button as={Link} href={SITE_LINKS.flexBuilder(template.id)}>
                  Open in ADO Builder
                </Button>
                <Button as={Link} href={SITE_LINKS.appBuilder(template.id)}>
                  Open in App Builder
                </Button>
              </ButtonGroup>
            ) : (
              <Button size='sm' variant="theme-low">
                Get this template
              </Button>
            )}
          </Box>
          <RelatedResources template={template} mt='6' />
          {/* <Image mt="6" src="/app-store/placeholder-related.png" w="full" /> */}
          {/* <Image mt="6" src="/app-store/placeholder-developers.png" w="full" /> */}
        </Flex>
        <Flex
          w="full"
          maxW="xs"
          border="1px"
          borderColor="border.main"
          rounded="xl"
          p="6"
          gap="6"
          direction="column"
        >
          <SimpleGrid columns={2} gap={6}>
            <GridItem>
              <InfoItem title="Creator">
                <HStack>
                  <Image src="/verified.png" w="5" />
                  <Text fontWeight="medium">Andromeda</Text>
                </HStack>
              </InfoItem>
            </GridItem>
            <GridItem>
              <InfoItem title="Version">
                <Text>1.45</Text>
              </InfoItem>
            </GridItem>
            <GridItem>
              <InfoItem title="Published">
                <Text>Sep 19, 2022</Text>
              </InfoItem>
            </GridItem>
            <GridItem>
              <InfoItem title="Latest update">
                <Text>Sep 30, 2022</Text>
              </InfoItem>
            </GridItem>
            <GridItem colSpan={2}>
              <InfoItem title="Category">
                <Flex gap="2" wrap="wrap">
                  {CATEGORIES.map((cat) => (
                    <Badge
                      px="3"
                      textTransform="capitalize"
                      textStyle="main-md-regular"
                      py="1"
                      rounded="full"
                      key={cat}
                    >
                      {cat}
                    </Badge>
                  ))}
                </Flex>
              </InfoItem>
            </GridItem>
            <GridItem colSpan={2}>
              <InfoItem title="Use Case">
                <Flex gap="2" wrap="wrap">
                  {USE_CASES.map((cat) => (
                    <Badge
                      px="3"
                      textTransform="capitalize"
                      textStyle="main-md-regular"
                      py="1"
                      rounded="full"
                      key={cat}
                    >
                      {cat}
                    </Badge>
                  ))}
                </Flex>
              </InfoItem>
            </GridItem>
          </SimpleGrid>
          <Box>
            <Text color="dark.500">Documentation</Text>
            {/* <ExternalLink
              href={SITE_LINKS.documentation(app.templateId)}
              label="Gitbook"
            /> */}
            <ExternalLink
              href="https://docs.andromedaprotocol.io/andromeda/andromeda-apps/introduction-to-apps"
              label="Gitbook"
            />
          </Box>
          <Divider color="dark.300" />
          <Text color="base.white">Components used in this app</Text>
          <VStack alignItems="start" spacing={4}>
            {Array.from(new Set([...template.ados, ...template.modules ?? []].map(a => a.path))).map((path) => (
              <AdoItem key={path} path={path} />
            ))}
          </VStack>
        </Flex>
      </Flex>
    </Box>
  );
};

interface InfoItemProps {
  title: string;
  children?: ReactNode;
}
const InfoItem: FC<InfoItemProps> = (props) => {
  const { title, children } = props;

  return (
    <VStack spacing={1} alignItems="start" textStyle="main-sm-regular">
      <Text textStyle="main-xs-regular" color="content.medium" >
        {title}
      </Text>
      <Box fontWeight="medium">{children}</Box>
    </VStack>
  );
};

const CATEGORIES = ["DeFi", "Operations"];
const USE_CASES = ["Launchpad", "Fundraising", "Charity"];

interface AdoItemProps {
  path: string;
}
const AdoItem: FC<AdoItemProps> = (props) => {
  const { path } = props;
  const { data: ado } = useGetSchemaJson(path);

  if (ado?.schema?.class === "system") return null;
  return (
    <Box>
      <HStack spacing={4}>
        <ClassifierIcon adoType={ado?.schema?.$id ?? ""} boxSize={4} />
        <Text textStyle="main-md-medium">{ado?.schema?.title}</Text>
        <Text textStyle="main-xs-regular" color='content.low'>v{ado?.schema?.version}</Text>
      </HStack>
    </Box>
  );
};
export default AppStoreItemPage;
