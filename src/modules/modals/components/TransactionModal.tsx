import { ProgressBar } from "@/modules/common/components";
import { Box } from "@chakra-ui/react";
import React, { memo, useMemo, useState } from "react";
import { useGlobalModalContext } from "../hooks";
import { TransactionModalProps } from "../types";
import BroadcastingModal from "./BroadcastingModal";
import EstimateFeeModal from "./EstimateFeeModal";

const MAX_STAGE = 3;

const TransactionModal: React.FC<TransactionModalProps> = memo(
  function MessageModal(props) {
    const [stage, setStage] = useState(0);
    const { close } = useGlobalModalContext();

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
        case 2:
          return <BroadcastingModal {...props} onNextStage={next} />;
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
