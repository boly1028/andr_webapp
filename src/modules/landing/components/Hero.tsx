import { AndromedaIcon, AppStore, BookOpenIcon, FolderOpenIcon } from "@/modules/common";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import { app } from "@/theme/icons/classifiers";
import { Flex, VStack, Text, HStack, Icon, Stack } from "@chakra-ui/react";
import React, { FC } from "react";
import { LandingAppsCard } from ".";

interface LandingHeroProps {}
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
      <VStack mt="12" spacing="6">
        <Text fontWeight="light" color="gray.400" textTransform="uppercase">
          Recommended links for you
        </Text>
        <Flex direction='row' justifyContent='center' w="full" gap="6" wrap="wrap">
          <LandingAppsCard
            icon={<Icon as={app} boxSize="16" />}
            link={SITE_LINKS.flexBuilderHome()}
            title="Build an App"
          />
          <LandingAppsCard
            icon={<BookOpenIcon boxSize="16" />}
            link="https://docs.andromedaprotocol.io/andromeda"
            title="Learn ADO's"
            target="_blank"
          />
          <LandingAppsCard
            icon={<FolderOpenIcon boxSize="16" />}
            link={SITE_LINKS.assets()}
            title="Your Assets"
          />
           <LandingAppsCard
            icon={<AppStore boxSize="16" />}
            link={SITE_LINKS.appStore()}
            title="App Store"
          />
          <LandingAppsCard
            icon={<AndromedaIcon boxSize="16" />}
            link="https://andromedaprotocol.io/"
            title="Visit Website"
            target="_blank"
          />
        </Flex>
      </VStack>
    </Flex>
  );
};

export default LandingHero;
