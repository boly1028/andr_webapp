import {
    HStack,
    VStack,
    Heading,
    Divider,
    SimpleGrid,
    Box,
    Stack,
    Text,
    GridItem,
    Flex,
} from '@chakra-ui/react';
import { useDayzed, Props as DayzedHookProps } from 'dayzed';
import { ArrowKeysReact } from '../utils/reactKeysArrow';
import React, { useCallback, useMemo } from 'react';
import { CalendarConfigs, DatepickerProps } from '../utils/commonTypes';
import { DatepickerBackBtns, DatepickerForwardBtns } from './dateNavBtns';
import { DayOfMonth } from './dayOfMonth';
import TimePanel from './timePanel';

interface CalendarPanelProps extends DatepickerProps {
    dayzedHookProps: Omit<DayzedHookProps, 'children' | 'render'>;
    configs: CalendarConfigs;
    onMouseEnterHighlight?: (date: Date) => void;
    isInRange?: (date: Date) => boolean | null;
}

export const CalendarPanel: React.FC<CalendarPanelProps> = ({
    dayzedHookProps,
    configs,
    propsConfigs,
    onMouseEnterHighlight,
    isInRange,
}) => {
    const renderProps = useDayzed(dayzedHookProps);
    const { calendars, getBackProps, getForwardProps } = renderProps;

    const weekdayNames = useMemo(() => {
        const firstDayOfWeek = configs.firstDayOfWeek;
        const dayNames = configs.dayNames;
        if (firstDayOfWeek && firstDayOfWeek > 0) {
            return configs.dayNames
                .slice(firstDayOfWeek, dayNames.length)
                .concat(dayNames.slice(0, firstDayOfWeek));
        }
        return dayNames;
    }, [configs.firstDayOfWeek, configs.dayNames]);

    // looking for a useRef() approach to replace it
    const getKeyOffset = useCallback((num: number) => {
        const e = document.activeElement;
        let buttons = document.querySelectorAll('button');
        buttons.forEach((el, i) => {
            const newNodeKey = i + num;
            if (el === e) {
                if (newNodeKey <= buttons.length - 1 && newNodeKey >= 0) {
                    buttons[newNodeKey].focus();
                } else {
                    buttons[0].focus();
                }
            }
        });
    }, []);

    const arrowKeysReact = new ArrowKeysReact({
        left: () => {
            getKeyOffset(-1);
        },
        right: () => {
            getKeyOffset(1);
        },
        up: () => {
            getKeyOffset(-7);
        },
        down: () => {
            getKeyOffset(7);
        },
    });

    if (calendars.length <= 0) {
        return null;
    }

    return (
        <Flex direction='row' alignItems='stretch'>
            <Stack
                className="datepicker-calendar"
                {...arrowKeysReact.getEvents()}
            >
                {calendars.map((calendar, calendarIdx) => {
                    return (
                        <VStack
                            key={calendarIdx}
                            height="100%"
                            spacing={2}
                        >
                            <HStack>
                                <DatepickerBackBtns
                                    calendars={calendars}
                                    getBackProps={getBackProps}
                                    propsConfigs={propsConfigs}
                                />
                                <Text fontSize='sm' minWidth={'5rem'} textAlign="center">
                                    {configs.monthNames[calendar.month]} {calendar.year}
                                </Text>
                                <DatepickerForwardBtns
                                    calendars={calendars}
                                    getForwardProps={getForwardProps}
                                    propsConfigs={propsConfigs}
                                />
                            </HStack>
                            <Divider />
                            <SimpleGrid columns={7} textAlign="center">
                                {weekdayNames.map((day, dayIdx) => (
                                    <Box fontSize="sm" fontWeight="semibold" key={dayIdx} pb='2'>
                                        {day}
                                    </Box>
                                ))}
                                {calendar.weeks.map((week, weekIdx) => {
                                    return week.map((dateObj, index) => {
                                        const key = `${calendar.month}-${calendar.year}-${weekIdx}-${index}`;
                                        if (!dateObj) return <Box key={key} />;
                                        const { date } = dateObj;
                                        return (
                                            <DayOfMonth
                                                key={key}
                                                outsideDate={dateObj.nextMonth || dateObj.prevMonth}
                                                dateObj={dateObj}
                                                propsConfigs={propsConfigs}
                                                renderProps={renderProps}
                                                isInRange={isInRange && isInRange(date)}
                                                onMouseEnter={() => {
                                                    if (onMouseEnterHighlight) onMouseEnterHighlight(date);
                                                }}
                                            />
                                        );
                                    });
                                })}
                            </SimpleGrid>
                        </VStack>
                    );
                })}
            </Stack>
        </Flex>
    );
};