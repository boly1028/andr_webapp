import { useAndromedaContext } from "@/lib/andrjs";
import { GasIcon } from "@/modules/common";
import { Box, Button, Center, Spinner, Text } from "@chakra-ui/react";
import { StdFee } from "@cosmjs/stargate";
import { FC, useEffect, useState } from "react";
import { useGlobalModalContext } from "../hooks";
import { TransactionModalProps } from "../types";

interface OptionalProps {
  onNextStage?: () => void;
  onPrevStage?: () => void;
}

const EstimateFeeModal: FC<TransactionModalProps & OptionalProps> = (props) => {
  const { client, connected } = useAndromedaContext();
  const { close } = useGlobalModalContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [fee, setFee] = useState<StdFee>({ amount: [], gas: "0" });

  useEffect(() => {
    const simulateFee = async () => {
      setLoading(true);
      const msg = (() => {
        switch (props.type) {
          case "execute":
            return client.encodeExecuteMsg(
              props.contractAddress,
              props.msg,
              props.funds,
            );
          case "instantiate":
            return client.encodeInstantiateMsg(
              props.codeId,
              props.msg,
              "Instantiate",
            );
        }
      })();
      const fee = await client.estimateFee([msg]);
      setFee(fee);
      setLoading(false);
    };

    if (connected) simulateFee();
  }, [client, props, connected]);
  return (
    <Box
      sx={{
        padding: "6px",
      }}
    >
      {loading ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "20px",
          }}
        >
          <Spinner label="" sx={{ width: "100px", height: "100px" }} />
          <Text mt="60px" sx={{ textAlign: "center", fontWeight: "bold" }}>
            Simulating
          </Text>
          <Text
            mt="10px"
            sx={{
              fontWeight: "400",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            We&apos;re simulating your transaction to check for any errors.
            We&apos;ll get back to you with an estimated cost shortly!
          </Text>
        </Box>
      ) : (
        <Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "50px auto",
              gridGap: "16px",
            }}
          >
            <Center sx={{ alignItems: "flex-start" }}>
              <GasIcon
                sx={{
                  height: "48px",
                  width: "48px",
                  color: "#6941C6",
                  bgColor: "#F4EBFF",
                  padding: "14px",
                  borderRadius: "50%",
                }}
                fontSize="20px"
              />
            </Center>
            <Box>
              <Text
                sx={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                Estimated Fees
              </Text>
              <Text
                mt="10px"
                sx={{ fontWeight: "400", fontSize: "14px", lineHeight: "20px" }}
              >
                This is an estimated breakdown of the costs of running your
                transaction.
              </Text>
            </Box>
          </Box>
          <Box
            mt="20px"
            sx={{
              border: "1px solid #D0D5DD",
              borderRadius: "12px",
              padding: "16px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <Box>Gas Used</Box>
              <Box>{fee.gas}</Box>
            </Box>
            <hr style={{ borderColor: "#D0D5DD", margin: "10px 0px" }} />
            {fee.amount.map((coin, index) => (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                  }}
                >
                  <Box>{index === 0 ? "Estimated Costs" : ""}</Box>
                  <Box>
                    {parseInt(coin.amount) / 10000000}{" "}
                    <b>{coin.denom.replace("u", "").toUpperCase()}</b>
                  </Box>
                </Box>
                {index < fee.amount.length - 1 ?? (
                  <hr style={{ borderColor: "#D0D5DD", margin: "10px 0px" }} />
                )}
              </>
            ))}
          </Box>
          <Box
            mt="40px"
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button
              variant="outline"
              sx={{ fontSize: "16px", padding: "10px 32px" }}
              onClick={close}
            >
              Cancel
            </Button>
            {!props.simulate && props.onNextStage && (
              <Button
                variant="solid"
                bg="#7F56D9"
                sx={{
                  marginLeft: "10px",
                  "&:hover": { bg: "#7F56D9" },
                  fontSize: "16px",
                  padding: "10px 32px",
                }}
                onClick={props.onNextStage}
              >
                Publish
              </Button>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default EstimateFeeModal;
