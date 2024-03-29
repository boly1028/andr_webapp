import { getSchemaFromPath } from "@/lib/schema/utils";
import ClassifierIcon, { useGetClassColor } from "@/theme/icons/classifiers";
import { AspectRatio, Box, Divider, GridItem, HStack, Icon, IconButton, SimpleGrid, Text, Tooltip, VStack } from "@chakra-ui/react";
import { ChevronLeft } from "lucide-react";
import React, { FC, useCallback } from "react";
import { useAppBuilder } from "../canvas/Provider";
import useAddNode from "../hooks/useAddNode";
import { IUIComponents, RF_DRAG_KEYS } from "../types";
import { IAdoList } from "@/lib/schema/types/templates";

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
                    icon={<Icon as={ChevronLeft} boxSize='5' />}
                    onClick={() => {
                        editorRef.current.setLeftSidebarComponent?.({ type: IUIComponents.INSERT })
                    }}
                    variant='ghost'
                    size='sm'
                />
                <Text fontSize='md' fontWeight='medium'>{name}</Text>
            </HStack>
            <SimpleGrid w='full' position='relative' spacing='2' columns={2} mt='4'>
                {list.map((ado) => {
                    return (
                        <GridItem key={ado.source}>
                            <AdoListItem ado={ado} />
                        </GridItem>
                    );
                })}
            </SimpleGrid>
        </Box>
    );
};



interface AdoListItemProps {
    ado: IAdoList[number];
}

export const AdoListItem: FC<AdoListItemProps> = (props) => {
    const { ado } = props;
    const addNode = useAddNode()

    const handleAdd = useCallback(async (source: string) => {
        const ado = await getSchemaFromPath(source);
        addNode(ado)
    }, [addNode])

    const color = useGetClassColor({ adoType: ado.$id as any }, 'low')

    const onDragStart = (event) => {
        event.dataTransfer.setData(RF_DRAG_KEYS.SCHEMA, ado.source);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <AspectRatio ratio={1} onDragStart={onDragStart} draggable>
            <Box
                cursor='pointer' rounded='lg'
                bg={color}
                onClick={() => handleAdd(ado.source)}
            >
                <VStack fontSize='md' w='full' spacing={2.5}>
                    <ClassifierIcon w='7' h='7' width='4' height='4' adoType={ado.$id} />
                    <Tooltip label={ado.title}>
                        <Text textStyle="main-xs-semibold" textAlign="center" whiteSpace="nowrap" textOverflow="ellipsis" w='80%' overflow="hidden">
                            {ado.title}
                        </Text>
                    </Tooltip>
                </VStack>
            </Box>
        </AspectRatio>
    );
};


export default AdoList;