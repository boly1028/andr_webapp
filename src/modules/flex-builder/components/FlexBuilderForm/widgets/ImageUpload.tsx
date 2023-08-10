import { useDenom } from "@/lib/andrjs/hooks/useDenom";
import { WidgetProps, getInputProps, getTemplate } from "@andromedarjsf/utils";
import { FormControl, Input } from "@chakra-ui/react";
import React, { useCallback } from "react";

interface Props extends WidgetProps { }

export const ImageUploadWidget: React.FC<Props> = (props) => {
    const {
        id,
        disabled,
        onChange,
        onBlur,
        onFocus,
        readonly,
        value
    } = props;

    const _onChange = ({
        target: { value },
    }: React.ChangeEvent<HTMLInputElement>) => onChange(value);
    const _onBlur = ({
        target: { value },
    }: React.FocusEvent<HTMLInputElement | any>) => onBlur(id, value);
    const _onFocus = ({
        target: { value },
    }: React.FocusEvent<HTMLInputElement | any>) => onFocus(id, value);

    return (
        <FormControl>
            <Input
                id={id}
                name={id}
                isDisabled={disabled || readonly}
                onChange={_onChange}
                onBlur={_onBlur}
                onFocus={_onFocus}
                value={value}
            />
            <Input
                type="file"
                isDisabled={disabled || readonly}
                onChange={(e) => {
                    const file = e.target.files?.[0] as File;
                    toBase64(file).then(base64 => onChange(base64)).catch(err => onChange(''))
                }}
            />
        </FormControl>
    );
}

const toBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});
