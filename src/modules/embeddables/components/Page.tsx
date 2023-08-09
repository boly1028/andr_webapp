import { Box } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react"
import { useGetEmbeddableApp } from "../hooks/useGetEmbeddableApp";
import { PageHeader } from "@/modules/common";
import EmbeddableList from "./EmbeddableList";
import SetupUser from "./SetupUser";
import EmbeddableHeader from "./EmbeddableHeader";
import EmbedableExamples from "./EmbedableExamples";
interface Props {
}

const EmbeddablePage: FC<Props> = (props) => {
    const { } = props;
    const { embeddable } = useGetEmbeddableApp()
    return (
        <Box>
            {/* <PageHeader
                title="Embeddables"
                desc="All your embeddables on chain"
            /> */}
            <EmbeddableHeader />
            <EmbedableExamples />
            {embeddable ? (
                <>
                    <EmbeddableList address={embeddable.address} />
                </>
            ) : (
                <SetupUser />
            )}
        </Box>
    )
}

export default EmbeddablePage