import APP_TEMPLATES from "@/lib/schema/templates";
import { Box, GridItem, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import React, { FC } from "react";
import { useImportFlex } from "../../hooks/useImportFlex";
import { TemplateListItem } from '../../leftSidebar/TemplateList'
import MoreOnAppStore from "./MoreOnAppStore";
import ImportFlexButton from '../importFlex'

interface LoadTemplateProps { }

const LoadTemplate: FC<LoadTemplateProps> = (props) => {
    const { } = props;
    const load = useImportFlex()

    return (
        <VStack p='4' maxW='container.sm' spacing={4}>
            <Text fontSize='2xl' fontWeight='bold'>
                Get started with a template
            </Text>
            <SimpleGrid columns={2} spacing='4' gridAutoRows="1fr">
                {APP_TEMPLATES.map(template => (
                    <GridItem key={template.id}>
                        <TemplateListItem template={template} />
                    </GridItem>
                ))}
                <GridItem>
                    <MoreOnAppStore />
                </GridItem>
            </SimpleGrid>
            <Text fontSize='sm' fontWeight='medium'>
                Or Open a Saved Project
            </Text>
            <Box>
                <ImportFlexButton rightIcon={undefined} bg='newSystem.primary.500' _hover={{
                    bg: 'newSystem.primary.hover'
                }}
                    size='lg'
                >
                    Open Project
                </ImportFlexButton>
            </Box>
        </VStack>
    );
};

export default LoadTemplate;