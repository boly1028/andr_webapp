import { getSchemaFromPath, nextSuid, suid } from "@/lib/schema/utils";
import { IAdoList } from "@/lib/schema/utils/list";
import ClassifierIcon from "@/theme/icons/classifiers";
import { TmpButton } from "@/theme/new-system-tmp/ui-elements";
import { Box, Divider, HStack, Icon, IconButton, Text, VStack } from "@chakra-ui/react";
import { ChevronLeft } from "lucide-react";
import React, { FC, useCallback } from "react";
import { useAppBuilder } from "../canvas/Provider";
import { IUIComponents } from "../types";

export interface AdoListProps {
    name: string;
    list: IAdoList;
}

const AdoList: FC<AdoListProps> = (props) => {
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
                {list.map((ado) => {
                    return (
                        <AdoListItem key={ado.source} ado={ado} />
                    );
                })}
            </VStack>
        </Box>
    );
};



interface AdoListItemProps {
    ado: IAdoList[number];
}

export const AdoListItem: FC<AdoListItemProps> = (props) => {
    const { ado } = props;
    const { nodes, addNode } = useAppBuilder()

    const handleAdd = useCallback(async (source: string) => {
        const ado = await getSchemaFromPath(source);
        let name = suid()
        while (nodes.some(node => node.id === name)) {
            name = nextSuid(name);
        }
        addNode(ado, name)
    }, [nodes, addNode])

    return (
        <Box
            _hover={{
                bg: 'newSystem.backgroundState.hover'
            }}
            cursor='pointer' p='3' rounded='lg'
            onClick={() => handleAdd(ado.source)}
        >
            <VStack alignItems='stretch' fontSize='md' w='full'>
                <HStack gap='2'>
                    <ClassifierIcon w='7' h='7' width='5' height='5' adoType={ado.$id} />
                    <Text fontWeight='medium' textTransform='uppercase'>
                        {ado.title}
                    </Text>
                </HStack>
                <Text fontSize='sm' textOverflow='ellipsis' w='full' overflow='hidden'>
                    Enable and integrate a marketplace in your your app or site.
                </Text>
            </VStack>
        </Box>
    );
};


export default AdoList;