import { IAndromedaSchemaJSON, IImportantAdoKeys } from "@/lib/schema/types";
import { CopyButton } from "@/modules/common";
import { constructMsg } from "@/modules/sdk/utils";
import { WidgetProps, getDefaultFormState, mergeDefaultsWithFormData } from "@andromedarjsf/utils";
import { Box, Button, Flex, HStack, Icon, IconButton, Input } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import Form from "../../Form";
import { Copy } from "lucide-react";
import { getSanitizedJsonStringOrDefault } from "./util";
import validator from "../../validator";


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
                const decoded = schema.$original_type === 'Binary' ? atob(value) : value as string;
                if (formSchema.schema.type === 'string') {
                    setFormData(decoded);
                } else {
                    let obj = getDefaultFormState(validator, formSchema['schema'], formSchema['form-data']);
                    setFormData(obj)
                }
            } catch (err) {
                console.log(err)
                setFormData(formSchema.schema.type === 'object' ? {} : '')
            }
        }
    }, [formSchema])

    useEffect(() => {
        const tId = setTimeout(() => {
            if (formData) {
                let stringified = getSanitizedJsonStringOrDefault(formData);
                if (typeof formData === 'object') {
                    const msg = constructMsg({
                        ...formData,
                        ...props.mergeFormData,
                    })
                    stringified = JSON.stringify(msg);
                }
                if (schema.$original_type === 'Binary') {
                    const base64 = btoa(stringified);
                    if (base64 !== value) {
                        onChange(base64);
                    }
                } else {
                    onChange(stringified)
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
                {typeof formData === 'string' && (
                    <HStack justifyContent="end">
                        <Button ml='auto' variant="theme-outline" size='xs' onClick={() => {
                            try {
                                setFormData(JSON.stringify(JSON.parse(formData), undefined, 4))
                            } catch (err) {
                                // Empty Catch
                            }
                        }}>
                            Format
                        </Button>
                    </HStack>
                )}
            </Box>
        </Box>
    );
};

export default Base;