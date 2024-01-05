import { Box, VStack } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react"
import Header from "./Header";
import Form from "./Form";

interface Props {
}

const Page: FC<Props> = (props) => {
    const { } = props;
    return (
        <Box>
            <VStack w='full' alignItems="center">
                <VStack w='full' spacing={10} maxW='container.sm' textAlign='center'>
                    <Header />
                    <Form />
                </VStack>
            </VStack>
        </Box>
    )
}

export default Page