import { useAndromedaContext } from "@/lib/andrjs";
import { Text, Box, Center, Button } from "@chakra-ui/react";
import { Check, ExternalLink } from "lucide-react";
import { FC, memo, useCallback, useEffect, useMemo, useState } from "react";
import { useGlobalModalContext } from "../hooks";
import { TransactionModalProps } from "../types";
import ModalLoading from "./ModalLoading";
import type {
  ExecuteResult,
  InstantiateResult,
} from "@cosmjs/cosmwasm-stargate";
import { truncate } from "@/modules/common";

const BroadcastingModal: FC<TransactionModalProps> = memo(
  function BroadcastingModal(props) {
    const [loading, setLoading] = useState<boolean>(true);
    const { client, connected } = useAndromedaContext();
    const { close, setError } = useGlobalModalContext();
    const [result, setResult] = useState<
      ExecuteResult | InstantiateResult | undefined
    >();

    const broadcast = useCallback(async () => {
      if (!connected) throw new Error("Not connected!");
      switch (props.type) {
        case "execute":
          return client.execute(
            props.contractAddress,
            props.msg,
            "auto",
            props.memo,
            props.funds,
          );
        case "instantiate":
          return client.instantiate(
            props.codeId,
            props.msg,
            "Instantiate",
            "auto",
          );
      }
    }, [props, connected, client]);

    useEffect(() => {
      const broadcastTx = async () => {
        setLoading(true);
        try {
          const resp: ExecuteResult | InstantiateResult = await broadcast();
          setResult(resp);
          setLoading(false);
        } catch (_error) {
          setError(_error as Error);
        }
      };

      broadcastTx();
    }, [broadcast, setError]);

    const TransactionInfo = useMemo(() => {
      if (!result) return <></>;
      const { transactionHash } = result as ExecuteResult | InstantiateResult;

      return (
        <Box
          sx={{
            border: "1px solid #D0D5DD",
            borderRadius: "12px",
            padding: "16px",
            width: "100%",
            fontSize: "14px",
          }}
          mt="40px"
        >
          <Text sx={{ fontWeight: "bold" }}>Transaction #</Text>
          <Text mt="6px" style={{ color: "#7F56D9" }}>
            <a
              href={`https://testnet.mintscan.io/juno-testnet/txs/${transactionHash}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              {truncate(transactionHash)}{" "}
              <ExternalLink style={{ display: "inline-block" }} size="14px" />
            </a>
          </Text>
          {props.type === "instantiate" && (
            <>
              <hr style={{ margin: "10px 0px" }} />
              <Text sx={{ fontWeight: "bold" }}>Contract Address</Text>
              <Text mt="6px" style={{ color: "#7F56D9" }}>
                <a
                  href={`https://testnet.mintscan.io/juno-testnet/account/${
                    (result as InstantiateResult).contractAddress
                  }`}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {(result as InstantiateResult).contractAddress}{" "}
                  <ExternalLink
                    style={{ display: "inline-block" }}
                    size="14px"
                  />
                </a>
              </Text>
            </>
          )}
        </Box>
      );
    }, [props, result]);
    return (
      <Box
        sx={{
          padding: "6px",
        }}
      >
        {loading ? (
          <ModalLoading title="Broadcasting Your Transaction">
            {/* <Text
              mt="10px"
              sx={{
                fontWeight: "400",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              Your transaction is being broadcasted!
            </Text> */}
          </ModalLoading>
        ) : (
          <>
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
              <Check
                style={{
                  width: "100px",
                  height: "100px",
                  fontSize: "60px",
                  color: "#7F56D9",
                }}
              />
              <Text mt="60px" sx={{ textAlign: "center", fontWeight: "bold" }}>
                Transaction Successful!
              </Text>
              {TransactionInfo}
              <Center>
                <Button
                  mt="40px"
                  variant="outline"
                  sx={{ fontSize: "16px", padding: "10px 32px" }}
                  onClick={close}
                >
                  Close
                </Button>
              </Center>
            </Box>
          </>
        )}
      </Box>
    );
  },
);

export default BroadcastingModal;
