import React, { FC } from 'react'
import { Flex, HStack } from '@chakra-ui/react';
import InsertButton from '../common/insert';
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
        <Flex direction='row' px='2'>
            <HStack>
                <AppNameButton />
                <InsertButton />
            </HStack>
            <HStack mx='auto'>
                <DownloadFlexButton />
                <ImportFlexButton />
            </HStack>
            <HStack>
                <PublishButton />
                <Wallet />
            </HStack>
        </Flex>
    )
}
export default TopBar