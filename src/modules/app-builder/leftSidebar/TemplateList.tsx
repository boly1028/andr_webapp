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
                <Text textStyle="main-md-semibold">{name}</Text>
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
                bg: 'backgroundState.hover'
            }}
            bg={color}
            cursor='pointer' p='3' rounded='lg'
            w='full'
            h='full'
            onClick={handleAdd}
        >

            <HStack spacing='2'>
                <ClassifierIcon boxSize='4' w='28px' h='28px' adoType={template.id} />
                <VStack alignItems='stretch' fontSize='md' w='full' overflow='hidden' spacing={1}>
                    <Text textStyle='main-sm-semibold' textOverflow='ellipsis' w='full' overflow='hidden' whiteSpace='nowrap'>
                        {template.name}
                    </Text>
                    <Text textStyle='main-xs-regular' textOverflow='ellipsis' w='full' overflow='hidden' whiteSpace='nowrap'>
                        {template.description}
                    </Text>
                </VStack>
            </HStack>
        </Box>
    );
};


export default TemplateList;