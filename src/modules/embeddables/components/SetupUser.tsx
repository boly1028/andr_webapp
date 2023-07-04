import { Box, Button, Text } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react"
import { useCreateEmbeddableApp } from "../hooks/useCreateEmbeddableApp";

interface Props {
}

const SetupUser: FC<Props> = (props) => {
    const { } = props;
    const { create, loading } = useCreateEmbeddableApp()
    return (
        <Box>
            <Text>
                Looks like you do not have embeddable yet.
            </Text>
            <Button isDisabled={loading} onClick={create}>Setup your special embeddable app</Button>
        </Box>
    )
}

export default SetupUser