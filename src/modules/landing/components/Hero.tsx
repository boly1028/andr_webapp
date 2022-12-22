import { AndromedaIcon, AppBuilder, AppStore, BookOpenIcon, CliIcon, FolderOpenIcon, SparklesIcon } from "@/modules/common";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import { Flex, VStack, Text, HStack, Icon, Stack, SimpleGrid } from "@chakra-ui/react";
import { Layers } from "lucide-react";
import React, { FC } from "react";
import { LandingAppsCard } from ".";

interface LandingHeroProps { }
const LandingHero: FC<LandingHeroProps> = () => {
  return (
    <Flex
      direction="column"
      w="full"
      p={{ base: 4, md: 8 }}
      alignItems="center"
      gap={6}
    >
      <AndromedaIcon boxSize="28" opacity={1} />
      <VStack textAlign="center" maxW="lg">
        <Text fontSize="3xl" fontWeight="bold">
          Welcome to Andromeda
        </Text>
        <Text fontSize="sm" fontWeight="light" color="gray.400">
          Get started with Lorem ipsum dolor sit amet, consectetur adipiscing
          elit ut aliquam, purus sit amet luctus venenatis, lectus magna
          fringilla urna.
        </Text>
      </VStack>
      <VStack mt="12" spacing="6" w='full'>
        <Text fontWeight="light" color="gray.400" textTransform="uppercase">
          Recommended links for you
        </Text>
        <SimpleGrid columns={3} w="full" gap="6" alignSelf='center' maxW='container.lg'>
          <LandingAppsCard
            icon={<AppBuilder boxSize="16" />}
            link={SITE_LINKS.flexBuilderHome()}
            title="Build an App"
          />
          <LandingAppsCard
            icon={<BookOpenIcon boxSize="16" />}
            link={SITE_LINKS.learn()}
            title="Learn ADO's"
          />
          <LandingAppsCard
            icon={<FolderOpenIcon boxSize="16" />}
            link={SITE_LINKS.assets()}
            title="Your Assets"
          />
          <LandingAppsCard
            icon={<SparklesIcon boxSize="16" />}
            link={SITE_LINKS.appStore()}
            title="App Store"
          />
          <LandingAppsCard
            icon={<CliIcon boxSize="16" />}
            link={SITE_LINKS.cli()}
            title="CLI"
          />
          <LandingAppsCard
            icon={<AndromedaIcon boxSize="16" />}
            link="https://andromedaprotocol.io/"
            title="Visit Website"
            target="_blank"
          />
        </SimpleGrid>
      </VStack>
    </Flex>
  );
};

export default LandingHero;
