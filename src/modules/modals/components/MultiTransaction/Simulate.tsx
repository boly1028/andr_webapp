import { FC, memo, useEffect, useMemo, useState } from "react";
import { Coin, coins, StdFee } from "@cosmjs/stargate";

import { GasIcon, truncate } from "@/modules/common";
import { Box, Button, Center, Divider, Text } from "@/theme/ui-elements";
import { sumCoins } from "@/modules/sdk/hooks/useGetFunds";
import { MultiTransactionModalProps } from "../../types";
import { useGlobalModalContext } from "../../hooks";
import ModalLoading from "../ModalLoading";
import { useAndromedaClient } from "@/lib/andrjs";
import { useAndromedaStore } from "@/zustand/andromeda";
// import { useCurrentChainConfig } from "@/lib/andrjs/hooks/useKeplrChainConfig";
// import { CoinPretty } from "@keplr-wallet/unit";

interface OptionalProps {
    onNextStage?: () => void;
    onPrevStage?: () => void;
    updateFee: (fee: StdFee) => void;
}

const FeeAmount: FC<{ coin: Coin; text: string }> = memo(function FeeAmount({
    coin,
    text,
}) {
    // const chainConfig = useCurrentChainConfig()
    const formattedCoin = useMemo(() => {
        return coin
    }, [coin])
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
                    {formattedCoin?.amount}{" "}
                    <b>{formattedCoin?.denom} </b>
                </Box>
            </Box>
        </>
    );
});

// Displays EstimateFee Modal (with a condition of (props.simulate && props.onNextStep))
// Repair note from fix/transaction-modal-processing: A bang operator (!) was appended to the props.simulate declaration causing inverse evaluations of the intended conditions
const SimulateMultiExecute: FC<MultiTransactionModalProps & OptionalProps> = (props) => {
    const { client, isConnected } = useAndromedaStore();
    const { close, setError } = useGlobalModalContext();
    const [loading, setLoading] = useState<boolean>(true);
    const [fee, setFee] = useState<StdFee>({ amount: [], gas: "0" });

    const funds = useMemo(() => {
        const funds: Coin[] = []
        props.msgs.forEach(msg => {
            if ("funds" in msg.value)
                msg.value.funds?.forEach(fund => funds.push(fund))
        })
        return funds;
    }, [fee, props]);

    const totalFunds = useMemo(() => {
        const sum = sumCoins([...fee.amount, ...funds]);
        return sum;
    }, [fee, funds]);


    useEffect(() => {
        const simulateFee = async () => {
            setLoading(true);
            const getFee = async () => {
                if (!client.chainClient) throw new Error('Chain Client not present.')
                const result = await client.chainClient?.simulateMulti(props.msgs, props.fee, props.memo);
                const fee: StdFee = {
                    'gas': result.toString(),
                    amount: []
                };
                return fee;
            }

            try {
                const estimatedFee = await getFee();
                console.log(estimatedFee);
                setFee(estimatedFee);
                setLoading(false);
            } catch (error) {
                setError(error as Error);
            }
        };

        const tId = setTimeout(() => {
            if (isConnected) simulateFee();
        }, 500);

        return () => clearTimeout(tId);
    }, [client, props, isConnected, setError]);

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
                                height="48px"
                                width="48px"
                                color="primary.400"
                                bgColor="dark.300"
                                padding="12px"
                                rounded="full"
                            />
                        </Center>
                        <Box>
                            <Text fontWeight="bold" fontSize="lg">
                                Estimated Fees
                            </Text>
                            <Text mt="2" fontSize="sm" color="dark.500">
                                This is an estimated breakdown of the costs of running your
                                transaction.
                            </Text>
                        </Box>
                    </Box>
                    <Box
                        mt="20px"
                        borderRadius='lg'
                        borderColor='dark.300'
                        borderWidth='1px'
                        p='4'
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
                        <Divider color='dark.300' />
                        {fee.amount.map((coin, index) => (
                            <FeeAmount
                                key={`feeamount-${index}`}
                                coin={coin}
                                text="Cost Estimate"
                            />
                        ))}
                        {funds.map((coin, index) => (
                            <FeeAmount
                                key={`feeamount-${index}`}
                                coin={coin}
                                text="Funds"
                            />
                        ))}
                        {/* <Divider /> */}
                        {/* {totalFunds?.map(coin => (
                            <FeeAmount coin={coin} text={`Total "${truncate(coin.denom)}" funds`} />
                        ))} */}
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
                        {props.onNextStage && (
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

export default SimulateMultiExecute;
