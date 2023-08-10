import { IEmbeddableConfig } from "@/lib/schema/types/embeddables";
import { useProxyEmbeddable } from "@/modules/embeddables/hooks/useProxyEmbeddable";
import { Box, Button, HStack, Input } from "@chakra-ui/react";
import React, { FC, ReactNode, useState } from "react"

interface Props {
    eKey?: string;
    data: IEmbeddableConfig;
}

const EmbeddabePublish: FC<Props> = (props) => {
    const { eKey, data } = props;
    const [name, setName] = useState(eKey ?? '');
    const { proxy } = useProxyEmbeddable(name, data)

    return (
        <Box>
            <HStack>
                <Input
                    value={name}
                    onChange={(e) => {
                        const val = e.target.value;
                        setName(val);
                    }}
                />
                <Button
                    onClick={proxy}
                >
                    Publish
                </Button>
            </HStack>
        </Box>
    )
}

export default EmbeddabePublish