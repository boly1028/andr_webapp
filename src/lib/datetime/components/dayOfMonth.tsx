import { Button, ButtonProps } from '@chakra-ui/react';
import { DateObj, RenderProps } from 'dayzed';
import React, { useMemo } from 'react';
import { DatepickerProps, DayOfMonthBtnStyleProps } from '../utils/commonTypes';

interface DayOfMonthProps extends DatepickerProps {
  renderProps: RenderProps;
  isInRange?: boolean | null;
  dateObj: DateObj;
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  outsideDate?:boolean;
}

type HoverStyle =
  | (ButtonProps['_hover'] & { _disabled: ButtonProps['_disabled'] })
  | undefined;

const halfGap = 0.125; //default Chakra-gap-space-1 is 0.25rem

export const DayOfMonth: React.FC<DayOfMonthProps> = ({
  dateObj,
  propsConfigs,
  isInRange,
  renderProps,
  onMouseEnter,
  outsideDate = false
}) => {
  const { date, selected, selectable, today } = dateObj;
  const { getDateProps } = renderProps;
  const {
    defaultBtnProps,
    isInRangeBtnProps,
    selectedBtnProps,
    todayBtnProps,
    outsideDateBtnProps
  } = propsConfigs?.dayOfMonthBtnProps || {};

  const styleBtnProps: DayOfMonthBtnStyleProps = useMemo(
    () => ({
      defaultBtnProps: {
        size: 'sm',
        variant: 'ghost',
        color: 'newSystem.content.high',
        // background: 'newSystem.background.800',
        // borderColor: 'transparent',
        rounded: 'sm',
        // this intends to fill the visual gap from Grid to improve the UX
        // so the button active area is actually larger than what it's seen
        ...defaultBtnProps,
        _after: {
          content: "''",
          position: 'absolute',
          top: `-${halfGap}rem`,
          left: `-${halfGap}rem`,
          bottom: `-${halfGap}rem`,
          right: `-${halfGap}rem`,
          borderWidth: `${halfGap}rem`,
          borderColor: 'transparent',
          ...defaultBtnProps?._after,
        },
        _hover: {
          bg: 'newSystem.backgroundState.hover',
          ...defaultBtnProps?._hover,
          _disabled: {
            bg: 'newSystem.backgroundState.disabled',
            // temperory hack to persist the typescript checking
            ...(defaultBtnProps?._hover as HoverStyle)?._disabled,
          },
        },
      },
      isInRangeBtnProps: {
        background: 'newSystem.primaryLow.idle',
        ...isInRangeBtnProps,
      },
      selectedBtnProps: {
        background: 'newSystem.primary.500',
        color: 'newSystem.content.high',
        _hover: {
          background: 'newSystem.primary.800',
        },
        ...selectedBtnProps,
      },
      todayBtnProps: {
        borderColor: 'newSystem.primaryLow.selected',
        borderWidth: '1',
        variant: 'outline',
        ...todayBtnProps,
      },
      outsideDateBtnProps:{
        color:'newSystem.content.low',
        ...outsideDateBtnProps
      }
    }),
    [
      defaultBtnProps,
      isInRangeBtnProps,
      selectedBtnProps,
      todayBtnProps,
      selectable,
    ]
  );
  

  return (
    <Button
      fontSize='sm'
      {...getDateProps({
        dateObj,
        disabled: !selectable,
        onMouseEnter: onMouseEnter,
      })}
      isDisabled={!selectable}
      {...styleBtnProps.defaultBtnProps}
      {...(outsideDate && styleBtnProps.outsideDateBtnProps)}
      {...(isInRange && selectable && styleBtnProps.isInRangeBtnProps)}
      {...(selected && selectable && styleBtnProps.selectedBtnProps)}
      {...(today && styleBtnProps.todayBtnProps)}
    >
      {date.getDate()}
    </Button>
  );
};