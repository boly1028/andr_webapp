import { Box } from "@chakra-ui/react";
import React, { memo, useMemo, useState } from "react";
import { TransactionModalProps } from "../types";
import BroadcastingModal from "./BroadcastingModal";
import EstimateFeeModal from "./EstimateFeeModal";

const TransactionModal: React.FC<TransactionModalProps> = memo(
  function MessageModal(props) {
    const [stage, setStage] = useState(0);

    const next = () => setStage((prev) => prev + 1);
    const prev = () => setStage((prev) => Math.max(0, prev - 1));

    const StageComponent = useMemo(() => {
      switch (stage) {
        case 0:
          return (
            <EstimateFeeModal
              {...props}
              onNextStage={next}
              onPrevStage={prev}
            />
          );
        case 1:
          return <BroadcastingModal {...props} />;
        default:
          return <></>;
      }
    }, [stage, props]);
    return <Box>{StageComponent}</Box>;
  },
);

export default TransactionModal;
