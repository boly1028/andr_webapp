import APP_TEMPLATES from '@/lib/schema/templates'
import { ITemplate } from '@/lib/schema/types'
import { BASE_ADOS, IAdoList, MODIFIERS, MODULES } from '@/lib/schema/utils/list'
import { ListIcon, SearchBar } from '@/modules/common'
import ClassifierIcon from '@/theme/icons/classifiers'
import { ChevronRightIcon, SearchIcon } from '@chakra-ui/icons'
import { Divider, Icon, Text, VStack, SimpleGrid, GridItem, Kbd, HStack, Button } from '@chakra-ui/react'
import React, { FC, useMemo } from 'react'
import { useAppBuilder } from '../canvas/Provider'
import { APP_BUILDER_KEYCODES } from '../common/keyCodes'
import { IUIComponents } from '../types'
import { useHotkeysContext } from 'react-hotkeys-hook'
import { Hotkey } from 'react-hotkeys-hook/dist/types'
import { Key } from 'ts-key-enum'
import { PlusIcon } from '@/theme/icons'

export interface InsertComponentProps {

}
const InsertComponent: FC<InsertComponentProps> = (props) => {
    const { } = props
    const { hotkeys } = useHotkeysContext()

    return (
        <VStack alignItems='stretch' gap='1' textColor='newSystem.content.medium' fontSize='xs'>
            <SearchBar isDisabled _placeholder={{ color: 'newSystem.content.medium' }} />
            <Divider />
            <Text>App Components</Text>
            <VStack alignItems='stretch'>
                <ADOButton list={BASE_ADOS} name='ADOs' leftIcon={<ClassifierIcon adoType='app' schemaClass='baseado' boxSize='4' w='7' h='7' />} />
                <ADOButton list={MODULES} name='Modules' leftIcon={<ClassifierIcon adoType='address-list' schemaClass='module' boxSize='4' w='7' h='7' />} />
            </VStack>
            <Divider />
            <Text>Templates</Text>
            <VStack alignItems='stretch'>
                <TemplateButton list={APP_TEMPLATES} name='Templates' leftIcon={<Icon as={ListIcon} bg='newSystem.backgroundState.idle' p='2' rounded='lg' boxSize='8' />} />
            </VStack>
            <Divider />
            <Text>Shortcuts</Text>
            <SimpleGrid columns={2} spacingY='2' fontSize='sm' color='newSystem.content.high'>
                <GridItem>Select</GridItem>
                <GridItem><Kbd px='2' py='1'>Click</Kbd></GridItem>
                <GridItem>Multi Select</GridItem>
                <GridItem><Kbd px='2' py='1'>{APP_BUILDER_KEYCODES.MULTISELECT} + Click</Kbd></GridItem>
                <GridItem>Zoom</GridItem>
                <GridItem><Kbd px='2' py='1'>{APP_BUILDER_KEYCODES.ZOOM} + Scroll</Kbd></GridItem>
                {hotkeys.map((key) => (
                    <React.Fragment key={createKeyList(key).join(',')}>
                        <GridItem>{key.description}</GridItem>
                        <GridItem>
                            <RenderKey hotkey={key} />
                        </GridItem>
                    </React.Fragment>
                ))}
            </SimpleGrid>

        </VStack>
    )
}

const RenderKey: FC<{ hotkey: Hotkey }> = (props) => {
    const { hotkey } = props;
    const { keyItems, lastItem } = useMemo(() => {
        const list = createKeyList(hotkey)
        const lastItem = list.pop();
        return {
            keyItems: list,
            lastItem
        }
    }, [hotkey])
    return (
        <HStack spacing={0.5} wrap='wrap'>
            {keyItems.map(keyItem => (
                <React.Fragment key={keyItem}>
                    <Kbd px='2' py='1'>{keyItem}</Kbd>
                    <PlusIcon width='12' />
                </React.Fragment>
            ))}
            {lastItem && (
                <Kbd px='2' py='1'>{lastItem}</Kbd>
            )}

        </HStack>
    )
}

const createKeyList = (key: Hotkey) => {
    const keys: string[] = [];
    if (key.alt) keys.push(Key.Alt);
    if (key.ctrl) keys.push(Key.Control);
    if (key.meta) keys.push(Key.Meta);
    if (key.mod) keys.push(Key.ModeChange);
    if (key.shift) keys.push(Key.Shift);
    if (key.keys) keys.push(...key.keys.filter(k=>!keys.some(_k=>_k.toLowerCase() === k.toLowerCase())));
    return keys;
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
        <Button
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
        </Button>
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
        <Button
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
        </Button>
    );
};

export default InsertComponent