import { IAndromedaSchemaJSON } from "@/lib/schema/types";
import { CopyButton } from "@/modules/common";
import { constructMsg } from "@/modules/sdk/utils";
import { WidgetProps } from "@andromedarjsf/utils";
import { Box, Flex, Input, Skeleton } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import Form from "../../Form";


interface BaseProps extends WidgetProps {
    selectWidget?: React.ReactNode;
    formSchema?: IAndromedaSchemaJSON;
}

const Base: FC<BaseProps> = (props) => {
    const { id, schema, onFocus, onBlur, value, onChange, formSchema, selectWidget, required } = props;
    const [formData, setFormData] = useState<any>();

    useEffect(() => {
        if (!formSchema) {
            setFormData(undefined)
        }
    }, [formSchema])

    useEffect(() => {
        const tId = setTimeout(() => {
            if (formData) {
                const data = constructMsg(formData)
                onChange(btoa(JSON.stringify(data)));
            } else {
                onChange('')
            }
        }, 100);
        return () => clearTimeout(tId);
    }, [formData]);


    return (
        <Box
            id={id}
            onFocus={() => {
                onFocus(id, value);
            }}
            onBlur={() => {
                onBlur(id, value);
            }}
        >
            <Flex direction="row" gap="4">
                <Box>
                    {selectWidget}
                </Box>
                <CopyButton text={value} variant='unstyled' w='full'>
                    <Input
                        value={value}
                        isRequired={props.required}
                        isInvalid={!!props.rawErrors}
                        aria-label={props.label}
                        placeholder={props.placeholder || "Base64 message"}
                        readOnly
                        w="full"
                        cursor='pointer'
                    />
                </CopyButton>
            </Flex>
            <Box w="full" mt="4">
                {formSchema?.schema && (
                    <Form
                        schema={formSchema?.schema}
                        uiSchema={formSchema?.["ui-schema"]}
                        formData={formData}
                        formContext={{
                            schema,
                        }}
                        onChange={({ formData: _formData }) => {
                            setFormData(_formData);
                        }}
                    >
                        {/* Pass fragment to hide submit button */}
                        <></>
                    </Form>
                )}
            </Box>
        </Box>
    );
};

export default Base;