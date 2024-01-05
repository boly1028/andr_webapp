import { SparklesIcon } from "@/modules/common";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import { Button, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { FC } from "react";

interface MoreOnAppStoreProps { }

const MoreOnAppStore: FC<MoreOnAppStoreProps> = (props) => {
    const { } = props;

    return (
        <VStack bg='background.800' alignItems='stretch' spacing='4' fontSize='sm' w='full' p='3' rounded='lg'>
            <HStack gap='1' px='1'>
                <Icon as={SparklesIcon} boxSize='6' />
                <Text fontWeight='medium'>
                    More on App Store
                </Text>
            </HStack>
            <Link href={SITE_LINKS.appStore()} passHref legacyBehavior>
                <Button as='a' rightIcon={<Icon as={ArrowRight} boxSize='5' />} size='sm' colorScheme='primary'>
                    Browse Templates
                </Button>
            </Link>
        </VStack>
    );
};

export default MoreOnAppStore;