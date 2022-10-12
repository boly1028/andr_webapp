import { FC, memo, useEffect, useMemo, useState } from "react";
import { useAndromedaContext, useGetBalance } from "@/lib/andrjs";
import { Coin, StdFee } from "@cosmjs/stargate";

import { useGlobalModalContext } from "../hooks";
import { TransactionModalProps } from "../types";

import { GasIcon } from "@/modules/common";
import { Box, Button, Center, Text } from "@/theme/ui-elements";
import ModalLoading from "./ModalLoading";
import { Fee } from "@andromedaprotocol/andromeda.js";

interface OptionalProps {
  onNextStage?: () => void;
  onPrevStage?: () => void;
  updateFee: (fee: Fee) => void;
}

const FeeAmount: FC<{ coin: Coin; hasBorder: boolean; text: string }> = memo(
  function FeeAmount({ coin: { amount, denom }, hasBorder, text }) {
    const { loading, balance } = useGetBalance(denom);
    const hasAmount = useMemo(
      () => loading || parseFloat(balance.amount) > parseFloat(amount),
      [amount, loading, balance],
    );

    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            position: "relative",
          }}
        >
          <Box>{text}</Box>
          <Box>
            {parseInt(amount) / 1000000}{" "}
            <b>{denom.replace("u", "").toUpperCase()} </b>
          </Box>
        </Box>
        {!hasAmount && (
          <Box
            sx={{
              borderRadius: "6px",
              background: "#d9534f0F",
              border: "1px solid #d9534f",
              fontSize: "12px",
              padding: "10px",
              color: "#d9534f",
            }}
            mt="10px"
          >
            You may have insufficient funds for this transaction. Current
            balance:{" "}
            <b>
              {parseInt(balance.amount) / 1000000}
              {balance.denom.replace("u", "").toUpperCase()}
            </b>
          </Box>
        )}
        {hasBorder && (
          <hr style={{ borderColor: "#D0D5DD", margin: "10px 0px" }} />
        )}
      </>
    );
  },
);

// Displays EstimateFee Modal (with a condition of (props.simulate && props.onNextStep))
// Repair note from fix/transaction-modal-processing: A bang operator (!) was appended to the props.simulate declaration causing inverse evaluations of the intended conditions
const EstimateFeeModal: FC<TransactionModalProps & OptionalProps> = (props) => {
  const { client, connected } = useAndromedaContext();
  const { close, setError } = useGlobalModalContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [fee, setFee] = useState<StdFee>({ amount: [], gas: "0" });

  useEffect(() => {
    const simulateFee = async () => {
      setLoading(true);
      const msg = (() => {
        // Select message execution type of execute or instantiate by passed prop
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

      try {
        const fee = await client.estimateFee([msg]);
        setFee(fee);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
      }
    };

    if (connected) simulateFee();
  }, [client, props, connected, setError]);

  return (
    <Box
      sx={{
        padding: "6px",
      }}
    >
      {loading ? (
        <ModalLoading title="Simulating">
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
        </ModalLoading>
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
              <FeeAmount
                key={`feeamount-${coin.denom}`}
                coin={coin}
                hasBorder={index < fee.amount.length - 1}
                text={index === 0 ? "Cost Estimate" : ""}
              />
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
            {/* Only when the estimate fee modal is a part of the broadbasting process should we show a broadcast /publish button */}
            {props.simulate && props.onNextStage && (
              <Button
                variant="solid"
                bg="#7F56D9"
                sx={{
                  marginLeft: "10px",
                  "&:hover": { bg: "#7F56D9" },
                  fontSize: "16px",
                  padding: "10px 32px",
                }}
                onClick={() => {
                  props.updateFee(fee);
                  props.onNextStage?.();
                }}
              >
                Broadcast
              </Button>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default EstimateFeeModal;
