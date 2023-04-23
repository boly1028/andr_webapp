import { ButtonProps } from '@chakra-ui/button';
import { InputProps, PopoverBodyProps } from '@chakra-ui/react';
import { PopoverContentProps } from '@chakra-ui/react';
import { DateObj } from 'dayzed';

export type OnDateSelected = (
  selectedDate: DateObj,
  event: React.SyntheticEvent<Element, Event>
) => void;

export interface DatepickerProps {
  minDate?: Date;
  maxDate?: Date;
  propsConfigs?: PropsConfigs;
}

export interface DayOfMonthBtnStyleProps {
  defaultBtnProps?: ButtonProps;
  isInRangeBtnProps?: ButtonProps;
  selectedBtnProps?: ButtonProps;
  todayBtnProps?: ButtonProps;
  outsideDateBtnProps?:ButtonProps;
}

export interface PopoverCompProps {
  popoverContentProps?: PopoverContentProps;
  popoverBodyProps?: PopoverBodyProps;
}

export interface PropsConfigs {
  dateNavBtnProps?: ButtonProps;
  dayOfMonthBtnProps?: DayOfMonthBtnStyleProps;
  inputProps?: InputProps;
  popoverCompProps?: PopoverCompProps;
}

export interface DatepickerConfigs {
  dateFormat?: string;
  monthNames?: string[];
  dayNames?: string[];
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export interface CalendarConfigs {
  dateFormat: string;
  monthNames: string[];
  dayNames: string[];
  firstDayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}