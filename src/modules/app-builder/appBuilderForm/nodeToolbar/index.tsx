import { Box, ButtonGroup, HStack } from "@chakra-ui/react";
import React, { FC } from "react";
import DeleteButton from "./DeleteButton";
import DownloadButton from "./Download";
import DuplicateButton from "./Duplicate";
import LoadButton from "./Load";

interface ToolbarProps {
    adoType: string;
    baseAdoType: string;
    name: string;
}

const Toolbar: FC<ToolbarProps> = (props) => {
    const { name } = props;

    return (
        <HStack pb='6' w='full' justifyContent='center'>
            <Box bg='newSystem.background.900' borderRadius='lg'>
                <ButtonGroup bg='newSystem.backgroundState.idle' borderRadius='lg' spacing='0' size='sm' zIndex={9999}>
                    <DeleteButton name={name} />
                    <DuplicateButton name={name} />
                    <DownloadButton name={name} />
                    <LoadButton name={name} />
                </ButtonGroup>
            </Box>
        </HStack>
    );
};

export default Toolbar;