import React, { FC, ReactNode } from "react"
import { Box, Divider, Flex, HStack, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputProps, NumberInputStepper, Text, VStack } from "@chakra-ui/react";
import { TmpButton } from "@/theme/new-system-tmp/ui-elements";
import { intlFormatDistance } from 'date-fns'

interface Props {
    children?: ReactNode;
    date?: Date;
    onDateChange: (date: number) => void;
}

const TimePanel: FC<Props> = (props) => {
    const { children, date, onDateChange } = props;
    return (
        <VStack alignItems='start'>
            <HStack fontSize='sm'>
                <Text>Your timezone:</Text>
                <Text>{Intl.DateTimeFormat().resolvedOptions().timeZone}</Text>
            </HStack>
            <TimeInput
                label="Hours"
                flexShrink={0}
                min={0}
                max={23}
                step={1}
                value={date?.getHours()}
                onChange={(_, number) => {
                    const hours = Math.min(Math.max(number || 0, 0), 23);
                    const newDate = date || new Date();
                    newDate.setHours(hours)
                    onDateChange(newDate.getTime());
                }}
            />
            <TimeInput
                label="Minutes"
                flexShrink={0}
                min={0}
                max={59}
                step={1}
                value={date?.getMinutes()}
                onChange={(_, number) => {
                    const minutes = Math.min(Math.max(number || 0, 0), 59);
                    const newDate = date || new Date();
                    newDate.setMinutes(minutes)
                    onDateChange(newDate.getTime())
                }}
            />
            <Divider mt='4 !important' />
            <Text fontSize='sm' color='newSystem.content.medium'>Quick Actions</Text>
            <Flex flexWrap='wrap' direction='row' gap='2'>
                {QUICK_TIMES.map(t => (
                    <TmpButton key={t} onClick={() => {
                        onDateChange(Date.now() + t)
                    }} size='xs' rounded='none'>
                        {intlFormatDistance(t, 0)}
                    </TmpButton>
                ))}
            </Flex>
        </VStack>
    );
}

const QUICK_TIMES = [0, 1000*60*60*24*7, 1000*60*60*24*31]

interface TimeInputProps extends NumberInputProps {
    label: string;
}
const TimeInput: FC<TimeInputProps> = (props) => {
    const { label, ...numberProps } = props

    return (
        <Wrapper label={label}>
            <NumberInput size='sm' w='48'  {...numberProps}>
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
        </Wrapper>
    )
}

interface WrapperProps {
    label: string;
    children?: ReactNode;
}

const Wrapper: FC<WrapperProps> = (props) => {
    const { label, children } = props;
    return (
        <VStack align='stretch' spacing={0.5}>
            <Text fontSize='sm'>{label}</Text>
            <Box>
                {children}
            </Box>
        </VStack>
    )
}
export default TimePanel