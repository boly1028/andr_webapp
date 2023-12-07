import { useQueryAllChainConfigs } from "@/lib/graphql/hooks/chain/useChainConfig";
import { Badge, Button, ButtonProps, Flex, Icon, Image, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import React, { FC, ReactNode } from "react"
import ChainFallbackIcon from "../icons/ChainFallbackIcon";

interface Props extends ButtonProps {
    chain: string;
    onChainChange: (chain: string) => void;
}

const ChainSelector: FC<Props> = (props) => {
    const { onChainChange, chain, ...buttonProps } = props;
    const { data: configs } = useQueryAllChainConfigs();

    return (
        <Menu>
            <MenuButton as={Button} size='sm' variant="theme-low" rightIcon={<Icon as={ChevronDown} />} {...buttonProps} />
            <MenuList maxH="max(50vh,20rem)" overflow='auto'>
                {configs?.map((config) => (
                    <MenuItem
                        onClick={() => {
                            onChainChange(config.chainId)
                        }}
                        key={config.chainId}
                    >
                        <Flex
                            direction="row"
                            alignItems="center"
                            gap="2"
                            w="full"
                        >
                            {config?.iconUrls?.sm ? (
                                <Image src={config?.iconUrls?.sm ?? ""}
                                    w="5"
                                    h="5"
                                    overflow="hidden"
                                    p="0.5"
                                    bg="dark.200"
                                    rounded="full" />
                            ) : (
                                <Icon
                                    as={ChainFallbackIcon}
                                    boxSize='5'
                                    w="5"
                                    h="5"
                                    overflow="hidden"
                                    p="0.5"
                                    bg="dark.200"
                                    rounded="full"
                                />
                            )}
                            <Text fontWeight={600} color="content.high" mr="1">
                                {config.chainName ?? config.chainId}
                            </Text>
                            <Badge
                                colorScheme={
                                    config?.chainType === "mainnet"
                                        ? "green"
                                        : "purple"
                                }
                                fontSize='x-small'
                                py="1"
                                rounded="full"
                                ml="auto"
                            >
                                {config?.chainType}
                            </Badge>
                        </Flex>
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    )
}

export default ChainSelector