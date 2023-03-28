import { IAdoType, IAndromedaSchemaJSON, IAndromedaUISchema } from '@/lib/schema/types'
import Form from '@/modules/flex-builder/components/FlexBuilderForm/Form';
import ClassifierIcon, { useGetClassColor } from '@/theme/icons/classifiers';
import { getUiOptions } from '@andromedarjsf/utils';
import { cloneDeep } from '@apollo/client/utilities';
import { InfoIcon } from '@chakra-ui/icons';
import { Box, HStack, Icon, IconButton, Text, Tooltip } from '@chakra-ui/react';
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { NodeProps, Position } from 'reactflow';
import { useAppBuilder, useReactFlow } from '../canvas/Provider';
import { IFormRef } from '../types';
import { DIRECTION, getPanelTargetHandlePrefix } from './connections/utils';
import Handle from './ReactFlow/Handle';
import templates from './templates';
import Toolbar from './toolbar';
import widgets from './widgets';

import styles from './form.module.css'
import { CopyButton } from '@/modules/common';
import { Pencil } from 'lucide-react';
import usePanelRenameModal from '@/modules/modals/hooks/usePanelRenameModal';
import useRenameNode from '../hooks/useRenameNode';
const NON_EDITABLE_CLASS = new Set<string>(["system", "modifier"]);


interface AppBuilderFormProps extends NodeProps {
    data: {
        name: string;
        andromedaSchema: IAndromedaSchemaJSON
    }
}
const AppBuilderForm: FC<AppBuilderFormProps> = (props) => {
    const { data } = props
    const { andromedaSchema, name } = data
    const { formRefs } = useAppBuilder()
    const renameNode = useRenameNode()
    const { getNodes } = useReactFlow()

    const schema = useMemo(() => cloneDeep(andromedaSchema.schema), [andromedaSchema.schema])
    const uiSchema = useMemo(() => cloneDeep(andromedaSchema['ui-schema'] ?? ({} as IAndromedaUISchema)), [andromedaSchema['ui-schema']])
    const [formData, setFormData] = useState(cloneDeep(andromedaSchema['form-data'] ?? {}));
    const ref = useRef<any>()

    const uiOptions = getUiOptions(uiSchema)

    const validate: IFormRef['validate'] = useCallback(() => {
        const valid: boolean = ref.current?.validateForm();
        if (!valid) throw Error("Not valid form")
    }, [ref])

    const updateFormData: IFormRef['updateFormData'] = useCallback((data) => {
        setFormData(data)
    }, [setFormData])

    useEffect(() => {
        if (formRefs.current) {
            formRefs.current[name] = {
                validate,
                formData: formData,
                andromedaSchema: data.andromedaSchema,
                updateFormData: updateFormData
            }
        }
    }, [validate, formRefs, formData, data.andromedaSchema, updateFormData])


    const openPanelRenameModal = usePanelRenameModal();
    const adoType = useMemo(() => {
        const type = schema.$id
            ?.split("-")
            .map((t) => t.toLocaleLowerCase())
            .join("");
        const baseAdo = schema.$path?.split("/")[0] as IAdoType;
        return {
            type,
            baseAdo,
        };
    }, [schema]);

    const [upHandle, downHandle] = useMemo(() => {
        return [getPanelTargetHandlePrefix(name, DIRECTION.UP), getPanelTargetHandlePrefix(name, DIRECTION.DOWN)]
    }, [name])

    const adoBorderColor = useGetClassColor({ adoType: adoType.baseAdo }, 'default')



    return (
        <Box
            borderRadius="lg"
            bg="newSystem.background.900"
            className={styles.container}
        >
            <Box
                className={styles.toolbar}
                w='full'
            >
                <Toolbar adoType={adoType.type} baseAdoType={adoType.baseAdo} name={name} />
            </Box>
            <Box
                _hover={{
                    bg: '#ffffff04',
                }}
                py={4}
                border="1px solid"
                borderColor={adoBorderColor}
                borderRadius="lg"
                w='30rem'
                bg="newSystem.background.800"
                position='relative'
            >
                <Handle id={upHandle} type='target' position={Position.Top} adoType={adoType.baseAdo} />
                <Handle id={downHandle} type='target' position={Position.Bottom} adoType={adoType.baseAdo} />
                <HStack px='4' mb='4'>
                    <ClassifierIcon
                        adoType={adoType.baseAdo}
                        schemaClass={schema?.class as any}
                        schemaClassifier={schema?.classifier as any}
                        boxSize={5}
                    />
                    <Text fontSize="sm" color="base.white" fontWeight={600}>
                        {uiOptions.title || schema.title}
                    </Text>
                    <Text fontSize="xs"
                        color="dark.500"
                        fontWeight="light">
                        @{schema.version ?? 'latest'}
                    </Text>
                    {(uiOptions.description || schema.description) && (
                        <Tooltip label={uiOptions.description || schema.description} fontSize='xs' size='xs' textColor='dark.500'>
                            <InfoIcon boxSize='3' cursor='pointer' color='dark.300' _hover={{ color: 'dark.500' }} />
                        </Tooltip>
                    )}
                    <HStack ml='auto !important'>
                        <CopyButton
                            variant="link"
                            fontSize="xs"
                            color="dark.500"
                            fontWeight="light"
                            text={name}
                        >
                            {name}
                        </CopyButton>
                        {!NON_EDITABLE_CLASS.has(schema.class ?? "") && (
                            <IconButton
                                size='xs'
                                variant="ghost"
                                aria-label="open menu"
                                onClick={() => {
                                    const nodes = getNodes()
                                    openPanelRenameModal({
                                        callback: (newName) => {
                                            renameNode(name, newName);
                                        },
                                        defaultName: name,
                                        reservedNames: nodes.map(node => node.id),
                                        title: "Rename ADO",
                                        body: "Change the assigned name of this component",
                                    });
                                }}
                                icon={<Icon as={Pencil} boxSize='3' />}
                            />
                        )}
                    </HStack>
                </HStack>
                <Form
                    templates={templates}
                    widgets={widgets}
                    schema={schema}
                    uiSchema={uiSchema}
                    formData={formData}
                    onChange={({ formData: _formData }) => {
                        setFormData(_formData);
                    }}
                    formContext={{
                        name: name
                    }}
                    ref={ref}
                >
                    <>
                    </>
                </Form>
            </Box>
        </Box>
    )
}
export default React.memo(AppBuilderForm)