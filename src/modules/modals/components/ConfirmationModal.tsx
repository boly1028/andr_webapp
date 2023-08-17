import { Box, BoxProps, Button, Center, HStack, Icon, Text } from "@chakra-ui/react";
import { AlertCircle } from "lucide-react";
import { FC, memo, useCallback, useMemo } from "react";
import { useGlobalModalContext } from "../hooks";
import { ConfirmationModalProps } from "../types";

const ConfirmationModal: FC<ConfirmationModalProps> = memo(
  function ConfirmationModal({
    title,
    body,
    type,
    callback,
    acceptButtonText,
  }) {
    const { close } = useGlobalModalContext();

    const onCallback = useCallback(() => {
      close();
      callback();
    }, [close, callback]);

    const color = useMemo(() => {
      switch (type) {
        case "danger":
          return 'dangerLow.idle' as BoxProps['bg'];
        case "warning":
        default:
          return 'warningLow.idle' as BoxProps['bg'];
      }
    }, [type]);

    return (
      <Box>
        <Center p='4' bg={color} rounded='lg' maxW='min-content' mx='auto'>
          <Icon as={AlertCircle} boxSize='8' type='fill' />
        </Center>

        {title && (
          <Text mt="8" textAlign='center' fontWeight='bold'>
            {title}
          </Text>
        )}
        {body && (
          <Text mt="8" textAlign='center'>
            {body}
          </Text>
        )}
        <HStack mt="8" fontSize='md' justifyContent='center'>
          <Button
            variant="outline"
            onClick={close}
            size='lg'
          >
            Close
          </Button>
          <Button
            variant="solid"
            onClick={onCallback}
            size='lg'
            colorScheme='primary'
          >
            {acceptButtonText ?? "Submit"}
          </Button>
        </HStack>
      </Box>
    );
  },
);

export default ConfirmationModal;
