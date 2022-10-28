import { truncate } from "@/modules/common";
import { Box, Button, Center, Text } from "@chakra-ui/react";
import { AlertCircle, Copy } from "lucide-react";
import { FC, memo } from "react";
import { toast } from "react-toastify";
import { useGlobalModalContext } from "../hooks";

const ModalError: FC = memo(function ModalError({ children }) {
  const { error, setError, close } = useGlobalModalContext();

  const onClose = () => {
    close();
    setError();
  };

  const onCopy = () => {
    if (!error) return;
    navigator.clipboard.writeText(error.message);
    toast("Error copied to clipboard", { type: "info" });
  };

  if (!error) return <>{children}</>;
  console.error(error);
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
          padding: "16px",
          background: "error.900",
          borderRadius: "xl",
          color: "base.white",
        }}
      >
        <AlertCircle width='40px' height='40px' />
      </Center>

      <Text
        mt="40px"
        sx={{ textAlign: "center", fontWeight: "bold" }}
      >
        Something went wrong!
      </Text>
      <Text mt="10px" textAlign='center' sx={{ fontWeight: 400, color: "dark.500" }}>
        {error.message.length > 100
          ? truncate(error.message, [25, 50])
          : error.message}
      </Text>
      <Center>
        {error.message.length > 100 && (
          <Button
            variant="solid"
            sx={{
              fontSize: "16px",
              padding: "10px 16px",
              "&:hover": { bg: "#7F56D9" },
              bg: "#7F56D9",
            }}
            onClick={onCopy}
            mt="40px"
            mr="10px"
          >
            <Copy />
          </Button>
        )}
        <Button
          variant="outline"
          sx={{ fontSize: "16px", padding: "10px 32px" }}
          onClick={onClose}
          mt="40px"
        >
          Close
        </Button>
      </Center>
    </Box>
  );
});

export default ModalError;
