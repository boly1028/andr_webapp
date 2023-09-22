import { SearchIcon } from "@chakra-ui/icons";
import { Box, Flex, Grid, Heading, HStack, Input, InputGroup, InputLeftElement, Select, Skeleton, Stack, VStack } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react"
import { useGetEmbeddableKeys } from "../hooks/useGetEmbeddables";
import EmbeddableItem from "./EmbeddableItem";
import { useAccount } from "@/lib/andrjs/hooks/useAccount";

interface Props {
}

const EmbeddableList: FC<Props> = (props) => {
    const { } = props;
    const [searchInput, setSearchInput] = useState('');
    const account = useAccount()
    const { keys, loading } = useGetEmbeddableKeys(account?.address ?? '');

    const [sortType, setSortType] = useState('');
    const [keyList, setkeyList] = useState(keys ?? []);

    useEffect(() => {
        if (searchInput) {
            const list = keys?.filter((item) => item.includes(searchInput)) ?? [];
            setkeyList(list);
        } else {
            setkeyList(keys ?? []);
        }
    }, [searchInput]);

    useEffect(() => {
        setkeyList(keys ?? []);
    }, [keys]);

    return (
        <Box py='48px'>
            <VStack spacing={4} w='full' alignItems={'flex-start'}>
                <Flex w='full' gap='24px' direction={'column'}>
                    <HStack>
                        <Heading textAlign={'start'} fontWeight='600' fontSize={'24px'}>My embeddables</Heading>
                    </HStack>
                    <Grid mb='24px' gap='8px' gridTemplateColumns={'86% 14%'}>
                        <Box h='40px'>
                            <InputGroup borderRadius={'8px'}>
                                <InputLeftElement pointerEvents='none'>
                                    <SearchIcon color='gray.300' />
                                </InputLeftElement>
                                <Input type='tel' placeholder='Search embeddables'
                                    onChange={(event) => setSearchInput(event.target?.value.trim())}
                                />
                            </InputGroup>
                        </Box>
                        <Select size='sm' h='40px' borderRadius='8px' placeholder="Sort by"
                            onChange={(event) => { setSortType(event.target.value) }}>
                            <option value='Asc'>Asc</option>
                            <option value='Desc'>Desc</option>
                        </Select>
                    </Grid>
                    {loading && (
                        <Stack>
                            <Skeleton h="20" rounded="lg" />
                            <Skeleton h="20" rounded="lg" />
                        </Stack>
                    )}
                    {keyList.map(key => (
                        <EmbeddableItem
                            key={key}
                            ekey={key}
                        />
                    ))}
                </Flex>
            </VStack>
        </Box>
    )
}

export default EmbeddableList

