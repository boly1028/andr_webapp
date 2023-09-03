import { Box, Button, Icon, Image, Text, VStack } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";

interface Props {
}

const Header: FC<Props> = (props) => {
    const { } = props;
    return (
        <VStack w='full' spacing={2}>
            <Image src='/logo.png' width='16' />
            <Text as='h1' color='content.high' textStyle='main-4xl-semibold'>Claim your username</Text>
            <Text textStyle='main-sm-regular' color='content.medium'>Lorem ipsum dolor sit amet consectetur. Arcu amet lorem netus tristique mattis condimentum dictum.</Text>
        </VStack>
    )
}

export default Header;