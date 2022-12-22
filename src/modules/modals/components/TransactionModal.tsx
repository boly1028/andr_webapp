import { Box } from "@chakra-ui/react";
import React, { memo, useEffect, useMemo, useState } from "react";
import { useGlobalModalContext } from "../hooks";
import { TransactionModalProps } from "../types";
import AddFundsModal from "./AddFundsModal";
import BroadcastingModal from "./BroadcastingModal";
import EstimateFeeModal from "./EstimateFeeModal";

const MAX_STAGE = 3;

const TransactionModal: React.FC<TransactionModalProps> = memo(
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
                onNextStage={() => setStage(1)}
                onPrevStage={() => close()}
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
              onNextStage={() => setStage(2)}
              onPrevStage={() => {
                if (props.type === "execute") {
                  setStage(0);
                } else {
                  close();
                }
              }}
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
      </Box>
    );
  },
);

export default TransactionModal;
