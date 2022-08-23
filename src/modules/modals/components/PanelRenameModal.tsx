import { Box, Button, Text, Input, Flex } from "@/theme/ui-elements";
import { debounce } from "lodash";
import { FC, memo, useCallback, useEffect, useMemo, useState } from "react";
import { useGlobalModalContext } from "../hooks";
import { PanelRenameModalProps } from "../types";

const PanelRenameModal: FC<PanelRenameModalProps> = memo(
  function PanelRenameModal({
    title,
    body,
    callback,
    acceptButtonText,
    reservedNames,
    defaultName,
  }) {
    const { close } = useGlobalModalContext();
    const [newName, setNewName] = useState(defaultName);
    const [error, setError] = useState<string | null>(null);

    const debouncedErrorCheck = useCallback(
      debounce((_name: string) => {
        if (_name === defaultName) {
          setError(null);
          return;
        }
        if (_name.length === 0) {
          setError("Name cannot be empty");
          return;
        }
        /**Disabling alpha numeric check for now */
        const match = /^[a-z0-9A-Z-_]+$/i;
        if (!_name.match(match)) {
          setError("Name should be alphanumeric");
          return;
        }
        if (reservedNames.includes(_name)) {
          setError("Name already present");
          return;
        }
        setError(null);
      }, 500),
      [reservedNames, setError, defaultName],
    );

    useEffect(() => {
      debouncedErrorCheck(newName);
    }, [newName]);

    const onCallback = useCallback(() => {
      close();
      callback(newName);
    }, [close, callback, newName]);

    return (
      <Box>
        <Text fontWeight={600} color="gray.700">
          {title}
        </Text>
        <Text textStyle="light">{body}</Text>
        <Input
          value={newName}
          onChange={(e) => {
            const val = e.target.value;
            setNewName(val.trim());
          }}
          mt="6"
          placeholder={defaultName}
        />
        <Text color="error.400" fontSize="xs" mt="1" ml="1" fontWeight="light">
          {error}
        </Text>
        <Flex direction="row" justify="end" gap="2" mt="6">
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button
            disabled={!!error ||  newName === defaultName}
            variant="solid"
            colorScheme="blue"
            onClick={onCallback}
          >
            {acceptButtonText ?? "Apply"}
          </Button>
        </Flex>
      </Box>
    );
  },
);

export default PanelRenameModal;
