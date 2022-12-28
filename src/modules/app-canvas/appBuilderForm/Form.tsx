import { IAndromedaSchemaJSON, IAndromedaUISchema } from '@/lib/schema/types'
import Form from '@/modules/flex-builder/components/FlexBuilderForm/Form';
import { cloneDeep } from '@apollo/client/utilities';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { NodeProps } from 'reactflow';
import { useAppBuilder } from '../canvas/Provider';
import { IFormRef } from '../types';
import templates from './templates';



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

    const [schema, setSchema] = useState(cloneDeep(andromedaSchema.schema));
    const [uiSchema, setUiSchema] = useState(
        cloneDeep(andromedaSchema['ui-schema'] ?? ({} as IAndromedaUISchema)),
    );
    const [formData, setFormData] = useState(cloneDeep(andromedaSchema['form-data'] ?? {}));
    const ref = useRef<any>()

    const validate: IFormRef['validate'] = useCallback(() => {
        try {
            const _formData = ref.current.state.formData;
            console.log("VALIDATING", _formData)
            const valid: boolean = ref.current?.validateForm();
            if (!valid) throw Error("Not valid form")
            return _formData
        } catch (err) {
            console.log(err)
        }
    }, [ref])

    useEffect(() => {
        if (formRefs.current) {
            formRefs.current[name] = {
                validate
            }
        }
    }, [validate, formRefs])

    return (
        <Form
            templates={templates}
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
    )
}
export default React.memo(AppBuilderForm)