import React, { FC } from 'react'
import { Box, Flex, HStack } from '@chakra-ui/react';
import AppNameButton from '../common/appName';
import PublishButton from '../common/publish';
import { Wallet } from '@/modules/common';
import DownloadFlexButton from '../common/downloadFlex';
import ImportFlexButton from '../common/importFlex';

interface TopBarProps {

}
const TopBar: FC<TopBarProps> = (props) => {
    const { } = props

    return (
        <Flex direction='row' px='2' py='1'>
            <HStack flex={1}>
                <AppNameButton />
                <ImportFlexButton />
            </HStack>
            <HStack>
                <DownloadFlexButton />
                <PublishButton />
                <Wallet />
            </HStack>
        </Flex>
    )
}
export default TopBar