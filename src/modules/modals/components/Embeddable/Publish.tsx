import { IEmbeddableConfig } from "@/lib/schema/types/embeddables";
import { useCreateEmbeddable } from "@/modules/embeddables/hooks/useCreateEmbeddable";
import { Alert, AlertDescription, AlertIcon, Box, Button, HStack, Input, Text, VStack } from "@chakra-ui/react";
import React, { FC, useState } from "react"

interface Props {
    eKey?: string;
    data: IEmbeddableConfig;
}

const KEY_PATTERN = /^[A-Za-z0-9\-]{6,40}$/;

const EmbeddabePublish: FC<Props> = (props) => {
    const { eKey, data } = props;
    const [name, setName] = useState(eKey ?? '');

    const create = useCreateEmbeddable();

    const publish = () => {
        create(name, data)
    }

    return (
        <VStack alignItems="stretch">
            {eKey && (
                <Alert
                    status='warning'
                    variant='theme-warning'
                    fontSize="xs"
                    my='2'
                    mx='auto'
                    py='1.5'
                >
                    <AlertIcon />
                    <AlertDescription
                        listStylePos="inside"
                        textStyle='main-xs-regular'
                        lineHeight={1.4}
                    >
                        Embeddable is already published at <b>{eKey}</b>. Publishing again will update existing deployment
                    </AlertDescription>
                </Alert>
            )}
            <HStack>
                <Input
                    value={name}
                    onChange={(e) => {
                        const val = e.target.value;
                        setName(val);
                    }}
                    placeholder="embeddable-id"
                />
                <Button
                    onClick={publish}
                    isDisabled={name.length < 6 || !KEY_PATTERN.test(name)}
                    variant="theme-primary"
                >
                    Publish
                </Button>
            </HStack>
            <Text textStyle="main-xs-regular" color='content.low'>Id should be alphanumeric and should be 6-40 letters</Text>
        </VStack>
    )
}

export default EmbeddabePublish