import { useDenom } from "@/lib/andrjs/hooks/useDenom";
import { WidgetProps, getInputProps } from "@andromedarjsf/utils";
import { Input } from "@chakra-ui/react";
import React, { useCallback } from "react";

interface Props extends WidgetProps { }

export const DenomWidget: React.FC<Props> = (props) => {
    const {
        id,
        value,
        readonly,
        disabled,
        autofocus,
        onBlur,
        onFocus,
        onChange,
        options,
        schema,
        uiSchema,
        formContext,
        registry,
        rawErrors,
        type,
        ...rest
    } = props;

    const { data: denoms } = useDenom();

    const inputProps = {
        ...rest,
        ...getInputProps(schema, type, options),
    };

    const _onChange = useCallback(
        ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
            onChange(value === "" ? options.emptyValue : value),
        [onChange, options]
    );
    const _onBlur = useCallback(
        ({ target: { value } }: React.FocusEvent<HTMLInputElement>) =>
            onBlur(id, value),
        [onBlur, id]
    );
    const _onFocus = useCallback(
        ({ target: { value } }: React.FocusEvent<HTMLInputElement>) =>
            onFocus(id, value),
        [onFocus, id]
    );

    return (
        <>
            <Input
                id={id}
                name={id}
                className="form-control"
                readOnly={readonly}
                disabled={disabled}
                autoFocus={autofocus}
                value={value}
                {...inputProps}
                list={`denoms_${id}`}
                onChange={_onChange}
                onBlur={_onBlur}
                onFocus={_onFocus}
            />

            <datalist key={`datalist_${id}`} id={`denoms_${id}`}>
                {denoms.map((denom) => (
                    <option key={denom} value={denom} />
                ))}
            </datalist>

        </>
    );
}
