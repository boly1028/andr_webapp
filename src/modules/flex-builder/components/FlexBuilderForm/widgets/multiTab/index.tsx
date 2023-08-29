import { useDenom } from "@/lib/andrjs/hooks/useDenom";
import { WidgetProps, getTemplate } from "@andromedarjsf/utils";
import { Box, Button, HStack, useRadio, useRadioGroup } from "@chakra-ui/react";
import React from "react";

interface Props extends WidgetProps { }

export const MultiTabWidget: React.FC<Props> = (props) => {
    const {
        options,
        onChange,
        schema,
        id,
        value
    } = props;
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: id,
        onChange: onChange,
        defaultValue: schema.default?.toString(),
        value: value
    })
    const group = getRootProps()
    return (
        <HStack gap='0' bg='backgroundState.idle' rounded='lg' maxW='fit-content' minW='50%' {...group}>
            {options?.enumOptions?.map((option) => {
                const radio = getRadioProps({ value: option.value })
                return (
                    <RadioCard key={option.value} {...radio}>
                        {option.label}
                    </RadioCard>
                )
            })}
        </HStack>
    );
}

function RadioCard(props) {
    const { getInputProps, getRadioProps } = useRadio(props)

    const input = getInputProps()
    const checkbox = getRadioProps()

    return (
        <Box as='label' flex='1' flexShrink={0}>
            <input {...input} />
            <Box
                {...checkbox}
                cursor='pointer'
                boxShadow='md'
                _checked={{
                    bg: 'base.light',
                    color: 'contentOnLight.hight',
                    rounded: 'lg'
                }}
                px={6}
                py={2}
                textStyle='main-sm-medium'
                whiteSpace='nowrap'
                textAlign='center'
            >
                {props.children}
            </Box>
        </Box>
    )
}
