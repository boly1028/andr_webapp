import { CloseIcon } from "@chakra-ui/icons";
import { Button, Divider, Flex, Icon, Input, InputGroup, InputRightAddon, Popover, PopoverBody, PopoverContent, PopoverTrigger, Portal, Text, useDisclosure } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react"
import FocusLock from 'react-focus-lock';
import DurationPanel from "./components/duration";
import { intlFormatDistance } from 'date-fns'
import { TmpButton } from "@/theme/new-system-tmp/ui-elements";

interface Props {
    duration?: number;
    onDurationChange: (duration?: number) => void;
    usePortal?: boolean;
}

export const DurationPicker: FC<Props> = (props) => {
    const { usePortal, duration, onDurationChange } = props;
    const { onOpen, onClose, isOpen } = useDisclosure();
    const onPopoverClose = () => {
        onClose();
    };

    const PopoverContentWrapper = usePortal ? Portal : React.Fragment;

    return (
        <Popover
            placement="bottom-start"
            variant="responsive"
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onPopoverClose}
            isLazy
        >
            <PopoverTrigger>
                <InputGroup>
                    <Input
                        onKeyPress={(e) => {
                            if (e.key === ' ' && !isOpen) {
                                e.preventDefault();
                                onOpen();
                            }
                        }}
                        type='number'
                        value={duration ?? ' '}
                        onChange={(e) => {
                            let val = e.target.valueAsNumber as number | undefined;
                            val = isNaN(val ?? 0) ? undefined : val
                            console.log(val)
                            onDurationChange(val)
                        }}
                        min={0}
                    />
                    <InputRightAddon onClick={() => onDurationChange(undefined)} as={Button} size='sm'>
                        <Icon as={CloseIcon} boxSize='2' />
                    </InputRightAddon>
                </InputGroup>
            </PopoverTrigger>
            <PopoverContentWrapper>
                <PopoverContent
                    width="100%"
                    borderColor='newSystem.border.main'
                    p='0'
                    bg='newSystem.background.900'
                >
                    <PopoverBody rounded='lg' bg='newSystem.background.800'>
                        <Flex direction='row' alignItems='stretch'>
                            <DurationPanel
                                {...props}
                            />
                        </Flex>
                        <Divider mt='2' />
                        <Flex flexWrap='wrap' direction='row' gap='2' mt='2'>
                            <Text fontSize='sm' color='newSystem.content.medium'>Quick Actions</Text>
                            {QUICK_TIMES.map(t => (
                                <TmpButton key={t} onClick={() => {
                                    onDurationChange(t)
                                }} size='xs' rounded='none'>
                                    {intlFormatDistance(t, 0, { numeric: 'always' })}
                                </TmpButton>
                            ))}
                        </Flex>
                    </PopoverBody>
                </PopoverContent>
            </PopoverContentWrapper>
        </Popover>
    );
};

const QUICK_TIMES = [1000 * 60 * 60 * 24, 1000 * 60 * 60 * 24 * 7, 1000 * 60 * 60 * 24 * 31]