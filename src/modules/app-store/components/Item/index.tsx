import { useGetSchemaJson } from "@/lib/schema/hooks";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import ClassifierIcon from "@/theme/icons/classifiers";
import { ExternalLink } from "@/theme/ui-elements";
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { FC } from "react";
import { IAppItem } from "../../types";

interface AppStoreItemPageProps {
  app: IAppItem;
}
const AppStoreItemPage: FC<AppStoreItemPageProps> = (props) => {
  const { app } = props;

  return (
    <Box py="6">
      <Flex direction="row" gap="10" alignItems="start">
        <Flex direction="column" w="full" gap="6">
          <HStack spacing={4}>
            <Image src="/app-store/templates/icon.png" w="12" />
            <Text fontWeight="bold" fontSize="2xl">
              {app.name}
            </Text>
          </HStack>
          <Text fontWeight="light" fontSize="sm" color="dark.500">
            {app.description}
          </Text>

          <Box maxW="xs">
            {app.installed ? (
              <Link href={SITE_LINKS.flexBuilder(app.templateId)} passHref>
                <Button as="a" w="full" size="lg" colorScheme="primary">
                  Run
                </Button>
              </Link>
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
          <Image src="/app-store/placeholder-creator.png" w="full" />
          <Image src="/app-store/placeholder-updatedAt.png" w="full" />
          <Image src="/app-store/placeholder-category.png" w="full" />
          <Box>
            <Text color="dark.500">Documentation</Text>
            <ExternalLink
              href={SITE_LINKS.documentation(app.templateId)}
              label="Gitbook"
            />
          </Box>
          <Divider color="dark.300" />
          <Text color="base.white">Components used in this app</Text>
          <VStack alignItems="start" spacing={4}>
            {app.ados.map((ado) => (
              <AdoItem key={ado.id} path={ado.path} />
            ))}
          </VStack>
        </Flex>
      </Flex>
    </Box>
  );
};

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
