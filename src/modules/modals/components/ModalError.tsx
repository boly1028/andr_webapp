// import { truncate } from "@/modules/common";
import { InfoIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Flex, IconButton, Text, Textarea } from "@chakra-ui/react";
import { AlertCircle, Copy } from "lucide-react";
import { FC, memo } from "react";
import { toast } from "react-toastify";
import { useGlobalModalContext } from "../hooks";

const ModalError: FC = memo(function ModalError({ children }) {
  const { error, setError, close } = useGlobalModalContext();

  const onReport = () => {
    close();
  };
  
  const onCancel = () => {
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
        mt="20px"
        fontSize={'20px'}
        sx={{ textAlign: "center", fontWeight: "bold" }}
      >
        Something went wrong
      </Text>
      {/* <Text mt="20px" textAlign='center' sx={{ fontWeight: 400, color: "dark.500" }}>
        {error.message.length > 100
          ? truncate(error.message, [25, 50])
          : error.message}
      </Text> */}
      <Flex w='full' mt='10px' color='dark.500'>
        <Text fontWeight={'bold'} fontSize='16px'>Error :</Text>
        <Text fontSize='16px'> &nbsp;Unknown Request</Text>
      </Flex>
      {error.message &&
        <Flex direction={'column'} w='full' rowGap={'5px'}>
          <Text w='full' color='dark.500'>Error details</Text>
          <Flex columnGap={'6px'} alignItems='end'>
            <Textarea
              value={error.message}
              fontSize={'16px'}
              color='dark.500'
              backgroundColor={'dark.100'}
              resize='none'
              p='6px'
              size='sm'
              rows={2}
            />
            <IconButton
              aria-label='Copy Error details'
              icon={<Copy />}
              size='sm'
              colorScheme={'primary'}
              variant='solid'
              onClick={onCopy}
            />
          </Flex>
        </Flex>
      }
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
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis perspiciatis quaerat optio ducimus aut! Iusto.        </Text>
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
        <Button
          variant="outline"
          sx={{ fontSize: "16px", padding: "10px 32px" }}
          onClick={onCancel}
          mt="40px"
          mr="10px"
        >
          Cancel
        </Button>
        {/* {error.message.length > 100 && (
          <Button
            variant="solid"
            sx={{
              fontSize: "16px",
              padding: "10px 16px",
              "&:hover": { colorScheme: 'primary' }
            }}
            onClick={onCopy}
            mt="40px"
            leftIcon={<Copy />}
            fontWeight='bold'
            colorScheme={'primary'}
          >
            Copy
          </Button>
        )} */}
      </Flex>
    </Box>
  );
});

export default ModalError;
