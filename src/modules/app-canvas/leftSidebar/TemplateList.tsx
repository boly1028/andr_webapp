import { ITemplate } from "@/lib/schema/types";
import ClassifierIcon, { useGetClassColor } from "@/theme/icons/classifiers";
import { Box, HStack, Icon, IconButton, Text, VStack } from "@chakra-ui/react";
import { ChevronLeft } from "lucide-react";
import React, { FC, useCallback } from "react";
import { useAppBuilder } from "../canvas/Provider";
import MoreOnAppStore from "../common/LoadTemplate/MoreOnAppStore";
import { useImportFlex } from "../hooks/useImportFlex";
import { IUIComponents } from "../types";

export interface TemplateListProps {
    name: string;
    list: ITemplate[];
}

const TemplateList: FC<TemplateListProps> = (props) => {
    const { name, list } = props;
    const { editorRef } = useAppBuilder()

    return (
        <Box>
            <HStack>
                <IconButton
                    aria-label="back-button"
                    icon={<Icon as={ChevronLeft} boxSize='5' />}
                    onClick={() => {
                        editorRef.current.setLeftSidebarComponent?.({ type: IUIComponents.INSERT })
                    }}
                    variant='ghost'
                    size='sm'
                />
                <Text fontSize='md' fontWeight='medium'>{name}</Text>
            </HStack>
            <VStack w='full' position='relative' spacing='2' mt='4'>
                {list.map((template) => {
                    return (
                        <TemplateListItem key={template.id} template={template} />
                    );
                })}
                <MoreOnAppStore />
            </VStack>
        </Box>
    );
};



interface TemplateListItemProps {
    template: ITemplate;
}

export const TemplateListItem: FC<TemplateListItemProps> = (props) => {
    const { template } = props;
    const { importFlexFile } = useImportFlex()

    const handleAdd = useCallback(async () => {
        await importFlexFile(template)
    }, [importFlexFile])

    const color = useGetClassColor({ adoType: template.id as any }, 'low')


    return (
        <Box
            _hover={{
                bg: 'newSystem.backgroundState.hover'
            }}
            bg={color}
            cursor='pointer' p='3' rounded='lg'
            w='full'
            h='full'
            onClick={handleAdd}
        >

            <VStack alignItems='stretch' fontSize='md' w='full' spacing={2.5}>
                <HStack gap='1'>
                    <ClassifierIcon boxSize='4' w='7' h='7' adoType={template.id} />
                    <Text fontWeight='medium' fontSize='sm' textOverflow='ellipsis' w='full' overflow='hidden' whiteSpace='nowrap'>
                        {template.name}
                    </Text>
                </HStack>
                <Text fontSize='xs' textOverflow='ellipsis' w='full' overflow='hidden' whiteSpace='nowrap'>
                    {template.description}
                </Text>
            </VStack>
        </Box>
    );
};


export default TemplateList;