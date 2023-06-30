import { useDenom } from "@/lib/andrjs/hooks/useDenom";
import { WidgetProps, getInputProps, getTemplate } from "@andromedarjsf/utils";
import { FormControl, Input } from "@chakra-ui/react";
import React, { useCallback } from "react";

interface Props extends WidgetProps { }

export const DenomWidget: React.FC<Props> = (props) => {
    const {
        options,
        registry,
    } = props;

    const { data: denoms } = useDenom();
    const BaseInputTemplate = getTemplate<'BaseInputTemplate'>('BaseInputTemplate', registry, options);

    return (
        <BaseInputTemplate
            {...props}
            schema={{
                ...props.schema,
                examples: denoms
            }}
        />
    );
}
