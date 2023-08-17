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
  Divider,
  Flex,
  GridItem,
  HStack,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, ReactNode } from "react";

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
            <Image src={template.icon} w="12" />
            <Text fontWeight="bold" fontSize="2xl">
              {template.name}
            </Text>
          </HStack>
          <Text fontWeight="light" fontSize="sm" color="dark.500">
            {template.description}
          </Text>

          <Box maxW="xs">
            {template.installed ? (
              <HStack>
                <Link href={SITE_LINKS.flexBuilder(template.id)} legacyBehavior>
                  <Button w="full" size="lg" colorScheme="primary">
                    Open in ADO Builder
                  </Button>
                </Link>
                <Link href={SITE_LINKS.appBuilder(template.id)} legacyBehavior>
                  <Button w="full" size="lg" colorScheme="primary">
                    Open in App Builder
                  </Button>
                </Link>
              </HStack>
            ) : (
              <Button w="full" size="lg" colorScheme="primary">
                Get this template
              </Button>
            )}
          </Box>
          <Image mt="6" src="/app-store/placeholder-related.png" w="full" />
          <Image mt="6" src="/app-store/placeholder-developers.png" w="full" />
        </Flex>
        <Flex
          w="full"
          maxW="xs"
          border="1px"
          borderColor="dark.300"
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
                      px="4"
                      textTransform="capitalize"
                      fontWeight="medium"
                      fontSize="sm"
                      py="2"
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
                      px="4"
                      textTransform="capitalize"
                      fontWeight="medium"
                      fontSize="sm"
                      py="2"
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
            {template.ados.map((ado) => (
              <AdoItem key={ado.id} path={ado.path} />
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
    <VStack spacing={1} alignItems="start" fontSize="md">
      <Text color="dark.500" fontWeight="light">
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
        <ClassifierIcon adoType={ado?.schema?.$id ?? ""} />
        <Text>{ado?.schema?.title}</Text>
      </HStack>
    </Box>
  );
};
export default AppStoreItemPage;
