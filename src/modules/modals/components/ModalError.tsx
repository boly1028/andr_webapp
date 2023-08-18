import { truncate } from "@/modules/common";
import { InfoIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Flex, Text, Textarea } from "@chakra-ui/react";
import { AlertCircle, Copy } from "lucide-react";
import { FC, memo } from "react";
import { toast } from "react-toastify";
import { useGlobalModalContext } from "../hooks";

const ModalError: FC = memo(function ModalError({ children }) {
  const { error, setError, close } = useGlobalModalContext();

  const onReport = () => {
    close();
    // setError();
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
        mt="20px"
        fontSize={'20px'}
        sx={{ textAlign: "center", fontWeight: "bold" }}
      >
        Unknown Request
      </Text>
      {/* <Text mt="20px" textAlign='center' sx={{ fontWeight: 400, color: "dark.500" }}>
        {error.message.length > 100
          ? truncate(error.message, [25, 50])
          : error.message}
      </Text> */}
      <Textarea
        // placeholder='Here is a sample placeholder'
        value={error.message}
        fontSize={'16px'}
        color='dark.500'
        backgroundColor={'dark.100'}
        resize='none'
        mt="20px"
        pb='10px'
      />
      <Flex
        bgColor={'rgba(255, 160, 70, 0.12)'}
        p={'12px 20px'}
        borderRadius='6px'
        mt='20px'
        gap={'10px'}
      >
        <Box>
          <InfoIcon boxSize={3.5} color='rgba(255, 183, 130, 1)' />
        </Box>
        <Text fontSize={'16px'}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis perspiciatis quaerat optio ducimus aut! Iusto.
        </Text>
      </Flex>
      <Flex w="full" justifyContent={'end'}>
        <Button
          variant="outline"
          sx={{ fontSize: "16px", padding: "10px 32px" }}
          onClick={onReport}
          mt="40px"
          mr="10px"
          disabled
        >
          Report
        </Button>
        {error.message && (
          <Button
            variant="solid"
            sx={{
              fontSize: "16px",
              padding: "10px 16px",
            }}
            onClick={onCopy}
            mt="40px"
            leftIcon={<Copy />}
            fontWeight='bold'
            colorScheme={'primary'}
          >
            Copy
          </Button>
        )}
      </Flex>
    </Box>
  );
});

export default ModalError;
