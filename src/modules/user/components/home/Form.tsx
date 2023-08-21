import { useAndromedaClient } from "@/lib/andrjs";
import { useAccount } from "@/lib/andrjs/hooks/useAccount";
import { useGetUsername } from "@/lib/andrjs/hooks/useGetUsername";
import { FallbackPlaceholder } from "@/modules/common";
import { useExecuteModal } from "@/modules/modals/hooks";
import { Button, Icon, Input, InputGroup, InputRightElement, Text, VStack, Stack, Skeleton, Alert, AlertIcon, Center } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import React, { FC, ReactNode, useCallback, useMemo, useState } from "react"

interface Props {
}

const USERNAME_PATTERN = /^[A-Za-z0-9]{1,40}$/;

const Form: FC<Props> = (props) => {
    const { } = props;
    const account = useAccount()
    const client = useAndromedaClient()
    const { data: username, error, isLoading, isRefetching } = useGetUsername(account?.address)
    const [input, setInput] = useState('');

    const isValid = useMemo(() => {
        return USERNAME_PATTERN.test(input);
    }, [input])

    const vfsAddress = client?.os.vfs?.address;
    const openExecute = useExecuteModal(vfsAddress ?? '')


    const updateUsername = () => {
        const msg = {
            "register_user": {
                "username": input
            }
        };
        openExecute(msg);
    }
    if (error) {
        return (
            <Center pt="4">
                <FallbackPlaceholder
                    title="ERROR!"
                    desc={
                        (error as any).message ||
                        "Something went wrong, we were not able to fetch data properly"
                    }
                />
            </Center>
        )
    }

    if (isLoading && !isRefetching) {
        return (
            <Stack w='full'>
                <Skeleton h="14" rounded="xl" />
                <Skeleton h="14" rounded="xl" />
            </Stack>
        )
    }
    return (
        <VStack spacing={4} w='80%'>
            {(username && username !== account?.address) && (
                <Alert status='warning' size='sm'>
                    <AlertIcon />
                    <Text textStyle="main-sm-regular">
                        You already have &apos;{username}&apos; registered for your account
                    </Text>
                </Alert>
            )}
            <InputGroup size='lg'>
                <Input
                    placeholder='Username'
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value)
                    }}
                />
                <InputRightElement pr='2'>
                    <Button colorScheme="newSystem.primary" size='sm' h='7' w='7'>
                        <Icon as={ArrowRight} boxSize='4' />
                    </Button>
                </InputRightElement>
            </InputGroup>
            <Text textStyle="main-sm-regular" color='newSystem.content.medium' alignSelf='start'>
                Your username should be alphanumeric
            </Text>
            <Button onClick={updateUsername} size='lg' w='full' colorScheme="newSystem.primary" isDisabled={!isValid || isLoading || !vfsAddress || input === username}>
                Claim
            </Button>
        </VStack>
    )
}

export default Form