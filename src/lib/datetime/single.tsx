import React, { useMemo, useState } from 'react';
import {
    Box,
    Button,
    Flex,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputRightAddon,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Portal,
    useDisclosure,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import FocusLock from 'react-focus-lock';
import { Month_Names_Short, Weekday_Names_Short } from './utils/calanderUtils';
import { CalendarPanel } from './components/calenderPanel';
import {
    CalendarConfigs,
    DatepickerConfigs,
    DatepickerProps,
    OnDateSelected,
} from './utils/commonTypes';
import TimePanel from './components/timePanel';
import { CloseIcon } from '@chakra-ui/icons';

export interface SingleDatepickerProps extends DatepickerProps {
    date?: number;
    onDateChange: (date: number | undefined) => void;
    configs?: DatepickerConfigs;
    disabled?: boolean;
    defaultIsOpen?: boolean;
    closeOnSelect?: boolean;
    id?: string;
    name?: string;
    usePortal?: boolean;
}

const DefaultConfigs: CalendarConfigs = {
    // dateFormat: `dd MMM yyyy 'at' H'h':mm'min':ss's':SSSS'ms'`,
    dateFormat: `PPPPpppp`,
    monthNames: Month_Names_Short,
    dayNames: Weekday_Names_Short,
    firstDayOfWeek: 0,
};

export const SingleDatepicker: React.FC<SingleDatepickerProps> = ({
    configs,
    propsConfigs,
    usePortal,
    defaultIsOpen = false,
    closeOnSelect = true,
    ...props
}) => {
    const {
        date: millisecondsDate,
        name,
        disabled,
        onDateChange,
        id,
        minDate,
        maxDate,
    } = props;

    const selectedDate = useMemo(() => {
        return millisecondsDate ? new Date(millisecondsDate) : undefined;
    }, [millisecondsDate])

    const [dateInView, setDateInView] = useState(selectedDate);
    const [offset, setOffset] = useState(0);

    const { onOpen, onClose, isOpen } = useDisclosure({ defaultIsOpen });

    const calendarConfigs: CalendarConfigs = {
        ...DefaultConfigs,
        ...configs,
    };

    const onPopoverClose = () => {
        onClose();
        setDateInView(selectedDate);
        setOffset(0);
    };

    // dayzed utils
    const handleOnDateSelected: OnDateSelected = ({ selectable, date }) => {
        if (!selectable) return;
        if (date instanceof Date && !isNaN(date.getTime())) {
            if (selectedDate) {
                date.setHours(selectedDate.getHours())
                date.setMinutes(selectedDate.getMinutes())
                date.setSeconds(selectedDate.getSeconds())
                date.setMilliseconds(selectedDate.getMilliseconds())
            }
            onDateChange(date.getTime());
            if (closeOnSelect) onClose();
            return;
        }
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
                        autoComplete="off"
                        isDisabled={disabled}
                        name={name}
                        value={millisecondsDate ?? ' '}
                        onChange={(e) => {
                            let val = e.target.valueAsNumber as number | undefined;
                            val = isNaN(val ?? 0) ? undefined : val
                            onDateChange(val)
                        }}
                        {...propsConfigs?.inputProps}
                    />
                    <InputRightAddon onClick={() => onDateChange(undefined)} as={Button} size='sm'>
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
                    {...propsConfigs?.popoverCompProps?.popoverContentProps}
                >
                    <PopoverBody {...propsConfigs?.popoverCompProps?.popoverBodyProps} rounded='lg' bg='newSystem.background.800'>
                        {/* <FocusLock> */}
                        <Flex direction='row' alignItems='stretch'>
                            <CalendarPanel
                                dayzedHookProps={{
                                    showOutsideDays: true,
                                    onDateSelected: handleOnDateSelected,
                                    selected: selectedDate,
                                    date: dateInView,
                                    minDate: minDate,
                                    maxDate: maxDate,
                                    offset: offset,
                                    onOffsetChanged: setOffset,
                                    firstDayOfWeek: calendarConfigs.firstDayOfWeek,
                                }}
                                configs={calendarConfigs}
                                propsConfigs={propsConfigs}
                            />
                            <Box pl='4'>
                                <TimePanel onDateChange={onDateChange} date={selectedDate} />
                            </Box>
                        </Flex>
                        {/* </FocusLock> */}
                    </PopoverBody>
                </PopoverContent>
            </PopoverContentWrapper>
        </Popover>
    );
};