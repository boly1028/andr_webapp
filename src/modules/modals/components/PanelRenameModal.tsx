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
    match = /^[a-z0-9A-Z-_]+$/i,
    preventSameSubmission = true
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
      debouncedErrorCheck(newName.trim());
    }, [newName]);

    const onCallback = useCallback(() => {
      close();
      callback(newName.trim());
    }, [close, callback, newName]);

    return (
      <Box>
        <Text textStyle="main-sm-regular" color='content.medium'>{body}</Text>
        <Input
          value={newName}
          onChange={(e) => {
            const val = e.target.value;
            setNewName(val);
          }}
          mt='3'
          placeholder={defaultName}
          autoFocus
        />
        <Text color="danger.500" mt="1" ml="1" textStyle="main-xs-regular">
          {error}
        </Text>
        <Flex direction="row" justify="end" gap="2" mt="6">
          <Button variant="theme-filled" onClick={close}>
            Cancel
          </Button>
          <Button
            disabled={!!error || (preventSameSubmission && (newName === defaultName))}
            variant="theme-low"
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
