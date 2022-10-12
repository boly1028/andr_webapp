import { ProgressBar } from "@/modules/common/components";
import { Box } from "@chakra-ui/react";
import React, { memo, useEffect, useMemo, useState } from "react";
import { TransactionModalProps } from "../types";
import AddFundsModal from "./AddFundsModal";
import BroadcastingModal from "./BroadcastingModal";
import EstimateFeeModal from "./EstimateFeeModal";

const MAX_STAGE = 3;

const TransactionModal: React.FC<TransactionModalProps> = memo(
  function MessageModal(defaultProps) {
    const [stage, setStage] = useState(0);

    const next = () => setStage((prev) => prev + 1);
    const prev = () => setStage((prev) => Math.max(0, prev - 1));

    // This is used if we want to change funds from here.
    const [props, setProps] = useState(defaultProps);
    useEffect(() => {
      setProps(defaultProps);
    }, [defaultProps]);

    const StageComponent = useMemo(() => {
      switch (stage) {
        case 0: {
          if (props.type === "execute") {
            return (
              <AddFundsModal
                funds={props.funds}
                updateFunds={(newFunds) =>
                  setProps((prev) => ({
                    ...prev,
                    funds: newFunds,
                  }))
                }
                onNextStage={next}
                onPrevStage={prev}
              />
            );
          }
        }
        case 1:
          return (
            <EstimateFeeModal
              {...props}
              updateFee={(newFee) =>
                setProps((prev) => ({
                  ...prev,
                  fee: newFee,
                }))
              }
              onNextStage={next}
              onPrevStage={prev}
            />
          );
        case 2:
          return <BroadcastingModal {...props} />;
        default:
          return <></>;
      }
    }, [stage, props]);
    return (
      <Box py="30px">
        {StageComponent}
        {!props.simulate && (
          <ProgressBar stages={MAX_STAGE} currentStage={stage} mt="60px" />
        )}
      </Box>
    );
  },
);

export default TransactionModal;
