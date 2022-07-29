import { Box, Button, Center, Text } from "@chakra-ui/react";
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
          return "#db3315";
        case "warning":
        default:
          return "#f79100";
      }
    }, [type]);

    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "20px",
          fontSize: "14px",
        }}
      >
        <Center
          sx={{
            width: "80px",
            height: "80px",
            padding: "23px",
            background: type === "warning" ? "#fdf0c4" : "#fee3e1",
            borderRadius: "50%",
            color,
          }}
        >
          <AlertCircle style={{ width: "32px", height: "32px" }} />
        </Center>

        {title && (
          <Text mt="40px" sx={{ textAlign: "center", fontWeight: "bold" }}>
            {title}
          </Text>
        )}
        {body && (
          <Text mt="10px" sx={{ fontWeight: 400 }}>
            {body}
          </Text>
        )}
        <Center mt="40px">
          <Button
            variant="outline"
            sx={{ fontSize: "16px", padding: "10px 32px" }}
            onClick={close}
          >
            Close
          </Button>
          <Button
            variant="solid"
            sx={{
              fontSize: "16px",
              padding: "10px 16px",
              "&:hover": { bg: color },
              bg: color,
            }}
            onClick={onCallback}
            ml="10px"
          >
            {acceptButtonText ?? "Submit"}
          </Button>
        </Center>
      </Box>
    );
  },
);

export default ConfirmationModal;
