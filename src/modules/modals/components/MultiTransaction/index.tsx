import { Box } from "@chakra-ui/react";
import React, { memo, useEffect, useMemo, useState } from "react";
import { MultiTransactionModalProps } from "../../types";
import { useGlobalModalContext } from "../../hooks";
import SimulateMultiExecute from "./Simulate";
import BroadcastMultiTransaction from "./Broadcast";


const MultiTransactionModal: React.FC<MultiTransactionModalProps> = memo(
    function MessageModal(defaultProps) {
        const [stage, setStage] = useState(0);
        const { close } = useGlobalModalContext();
        // This is used if we want to change funds from here.
        const [props, setProps] = useState(defaultProps);
        useEffect(() => {
            setProps(defaultProps);
        }, [defaultProps]);

        const StageComponent = useMemo(() => {
            switch (stage) {
                case 0:
                    return (
                        <SimulateMultiExecute
                            {...props}
                            updateFee={(newFee) =>
                                setProps((prev) => ({
                                    ...prev,
                                    fee: newFee,
                                }))
                            }
                            onNextStage={() => setStage(1)}
                            onPrevStage={() => {
                                close();
                            }}
                        />
                    );
                case 1:
                    return <BroadcastMultiTransaction {...props} />;
                default:
                    return <></>;
            }
        }, [stage, props]);
        return (
            <Box py="30px">
                {StageComponent}
            </Box>
        );
    },
);

export default MultiTransactionModal;
