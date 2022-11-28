import { Box, ButtonGroup, VStack } from "@chakra-ui/react";
import { ArrayFieldTemplateItemType } from "@rjsf/full/node_modules/@rjsf/utils";
import { FC, useCallback, useMemo } from "react";
import ChakraIconButton from "../../IconButton";

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

  const { MoveDownButton, MoveUpButton, RemoveButton } =
    registry.templates.ButtonTemplates;

  const onRemoveClick = useMemo(
    () => onDropIndexClick(index),
    [index, onDropIndexClick],
  );

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
      border="1px"
      my="2"
      borderColor="dark.300"
      rounded="lg"
      p="4"
      alignItems={"flex-end"}
    >
      <Box w="full">{children}</Box>

      {props.hasToolbar && (
        <Box>
          <ButtonGroup isAttached mb={1}>
            {(hasMoveUp || hasMoveDown) && (
              <ChakraIconButton
                icon="arrow-up"
                disabled={disabled || readonly || !hasMoveUp}
                onClick={onArrowUpClick}
              />
            )}
            {(hasMoveUp || hasMoveDown) && (
              <ChakraIconButton
                icon="arrow-down"
                disabled={disabled || readonly || !hasMoveDown}
                onClick={onArrowDownClick}
              />
            )}
            {hasRemove && (
              <ChakraIconButton
                icon="remove"
                disabled={disabled || readonly}
                onClick={onRemoveClick}
              />
            )}
          </ButtonGroup>
        </Box>
      )}
    </VStack>
  );
};

export default ArrayFieldItemTemplate;
