import { Coin, FallbackPlaceholder } from "@/modules/common";
import { Box, Button, Text, Input, Flex } from "@/theme/ui-elements";
import { Center, GridItem, SimpleGrid } from "@chakra-ui/react";
import { FC, memo, useCallback, useEffect, useMemo, useState } from "react";
import { useGlobalModalContext } from "../hooks";
import { AddFundsModalProps } from "../types";

interface OptionalProps {
  onNextStage?: () => void;
  onPrevStage?: () => void;
}

const AddFundsModal: FC<AddFundsModalProps & OptionalProps> = memo(
  function AddFundsModal({ funds, updateFunds, onNextStage }) {
    const { close } = useGlobalModalContext();
    const [localFunds, setLocalFunds] = useState(funds);

    useEffect(() => {
      setLocalFunds(funds);
    }, [funds]);

    return (
      <Box>
        <Text fontWeight={600}>
          Funds
        </Text>
        <Text textStyle="light" color='dark.500'>Assigned funds for transaction</Text>
        {funds.length === 0 && (
          <Box bg='dark.100' rounded='2xl' pt="4" mt="6" w="full">
            <Center>
              <FallbackPlaceholder
                title="No Funds"
                desc="You have not provided any funds for this transaction."
              />
            </Center>
          </Box>
        )}

        <Box>
          <SimpleGrid columns={1} gap="2" mt="4">
            {funds.map((fund, idx) => (
              <GridItem key={idx}>
                <Coin amount={fund.amount} denom={fund.denom} />
              </GridItem>
            ))}
          </SimpleGrid>
        </Box>

        <Flex direction="row" justify="end" gap="2" mt="6">
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          {onNextStage && (
            <Button
              variant="solid"
              bg="#7F56D9"
              sx={{
                marginLeft: "10px",
                "&:hover": { bg: "#7F56D9" },
                fontSize: "16px",
                padding: "10px 32px",
              }}
              onClick={onNextStage}
            >
              Estimate
            </Button>
          )}
        </Flex>
      </Box>
    );
  },
);

export default AddFundsModal;
