import React, { useMemo, useState } from "react";
import { FormControl } from "@chakra-ui/react";
import { WidgetProps } from "@andromedarjsf/utils";
import { DateTimePicker } from '@andromedaprotocol/design-system/dist/src/theme/components/datepicker'

export const DatetimeWidget = (props: WidgetProps) => {
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

    const title = uiOptions?.title ?? schema.title ?? label;

    const dateValue = useMemo(()=>{
        if(value){
            try{
                return new Date(value)
            }catch(err){
    
            }
        }
    },[value])

    return (
        <FormControl
            // {...chakraProps}
            isDisabled={disabled || readonly}
            isRequired={required}
            isReadOnly={readonly}
            isInvalid={rawErrors && rawErrors.length > 0}
        >
            <DateTimePicker
                name={id + 'date-input'}
                date={dateValue}
                onDateChange={(date) => {
                    onChange(date.getTime())
                }}
            />
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
