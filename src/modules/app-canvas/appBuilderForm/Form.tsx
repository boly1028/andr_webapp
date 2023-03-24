import { IAndromedaSchemaJSON, IAndromedaUISchema } from '@/lib/schema/types'
import Form from '@/modules/flex-builder/components/FlexBuilderForm/Form';
import { cloneDeep } from '@apollo/client/utilities';
import { Box } from '@chakra-ui/react';
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { NodeProps } from 'reactflow';
import { useAppBuilder } from '../canvas/Provider';
import { IFormRef } from '../types';
import templates from './templates';
import widgets from './widgets';



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

    const schema = useMemo(() => cloneDeep(andromedaSchema.schema), [andromedaSchema.schema])
    const uiSchema = useMemo(() => cloneDeep(andromedaSchema['ui-schema'] ?? ({} as IAndromedaUISchema)), [andromedaSchema['ui-schema']])
    const [formData, setFormData] = useState(cloneDeep(andromedaSchema['form-data'] ?? {}));
    const ref = useRef<any>()

    const validate: IFormRef['validate'] = useCallback(() => {
        const valid: boolean = ref.current?.validateForm();
        if (!valid) throw Error("Not valid form")
    }, [ref])

    useEffect(() => {
        if (formRefs.current) {
            formRefs.current[name] = {
                validate,
                formData: formData,
            }
        }
    }, [validate, formRefs, formData])

    return (
        <Box>
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
    )
}
export default React.memo(AppBuilderForm)