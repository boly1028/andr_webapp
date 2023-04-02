import { getSchemaFromPath } from "@/lib/schema/utils";
import { IAdoList } from "@/lib/schema/utils/list";
import ClassifierIcon, { useGetClassColor } from "@/theme/icons/classifiers";
import { AspectRatio, Box, Divider, GridItem, HStack, Icon, IconButton, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { ChevronLeft } from "lucide-react";
import React, { FC, useCallback } from "react";
import { useAppBuilder } from "../canvas/Provider";
import useAddNode from "../hooks/useAddNode";
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

    return (
        <AspectRatio ratio={1}>
            <Box
                cursor='pointer' rounded='lg'
                bg={color}
                onClick={() => handleAdd(ado.source)}
            >
                <VStack fontSize='md' w='full' spacing={2.5}>
                    <ClassifierIcon w='7' h='7' width='4' height='4' adoType={ado.$id} />
                    <Text fontSize='sm' fontWeight='medium'>
                        {ado.title}
                    </Text>
                </VStack>
            </Box>
        </AspectRatio>
    );
};


export default AdoList;