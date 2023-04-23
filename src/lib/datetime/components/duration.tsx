import { Box, Divider, HStack, Icon, IconButton, Input, Text, VStack } from "@chakra-ui/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { FC, ReactNode, useMemo } from "react"
import { dhmsToMilli, milliDhms } from "../utils/duration";
import { CloseIcon } from "@chakra-ui/icons";

interface Props {
    children?: ReactNode;
    duration?: number;
    onDurationChange: (duration?: number) => void;
}

const DurationPanel: FC<Props> = (props) => {
    const { children, duration, onDurationChange } = props;

    const durationObj = useMemo(() => {
        return milliDhms(Math.max(duration || 0, 0));
    }, [duration])

    return (
        <HStack textAlign='center'>
            <DurationItem
                value={durationObj.d}
                min={0}
                label="Days"
                onChange={(val) => {
                    durationObj.d = val;
                    onDurationChange(dhmsToMilli(durationObj))
                }}
            />
            <DurationItem
                value={durationObj.h}
                min={0}
                max={23}
                label="Hours"
                onChange={(val) => {
                    durationObj.h = val;
                    onDurationChange(dhmsToMilli(durationObj))
                }}
            />
            <DurationItem
                value={durationObj.m}
                min={0}
                max={59}
                label="Minutes"
                onChange={(val) => {
                    durationObj.m = val;
                    onDurationChange(dhmsToMilli(durationObj))
                }}
            />
            <DurationItem
                value={durationObj.s}
                min={0}
                max={59}
                label="Seconds"
                onChange={(val) => {
                    durationObj.s = val;
                    onDurationChange(dhmsToMilli(durationObj))
                }}
            />
        </HStack>
    )
}

interface DurationItemProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    label: string;
}

const DurationItem: FC<DurationItemProps> = (props) => {
    const { value, onChange, min, max, label } = props;

    const sanitize = (val: number) => {
        if (min !== undefined)
            val = Math.max(val, min);
        if (max !== undefined)
            val = Math.min(val, max);
        return isNaN(val) ? 0 : val;
    }

    return (
        <VStack spacing={0}>
            <IconButton
                size='sm'
                variant='ghost'
                aria-label="increase"
                icon={<Icon as={ChevronUp} boxSize={5} />}
                onClick={() => {
                    const res = sanitize(value + 1);
                    onChange(res);
                }}
            />
            <Input
                textAlign='center'
                w='24'
                type='number'
                value={value}
                onChange={(e) => {
                    let val = e.target.valueAsNumber;
                    const res = sanitize(val);
                    onChange(res);
                }}
                min={min}
                max={max}
            />
            <Text fontSize='sm'>{label}</Text>
            <IconButton
                size='sm'
                variant='ghost'
                aria-label="decrease"
                icon={<Icon as={ChevronDown} boxSize={5} />}
                onClick={() => {
                    const res = sanitize(value - 1);
                    console.log(res)
                    onChange(res);
                }}
            />
        </VStack>
    )
}

export default DurationPanel