import React, { FC } from 'react'
import { Button, Flex, HStack, Icon, IconButton } from '@chakra-ui/react';
import AppNameButton from '../common/appName';
import PublishButton from '../common/publish';
import { AndromedaIcon, Wallet } from '@/modules/common';
import DownloadFlexButton from '../common/downloadFlex';
import ImportFlexButton from '../common/importFlex';
import Toolbar from '../toolbar';
import Link from 'next/link';
import { SITE_LINKS } from '@/modules/common/utils/sitelinks';
import CopyCliButton from '../common/CopyCli';
import CopyFlexUrlButton from '../common/CopyFlexUrl';
import OpenInAdoBuilderButton from '../common/OpenInAdoBuilder';

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
                <OpenInAdoBuilderButton />
                <CopyCliButton />
                <CopyFlexUrlButton />
                <DownloadFlexButton />
                <PublishButton />
                <Wallet size='sm' />
            </HStack>
        </Flex>
    );
}
export default TopBar