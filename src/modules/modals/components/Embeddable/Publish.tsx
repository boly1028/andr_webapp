import { IEmbeddableConfig } from "@/lib/schema/types/embeddables";
import { useCreateEmbeddable } from "@/modules/embeddables/hooks/useCreateEmbeddable";
import { Box, Button, HStack, Input } from "@chakra-ui/react";
import React, { FC, useState } from "react"

interface Props {
    eKey?: string;
    data: IEmbeddableConfig;
}

const EmbeddabePublish: FC<Props> = (props) => {
    const { eKey, data } = props;
    const [name, setName] = useState(eKey ?? '');

    const create = useCreateEmbeddable();

    const publish = () => {
        create(name, data)
    }

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
                    onClick={publish}
                    isDisabled={name.length < 6}
                >
                    Publish
                </Button>
            </HStack>
        </Box>
    )
}

export default EmbeddabePublish