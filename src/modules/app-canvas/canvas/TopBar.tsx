import React, { FC } from 'react'
import { Button, HStack, Menu, MenuButton, MenuItem, MenuList, useToast } from '@chakra-ui/react';
import { BASE_ADOS } from '@/lib/schema/utils/list';
import { useAppBuilder } from './Provider';
import { getSchemaFromPath, nextSuid, suid } from '@/lib/schema/utils';
import { ITemplateFormData } from '@/lib/schema/templates/types';
import { IImportantAdoKeys } from '@/lib/schema/types';
import { useCodeId } from '@/lib/andrjs';
import { useConstructAppMsg } from '@/modules/sdk/hooks';
import { useInstantiateModal } from '@/modules/modals/hooks';

interface TopBarProps {

}
const TopBar: FC<TopBarProps> = (props) => {
    const { } = props
    const { nodes, addNode, formRefs } = useAppBuilder()
    const toast = useToast()
    const codeId = useCodeId("app");
    const construct = useConstructAppMsg();
    const openModal = useInstantiateModal(codeId);


    const handleAdd = async (source: string) => {
        const ado = await getSchemaFromPath(source);
        let name = suid()
        while (nodes.some(node => node.id === name)) {
            name = nextSuid(name);
        }
        addNode(ado, name)
    }

    const handlePublish = () => {
        if (codeId === -1) {
            console.warn("Code ID not fetched");
            return;
        }
        try {
            const publishData: ITemplateFormData = {}
            const ados = formRefs.current ?? {};
            Object.keys(ados).forEach(adoKey => {
                console.log(adoKey);
                const adoFormData = ados[adoKey].validate();
                publishData[adoKey] = adoFormData;
            })
            const msg = construct(publishData, "Test Name for app from builder");
            openModal(msg, true);
        } catch (err) {
            toast({
                title: `Error while validating`,
                status: 'error'
            })
        }
    }

    return (
        <HStack justifyContent='end'>
            <Button onClick={handlePublish} colorScheme='primary'>
                Publish
            </Button>
            <Menu placement="bottom-end">
                <MenuButton
                    as={Button}
                    rounded='none'
                >
                    Base Ado
                </MenuButton>
                <MenuList>
                    {BASE_ADOS?.map((ado) => {
                        return (
                            <MenuItem key={ado.source} onClick={() => handleAdd(ado.source)}>
                                {/* <MenuItem icon={<Icon as={EyeIcon} boxSize={5} />}> */}
                                {ado.title}
                            </MenuItem>
                        );
                    })}
                </MenuList>
            </Menu>
        </HStack>
    )
}
export default TopBar