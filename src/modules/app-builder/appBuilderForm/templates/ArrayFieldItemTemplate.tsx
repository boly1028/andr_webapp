import { Box, ButtonGroup, VStack } from "@chakra-ui/react";
import { ArrayFieldTemplateItemType } from "@andromedarjsf/utils";
import { FC, useCallback, useMemo } from "react";
import ChakraIconButton from "@/modules/flex-builder/components/IconButton";

const ArrayFieldItemTemplate: FC<ArrayFieldTemplateItemType> = (props) => {
  const {
    children,
    disabled,
    hasMoveDown,
    hasMoveUp,
    hasRemove,
    index,
    onDropIndexClick,
    onReorderClick,
    readonly,
    uiSchema,
    registry,
  } = props;


  const onRemoveClick = useMemo(
    () => onDropIndexClick(index),
    [index, onDropIndexClick],
  );

  // TODO: Perform edge cache update for all nested fields in array item using id prefix
  // This will help in retaining edge direction
  const onArrowUpClick = useMemo(
    () => onReorderClick(index, index - 1),
    [index, onReorderClick],
  );

  const onArrowDownClick = useMemo(
    () => onReorderClick(index, index + 1),
    [index, onReorderClick],
  );

  return (
    <VStack
      my='3'
      py='1'
      alignItems={"flex-end"}
      bg="#ffffff04"
    >
      <Box w="full" mt='2'>{children}</Box>

      {props.hasToolbar && (
        <Box px='4'>
          <ButtonGroup isAttached mb={1}>
            {(hasMoveUp || hasMoveDown) && (
              <ChakraIconButton
                icon="arrow-up"
                disabled={disabled || readonly || !hasMoveUp}
                onClick={onArrowUpClick}
                size='xs'
              />
            )}
            {(hasMoveUp || hasMoveDown) && (
              <ChakraIconButton
                icon="arrow-down"
                disabled={disabled || readonly || !hasMoveDown}
                onClick={onArrowDownClick}
                size='xs'
              />
            )}
            {hasRemove && (
              <ChakraIconButton
                icon="remove"
                disabled={disabled || readonly}
                onClick={onRemoveClick}
                size='xs'
              />
            )}
          </ButtonGroup>
        </Box>
      )}
    </VStack>
  );
};

export default ArrayFieldItemTemplate;
