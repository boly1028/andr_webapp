import { ITemplate } from "@/lib/schema/types";
import { SparklesIcon } from "@/modules/common";
import useConfirmationModal from "@/modules/modals/hooks/useConfirmationModal";
import ClassifierIcon, { useGetClassColor } from "@/theme/icons/classifiers";
import { Box, Button, Divider, HStack, Icon, IconButton, Text, VStack } from "@chakra-ui/react";
import { ArrowRight, ChevronLeft } from "lucide-react";
import React, { FC, useCallback } from "react";
import { useAppBuilder } from "../canvas/Provider";
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

                <VStack mt='6 !important' bg='newSystem.background.800' alignItems='stretch' spacing='4' fontSize='sm' w='full' p='4' rounded='lg'>
                    <HStack gap='1' px='1'>
                        <Icon as={SparklesIcon} boxSize='6' />
                        <Text fontWeight='medium' textTransform='uppercase'>
                            More on App Store
                        </Text>
                    </HStack>
                    <Button rightIcon={<Icon as={ArrowRight} boxSize='5' />} size='sm' colorScheme='primary'>
                        Browse Templates
                    </Button>
                </VStack>
            </VStack>
        </Box>
    );
};



interface TemplateListItemProps {
    template: ITemplate;
}

export const TemplateListItem: FC<TemplateListItemProps> = (props) => {
    const { template } = props;
    const open = useConfirmationModal(
        'warning',
        '',
        'Opening a saved project or template will remove your current build. Do you want to proceed?', 'Open Template')
    const { importFlexFile } = useImportFlex()

    const handleAdd = useCallback(async () => {
        const ado = await importFlexFile(template);
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
            onClick={() => open(handleAdd)}
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