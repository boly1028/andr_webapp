import React, { useMemo, useState } from "react";
import { FormControl, Text } from "@chakra-ui/react";
import { WidgetProps } from "@andromedarjsf/utils";
import { formatDuration, intervalToDuration } from 'date-fns'
import { DurationPicker, milliDhms } from "@andromedaprotocol/design-theme";

export const DurationWidget = (props: WidgetProps) => {
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

    const _onBlur = ({ target: { value } }) =>
        onBlur(id, value);
    const _onFocus = ({
        target: { value } }) => onFocus(id, value);

    const formattedTime = useMemo(() => {
        try {
            if (value < 1000) return 'Less than a second'
            const dhms = milliDhms(value ?? 0);
            return formatDuration({
                days: dhms.d,
                hours: dhms.h,
                minutes: dhms.m,
                seconds: dhms.s
            }, {

            })
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
            <DurationPicker
                duration={value}
                onDurationChange={(val) => onChange(val)}
            />
            {typeof value === 'number' && (
                <Text fontSize='xs' color='content.medium' mt='1' ml='1'>{formattedTime}</Text>
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
