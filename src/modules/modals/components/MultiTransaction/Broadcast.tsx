import { Text, Box, Center, Button, HStack, VStack } from "@chakra-ui/react";
import { Check, ExternalLink } from "lucide-react";
import { FC, memo, useCallback, useEffect, useMemo, useState } from "react";
import type {
    DeliverTxResponse
} from "@cosmjs/cosmwasm-stargate";
import { useRouter } from "next/router";
import { SITE_LINKS } from "@/modules/common/utils/sitelinks";
import { useQueryChainConfig } from "@/lib/graphql/hooks/chain/useChainConfig";
import { MultiTransactionModalProps } from "../../types";
import { useGlobalModalContext } from "../../hooks";
import ModalLoading from "../ModalLoading";
import { useAndromedaStore } from "@/zustand/andromeda";

interface OptionalProps {
    onNextStage?: () => void;
}

const BroadcastMultiTransaction: FC<MultiTransactionModalProps & OptionalProps> = memo(
    function BroadcastMultiTransaction(props) {
        const router = useRouter();

        const [loading, setLoading] = useState<boolean>(true);
        const { client, isConnected, chainId } = useAndromedaStore();
        const { close, setError } = useGlobalModalContext();
        const [result, setResult] = useState<DeliverTxResponse>();
        const { data: config } = useQueryChainConfig(chainId);

        const broadcast = useCallback(async () => {
            if (!isConnected) throw new Error("Not connected!");
            return client.signAndBroadcast(props.msgs, "auto", props.memo);
        }, [props, isConnected, client]);

        useEffect(() => {
            const broadcastTx = async () => {
                setLoading(true);
                try {
                    const resp = await broadcast();
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


        const TransactionInfo = useMemo(() => {
            if (!result) return <></>;
            const { transactionHash } = result
            console.log(result);

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
                            {transactionHash}
                            <ExternalLink style={{ display: "inline-block" }} size="14px" />
                        </a>
                    </Text>
                    <VStack>
                        {result.events.filter(e => e.type === 'wasm').map(e => (
                            <>
                                {e.attributes.filter(a => a.key === '_contract_address').map((a, idx) => (
                                    <Text wordBreak="break-all" key={idx}>
                                        {a.value}
                                    </Text >
                                ))}
                            </>
                        ))}
                    </VStack>
                </Box >
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

export default BroadcastMultiTransaction;
