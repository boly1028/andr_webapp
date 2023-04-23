import { Button, ButtonProps, Icon, IconButton } from '@chakra-ui/react';
import { Calendar, GetBackForwardPropsOptions } from 'dayzed';
import React, { Fragment } from 'react';
import { DatepickerProps } from '../utils/commonTypes';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export interface DatepickerBackBtnsProps extends DatepickerProps {
    calendars: Calendar[];
    getBackProps: (data: GetBackForwardPropsOptions) => Record<string, any>;
}

const DefaultBtnStyle: ButtonProps = {
    variant: 'ghost',
    size: 'sm',
};

export const DatepickerBackBtns: React.FC<DatepickerBackBtnsProps> = (
    props
) => {
    const { calendars, getBackProps } = props;
    const customBtnProps = props.propsConfigs?.dateNavBtnProps;
    return (
        <Fragment>
            <IconButton
                aria-label='Double Back'
                icon={<Icon as={ChevronsLeft} boxSize={4} />}
                {...getBackProps({
                    calendars,
                    offset: 12,
                })}
                {...DefaultBtnStyle}
                {...customBtnProps}
            />
            <IconButton
                aria-label='Back'
                icon={<Icon as={ChevronLeft} boxSize={4} />}
                {...getBackProps({ calendars })}
                {...DefaultBtnStyle}
                {...customBtnProps}
            />
        </Fragment>
    );
};

export interface DatepickerForwardBtnsProps extends DatepickerProps {
    calendars: Calendar[];
    getForwardProps: (data: GetBackForwardPropsOptions) => Record<string, any>;
}

export const DatepickerForwardBtns: React.FC<DatepickerForwardBtnsProps> = (
    props
) => {
    const { calendars, getForwardProps } = props;
    const customBtnProps = props.propsConfigs?.dateNavBtnProps;
    return (
        <Fragment>
            <IconButton
                aria-label='forward'
                icon={<Icon as={ChevronRight} boxSize={4} />}
                {...getForwardProps({ calendars })}
                {...DefaultBtnStyle}
                {...customBtnProps}
            />
             <IconButton
                aria-label='double forward'
                icon={<Icon as={ChevronsRight} boxSize={4} />}
                {...getForwardProps({
                    calendars,
                    offset: 12,
                })}
                {...DefaultBtnStyle}
                {...customBtnProps}
            />
        </Fragment>
    );
};