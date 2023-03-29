import React, { FC } from 'react'
import { Box, Flex, HStack } from '@chakra-ui/react';
import AppNameButton from '../common/appName';
import PublishButton from '../common/publish';
import { Wallet } from '@/modules/common';
import DownloadFlexButton from '../common/downloadFlex';
import ImportFlexButton from '../common/importFlex';
import Toolbar from '../toolbar';

interface TopBarProps {

}
const TopBar: FC<TopBarProps> = (props) => {
    const { } = props

    return (
        <Flex direction='row' px='2' py='1.5'>
            <HStack flex={1}>
                <AppNameButton />
                <ImportFlexButton />
                <Toolbar />
            </HStack>
            <HStack>
                <DownloadFlexButton />
                <PublishButton />
                <Wallet size='sm' />
            </HStack>
        </Flex>
    )
}
export default TopBar