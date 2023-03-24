import APP_TEMPLATES from '@/lib/schema/templates'
import { ITemplate } from '@/lib/schema/types'
import { BASE_ADOS, IAdoList, MODIFIERS, MODULES } from '@/lib/schema/utils/list'
import { ListIcon, SearchBar } from '@/modules/common'
import { FilePlusIcon } from '@/theme/icons'
import ClassifierIcon from '@/theme/icons/classifiers'
import { TmpButton } from '@/theme/new-system-tmp/ui-elements'
import { ChevronRightIcon, SearchIcon } from '@chakra-ui/icons'
import { Divider, Icon, Text, VStack } from '@chakra-ui/react'
import React, { FC } from 'react'
import { useAppBuilder } from '../canvas/Provider'
import { IUIComponents } from '../types'

export interface InsertComponentProps {

}
const InsertComponent: FC<InsertComponentProps> = (props) => {
    const { } = props

    return (
        <VStack alignItems='stretch' gap='1' textColor='newSystem.content.medium' fontSize='xs'>
            <SearchBar />
            <Divider />
            <Text>App Components</Text>
            <VStack alignItems='stretch'>
                <ADOButton list={BASE_ADOS} name='ADOs' leftIcon={<ClassifierIcon adoType='app' boxSize='4' w='7' h='7' />} />
                <ADOButton list={MODULES} name='Modules' leftIcon={<ClassifierIcon adoType='address-list' schemaClass='module' boxSize='4' w='7' h='7' />} />
            </VStack>
            <Divider />
            <Text>Templates</Text>
            <VStack alignItems='stretch'>
                <TemplateButton list={APP_TEMPLATES} name='Templates' leftIcon={<Icon as={ListIcon} bg='newSystem.backgroundState.idle' p='2' rounded='lg' boxSize='8' />} />
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
            // size='lg'
            h='10'
            pl='1.5'
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
    leftIcon: React.ReactElement;
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
            // size='lg'
            h='10'
            pl='1.5'
        >
            <Text flex={1}>
                {name}
            </Text>
        </TmpButton>
    );
};

export default InsertComponent