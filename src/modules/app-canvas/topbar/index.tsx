import React, { FC } from 'react'
import { Box, Flex, HStack, Icon, IconButton } from '@chakra-ui/react';
import AppNameButton from '../common/appName';
import PublishButton from '../common/publish';
import { AndromedaIcon, Wallet } from '@/modules/common';
import DownloadFlexButton from '../common/downloadFlex';
import ImportFlexButton from '../common/importFlex';
import Toolbar from '../toolbar';
import { TmpButton } from '@/theme/new-system-tmp/ui-elements';
import Link from 'next/link';
import { SITE_LINKS } from '@/modules/common/utils/sitelinks';

interface TopBarProps {

}
const TopBar: FC<TopBarProps> = (props) => {
    const { } = props

    return (
        <Flex direction='row' px='2' py='1.5'>
            <HStack flex={1}>
                <Link href={SITE_LINKS.flexBuilderHome()} passHref>
                    <TmpButton as='a'>
                        <Icon as={AndromedaIcon} boxSize='4' />
                    </TmpButton>
                </Link>
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