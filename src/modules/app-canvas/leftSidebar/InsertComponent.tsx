import { getSchemaFromPath, nextSuid, suid } from '@/lib/schema/utils'
import { BASE_ADOS, MODIFIERS, MODULES } from '@/lib/schema/utils/list'
import ClassifierIcon from '@/theme/icons/classifiers'
import { ChevronRightIcon, SearchIcon } from '@chakra-ui/icons'
import { Button, Icon, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, Text, VStack } from '@chakra-ui/react'
import React, { FC, useCallback } from 'react'
import { ReactNode } from 'react-markdown/lib/react-markdown'
import { useAppBuilder } from '../canvas/Provider'

interface InsertComponentProps {

}
const InsertComponent: FC<InsertComponentProps> = (props) => {
    const { } = props

    return (
        <VStack alignItems='stretch' gap='2' textColor='dark.500'>
            <InputGroup size='lg'>
                <InputLeftElement
                    pointerEvents='none'
                >
                    <SearchIcon color='gray.300' />
                </InputLeftElement>
                <Input placeholder='Search' />
            </InputGroup>
            <Text>Components</Text>
            <VStack alignItems='stretch'>
                <InsertComponentItem name="ADOs" list={BASE_ADOS} leftIcon={<ClassifierIcon adoType='app' boxSize='5' />} />
                <InsertComponentItem name="Modules" list={MODULES} leftIcon={<ClassifierIcon adoType='address-list' schemaClass='module' boxSize='5' />} />
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
                as={Button}
                variant='ghost'
                rightIcon={<Icon as={ChevronRightIcon} boxSize='5' />}
                leftIcon={leftIcon}
                textAlign='left'
                size='lg'
            >
                {name}
            </MenuButton>
            <MenuList>
                {list?.map((ado) => {
                    return (
                        <MenuItem key={ado.source} onClick={() => handleAdd(ado.source)}>
                            {/* <MenuItem icon={<Icon as={EyeIcon} boxSize={5} />}> */}
                            {ado.title}
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    )
}

export default InsertComponent