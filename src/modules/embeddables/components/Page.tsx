import { Box, Center } from "@chakra-ui/react";
import React, { FC, ReactNode, useMemo } from "react"
import EmbeddableList from "./EmbeddableList";
import EmbeddableHeader from "./EmbeddableHeader";
import { EMBEDDABLE_DB } from "../constants";
import { useAndromedaStore } from "@/zustand/andromeda";
import { FallbackPlaceholder } from "@/modules/common";
interface Props {
}

const EmbeddablePage: FC<Props> = (props) => {
    const { } = props;
    const chainId = useAndromedaStore(state => state.chainId);
    const dbAddress = useMemo(() => {
        return EMBEDDABLE_DB[chainId];
    }, [chainId, EMBEDDABLE_DB])
    return (
        <Box>
            <EmbeddableHeader />
            {dbAddress ? (
                <EmbeddableList />
            ) : (
                <Center w="full" p="6" mt="10">
                    <Box borderColor='border.main' borderWidth='1px' rounded="3xl" px="6" py="10">
                        <FallbackPlaceholder
                            title={"Oops, looks like embeddable is not enabled on this chain"}
                            desc={`Embeddables are currently supported on only these chains - ${Object.keys(EMBEDDABLE_DB).join(', ')}`}
                        >
                        </FallbackPlaceholder>
                    </Box>
                </Center>
            )
            }
        </Box >
    )
}

export default EmbeddablePage