import React, { useMemo, useState } from "react";
import { FormControl, HStack, Text } from "@chakra-ui/react";
import { WidgetProps } from "@andromedarjsf/utils";
import { format } from 'date-fns';
import { SingleDatepicker } from "@andromedaprotocol/design-theme";

const MILLI_TO_NANO = 1000000;

export const NanoDatetimeWidget = (props: WidgetProps) => {
    const {
        id,
        type,
        value,
        label,
        schema,
        uiSchema,
        onChange,
        onBlur,
        onFocus,
        options,
        required,
        readonly,
        rawErrors,
        autofocus,
        placeholder,
        disabled,
        formContext,
        uiOptions
    } = props;
    // const chakraProps = getChakra({ uiSchema });
    const numValue = value ? parseInt(value) : undefined;

    const _onBlur = ({ target: { value } }) =>
        onBlur(id, value);
    const _onFocus = ({
        target: { value } }) => onFocus(id, value);

    const title = uiOptions?.title ?? schema.title ?? label;

    const formattedTime = useMemo(() => {
        try {
            if (!numValue) throw new Error("Invalid Date")
            const autoFormat = 'PPPPpppp';
            const longFormat = "PPPP 'at' H:mm:ss OOOO";
            // return format(value, autoFormat);
            return format(numValue / MILLI_TO_NANO, longFormat);
        } catch (err) {
            return 'Invalid date'
        }
    }, [value])


    return (
        <FormControl
            // {...chakraProps}
            isDisabled={disabled || readonly}
            isRequired={required}
            isReadOnly={readonly}
            isInvalid={rawErrors && rawErrors.length > 0}
        >
            <SingleDatepicker
                name={id + 'date-input'}
                date={numValue ? (numValue / MILLI_TO_NANO) : undefined}
                onDateChange={(date) => {
                    if (date)
                        onChange((date * MILLI_TO_NANO).toString())
                    else
                        onChange(undefined)
                }}
            />
            {typeof value === 'string' && (
                <HStack justifyContent='space-between'>
                    <Text fontSize='xs' color='content.medium' mt='1' ml='1'>{formattedTime}</Text>
                    <Text fontSize='xs' color='content.medium' mt='1' ml='1'>{value} nanosecond</Text>
                </HStack>
            )}
            {schema.examples ? (
                <datalist id={`examples_${id}`}>
                    {(schema.examples as string[])
                        .concat(schema.default ? ([schema.default] as string[]) : [])
                        .map((example: any) => {
                            return <option key={example} value={example} />;
                        })}
                </datalist>
            ) : null}
        </FormControl>
    );
};
