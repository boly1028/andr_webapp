import { EMBEDDABLE_TEMPLATES } from '@/lib/schema/templates/embeddable'
import { Heading, Box, Text, VStack, HStack, Image, SimpleGrid, GridItem, Link as ChakraLink, Tooltip } from '@chakra-ui/react'
import { BackdropCard } from "@/modules/common";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import { ITemplate } from "@/lib/schema/types";
import Link from "next/link";
import { FC } from 'react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
// import { CodeBrowser } from '@/modules/common';

const EmbedableExamples = () => {
    return (
        <></>
        // <Box>
        //     <VStack spacing={'10px'} alignItems='flex-start'>
        //         <Heading fontSize={'20px'} fontWeight='500'>Examples</Heading>
        //         <Text fontWeight={400} fontSize='14px' color='rgba(255, 255, 255, 0.6)'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, quod.</Text>
        //     </VStack>
        //     <SimpleGrid
        //         gridAutoRows="1fr"
        //         columns={{ sm: 2, md: 3, lg: 4 }}
        //         spacing="6"
        //         my={8}
        //     >
        //         {EMBEDDABLE_TEMPLATES.map((template) => (
        //             <GridItem key={template.id}>
        //                 <EmbeddableTemplateItem template={template} />
        //             </GridItem>
        //         ))}
        //     </SimpleGrid>
        // </Box>
    )
}


/**
 * Flex Builder Template Card with button as link which routes to template builder form component
 * @param {template} ITemplate
 */
type EmbeddableTemplateListItemProps = {
    template: typeof EMBEDDABLE_TEMPLATES[0];
};

const EmbeddableTemplateItem: FC<EmbeddableTemplateListItemProps> = ({ template }) => {
    return (
        <Link href={SITE_LINKS.embeddablesBuild(template.id)}>
            <Box
                h="full"
                rounded="lg"
                overflow="hidden"
                // _hover={{ scale: "105%", borderWidth: "1px" }}
                borderColor="dark.300"
                cursor="pointer"
                transform="auto"
                transition="all"
                transitionDuration="150ms"
                transitionTimingFunction="ease-out"
            >
                <BackdropCard
                    logoComponent={<Image w="40%" mb="20%" src={template.icon} />}
                >
                    <Box px="2">
                        {/* <HStack>
              <Image src="/verified.png" w="4" />
              <Text fontSize="sm" fontWeight="medium">
                Andromeda
              </Text>
            </HStack> */}
                        <HStack justifyContent='space-between' alignItems='center'>
                            <Text
                                textOverflow="ellipsis"
                                w="80%"
                                whiteSpace="nowrap"
                                overflow="hidden"
                                fontSize="xl"
                                fontWeight="bold"
                            >
                                {template.name}
                            </Text>
                            {template.preview && (
                                <Tooltip label='Preview Link' openDelay={300}>
                                    <ChakraLink onClick={(e) => e.stopPropagation()} target='_blank' href={template.preview} colorScheme='teal' fontSize='xs'>
                                        <ExternalLinkIcon w='4' h='4' color='newSystem.primary.300' />
                                    </ChakraLink>
                                </Tooltip>
                            )}
                        </HStack>
                        <Text
                            textOverflow="ellipsis"
                            w="full"
                            whiteSpace="nowrap"
                            overflow="hidden"
                            mt="1"
                            mb="2"
                            fontSize="sm"
                            fontWeight="light"
                            color="dark.500"
                        >
                            {template.description}
                        </Text>
                    </Box>
                </BackdropCard>
            </Box>
        </Link>
    );
};


export default EmbedableExamples