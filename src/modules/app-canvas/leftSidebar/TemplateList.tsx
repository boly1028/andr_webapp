import { ITemplate } from "@/lib/schema/types";
import { getSchemaFromPath, nextSuid, suid } from "@/lib/schema/utils";
import { SparklesIcon, truncate } from "@/modules/common";
import useConfirmationModal from "@/modules/modals/hooks/useConfirmationModal";
import ClassifierIcon from "@/theme/icons/classifiers";
import { TmpButton } from "@/theme/new-system-tmp/ui-elements";
import { ArrowRightIcon, ChevronRightIcon } from "@chakra-ui/icons";
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
                    icon={<Icon as={ChevronLeft} boxSize='6' />}
                    onClick={() => {
                        editorRef.current.setLeftSidebarComponent?.({ type: IUIComponents.INSERT })
                    }}
                    variant='ghost'
                />
                <Text fontSize='xl' fontWeight='medium'>{name}</Text>
            </HStack>
            <VStack w='full' position='relative' spacing='2' divider={<Divider />} mt='4'>
                {list.map((template) => {
                    return (
                        <TemplateListItem key={template.id} template={template} />
                    );
                })}

                <VStack bg='newSystem.background.800' alignItems='stretch' spacing='4' fontSize='md' w='full' p='4' rounded='lg'>
                    <HStack gap='2'>
                        <Icon as={SparklesIcon} boxSize='6' />
                        <Text fontWeight='medium' textTransform='uppercase'>
                            More on App Store
                        </Text>
                    </HStack>
                    <Button rightIcon={<Icon as={ArrowRight} boxSize='5' />} size='lg' colorScheme='primary' fontSize='md'>
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

    return (
        <Box
            _hover={{
                bg: 'newSystem.backgroundState.hover'
            }}
            cursor='pointer' p='3' rounded='lg'
            w='full'
            onClick={() => open(handleAdd)}
        >
            <VStack alignItems='stretch' fontSize='md' w='full'>
                <HStack gap='2'>
                    <ClassifierIcon w='7' h='7' width='5' height='5' adoType={template.adoType} />
                    <Text fontWeight='medium' textTransform='uppercase'>
                        {template.name}
                    </Text>
                </HStack>
                <Text fontSize='sm' textOverflow='ellipsis' w='full' overflow='hidden' whiteSpace='nowrap'>
                    {template.description}
                </Text>
            </VStack>
        </Box>
    );
};


export default TemplateList;