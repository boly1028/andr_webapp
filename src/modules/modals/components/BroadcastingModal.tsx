import { useAndromedaContext, useChainConfig } from "@/lib/andrjs";
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
import { useWalletContext } from "@/lib/wallet";
import { useRouter } from "next/router";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";

interface OptionalProps {
  onNextStage?: () => void;
}

const BroadcastingModal: FC<TransactionModalProps & OptionalProps> = memo(
  function BroadcastingModal(props) {
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(true);
    const { client, connected } = useAndromedaContext();
    const { close, setError } = useGlobalModalContext();
    const [result, setResult] = useState<
      ExecuteResult | InstantiateResult | undefined
    >();
    const { chainId } = useWalletContext();
    const { data: config } = useChainConfig(chainId);

    const broadcast = useCallback(async () => {
      if (!connected) throw new Error("Not connected!");
      switch (props.type) {
        case "execute":
          return client.execute(
            props.contractAddress,
            props.msg,
            // Here props fee can be used to set gas price from the estimated result. However gas price calculated is low so using auto till its fixed
            "auto",
            props.memo,
            props.funds,
          );
        case "instantiate":
          console.log('FEE is::', props.fee)
          return client.instantiate(
            props.codeId,
            props.msg,
            "Instantiate",
            "auto",
            {
              memo: props.memo,
              'funds': props.funds
            }
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
          if (props.onNextStage) props.onNextStage();
        } catch (_error) {
          setError(_error as Error);
          console.log(_error);
        }
      };

      const tId = setTimeout(() => {
        if (!result) broadcastTx();
      }, 500);

      return () => clearTimeout(tId);
    }, [broadcast, setError, props, result]);

    console.log(result, "Result");

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
          <Text mt="6px" color='primary.500'>
            <a
              href={
                config?.blockExplorerTxPages[0]?.replaceAll(
                  "${txHash}",
                  transactionHash,
                ) ?? ""
              }
              target="_blank"
              rel="noreferrer noopener"
            >
              {transactionHash}{" "}
              <ExternalLink style={{ display: "inline-block" }} size="14px" />
            </a>
          </Text>
          {props.type === "instantiate" && (
            <>
              <hr style={{ margin: "10px 0px" }} />
              <Text sx={{ fontWeight: "bold" }}>Contract Address</Text>
              <Text mt="6px" color='primary.500'>
                <a
                  href={
                    config?.blockExplorerAddressPages[0]?.replaceAll(
                      "${address}",
                      (result as InstantiateResult).contractAddress,
                    ) ?? ""
                  }
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
                  onClick={() => {
                    router.push(SITE_LINKS.assets());
                    close();
                  }}
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
