import { IAndromedaSchemaJSON } from "@/lib/schema/types";
import { CopyButton } from "@/modules/common";
import { constructMsg } from "@/modules/sdk/utils";
import { WidgetProps } from "@andromedarjsf/utils";
import { Box, Flex, Icon, IconButton, Input, Skeleton } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import Form from "../../Form";
import { Copy } from "lucide-react";


interface BaseProps extends WidgetProps {
    selectWidget?: React.ReactNode;
    formSchema?: IAndromedaSchemaJSON;
    reset?: () => void;
    mergeFormData?: {
        kernel_address?: string
    };
}

const Base: FC<BaseProps> = (props) => {
    const { id, schema, onFocus, onBlur, value, onChange, formSchema, selectWidget, reset } = props;
    const [formData, setFormData] = useState<any>();

    useEffect(() => {
        if (formSchema) {
            try {
                const decoded = JSON.parse(atob(value));
                setFormData(decoded)
            } catch (err) {
                console.log(err)
                setFormData(formSchema.schema.type === 'object' ? {} : '')
            }
        }
    }, [formSchema])

    useEffect(() => {
        const tId = setTimeout(() => {
            if (formData) {
                const data = constructMsg({
                    ...formData,
                    ...props.mergeFormData,
                })
                let stringified = data;
                if (typeof stringified === 'object') {
                    stringified = JSON.stringify(data)
                }
                const base64 = btoa(stringified);
                if (base64 !== value) {
                    onChange(base64);
                }
            } else if (!value && props.required) {
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
                <Input
                    value={value}
                    onChange={(e) => {
                        const val = e.target.value;
                        onChange(val);
                        reset?.();
                    }}
                    readOnly={!reset}
                    isRequired={props.required}
                    isInvalid={!!props.rawErrors}
                    aria-label={props.label}
                    placeholder={props.placeholder || "Base64 message"}
                    w="full"
                />
                <CopyButton text={value} variant='unstyled'>
                    <IconButton icon={<Icon as={Copy} />} aria-label="copy-base64" />
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