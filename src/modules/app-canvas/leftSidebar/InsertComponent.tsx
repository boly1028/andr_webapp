import { getSchemaFromPath, nextSuid, suid } from '@/lib/schema/utils'
import { BASE_ADOS, MODIFIERS, MODULES } from '@/lib/schema/utils/list'
import ClassifierIcon from '@/theme/icons/classifiers'
import { TmpButton } from '@/theme/new-system-tmp/ui-elements'
import { ChevronRightIcon, SearchIcon } from '@chakra-ui/icons'
import { Box, Button, Divider, HStack, Icon, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, Text, VStack } from '@chakra-ui/react'
import React, { FC, useCallback } from 'react'
import { ReactNode } from 'react-markdown/lib/react-markdown'
import { useAppBuilder } from '../canvas/Provider'

export interface InsertComponentProps {

}
const InsertComponent: FC<InsertComponentProps> = (props) => {
    const { } = props

    return (
        <VStack alignItems='stretch' gap='2' textColor='newSystem.content.medium'>
            <InputGroup size='lg' rounded='xl' bg='newSystem.backgroundState.idle'>
                <InputLeftElement
                    pointerEvents='none'
                >
                    <SearchIcon color="newSystem.content.medium" />
                </InputLeftElement>
                <Input rounded='xl' placeholder='Search' />
            </InputGroup>
            <Divider />
            <Text>App Components</Text>
            <VStack alignItems='stretch'>
                <InsertComponentItem name="ADOs" list={BASE_ADOS} leftIcon={<ClassifierIcon adoType='app' boxSize='5' />} />
                <InsertComponentItem name="Modules" list={MODULES} leftIcon={<ClassifierIcon adoType='address-list' schemaClass='module' boxSize='5' />} />
            </VStack>
            <Divider />
            <Text>Templates</Text>
            <VStack alignItems='stretch'>
                <InsertComponentItem name="ADOs" list={BASE_ADOS} leftIcon={<ClassifierIcon adoType='app' boxSize='5' />} />
            </VStack>
        </VStack>
    )
}


interface InsertComponentItemProps {
    name: string;
    list: typeof BASE_ADOS
    leftIcon: ReactNode
}
const InsertComponentItem: FC<InsertComponentItemProps> = (props) => {
    const { name, list, leftIcon } = props
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
        <Menu placement='right-end'>
            <MenuButton
                as={TmpButton}
                variant='ghost'
                bg='transparent'
                rightIcon={<Icon as={ChevronRightIcon} boxSize='5' />}
                leftIcon={leftIcon}
                textAlign='left'
                size='lg'
                fontSize='md'
            >
                {name}
            </MenuButton>
            <MenuList maxWidth='72'>
                {list?.map((ado) => {
                    return (
                        <MenuItem key={ado.source} onClick={() => handleAdd(ado.source)}>
                            <VStack alignItems='stretch' fontSize='md' w='full'>
                                <HStack gap='2'>
                                    <ClassifierIcon w='7' h='7' width='5' height='5' adoType={ado.$id} />
                                    <Text>
                                        {ado.title}
                                    </Text>
                                </HStack>
                                <Text fontSize='sm' textOverflow='ellipsis' whiteSpace='nowrap' w='full' overflow='hidden'>
                                    Enable and integrate a marketplace in your your app or site.
                                </Text>
                            </VStack>
                            {/* <MenuItem icon={<Icon as={EyeIcon} boxSize={5} />}> */}
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    )
}

export default InsertComponent