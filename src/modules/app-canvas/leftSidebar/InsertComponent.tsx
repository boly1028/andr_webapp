import APP_TEMPLATES from '@/lib/schema/templates'
import { ITemplate } from '@/lib/schema/types'
import { getSchemaFromPath, nextSuid, suid } from '@/lib/schema/utils'
import { BASE_ADOS, IAdoList, MODIFIERS, MODULES } from '@/lib/schema/utils/list'
import { FilePlusIcon } from '@/theme/icons'
import ClassifierIcon from '@/theme/icons/classifiers'
import { TmpButton } from '@/theme/new-system-tmp/ui-elements'
import { ChevronRightIcon, SearchIcon } from '@chakra-ui/icons'
import { Box, Button, Divider, HStack, Icon, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, Text, VStack } from '@chakra-ui/react'
import React, { FC, useCallback } from 'react'
import { ReactNode } from 'react-markdown/lib/react-markdown'
import { useAppBuilder } from '../canvas/Provider'
import { IUIComponents } from '../types'

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
                <ADOButton list={BASE_ADOS} name='ADOs' leftIcon={<ClassifierIcon adoType='app' boxSize='5' />} />
                <ADOButton list={MODULES} name='Modules' leftIcon={<ClassifierIcon adoType='address-list' schemaClass='module' boxSize='5' />} />
            </VStack>
            <Divider />
            <Text>Templates</Text>
            <VStack alignItems='stretch'>
                <TemplateButton list={APP_TEMPLATES} name='Templates' leftIcon={<Icon as={FilePlusIcon} boxSize='5' />} />
            </VStack>
        </VStack>
    )
}


interface ADOButtonProps {
    name: string;
    list: IAdoList;
    leftIcon: React.ReactElement
}

const ADOButton: FC<ADOButtonProps> = (props) => {
    const { name, list, leftIcon } = props;
    const { editorRef } = useAppBuilder()
    const openAdoList = () => {
        editorRef.current.setLeftSidebarComponent?.({
            type: IUIComponents.ADO_LIST,
            list,
            name
        })
    }
    return (
        <TmpButton
            leftIcon={leftIcon}
            onClick={() => openAdoList()}
            rightIcon={<Icon as={ChevronRightIcon} boxSize='5' ml='auto' />}
            bg='transparent'
            textAlign='left'
            size='lg'
        >
            <Text flex={1}>
                {name}
            </Text>
        </TmpButton>
    );
};

interface TemplateButtonProps {
    name: string;
    list: ITemplate[];
    leftIcon: React.ReactElement
}

const TemplateButton: FC<TemplateButtonProps> = (props) => {
    const { name, list, leftIcon } = props;
    const { editorRef } = useAppBuilder()
    const openAdoList = () => {
        editorRef.current.setLeftSidebarComponent?.({
            type: IUIComponents.TEMPLATE_LIST,
            list,
            name
        })
    }
    return (
        <TmpButton
            leftIcon={leftIcon}
            onClick={() => openAdoList()}
            rightIcon={<Icon as={ChevronRightIcon} boxSize='5' ml='auto' />}
            bg='transparent'
            textAlign='left'
            size='lg'
        >
            <Text flex={1}>
                {name}
            </Text>
        </TmpButton>
    );
};

export default InsertComponent