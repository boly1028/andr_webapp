import usePanelRenameModal from "@/modules/modals/hooks/usePanelRenameModal";
import { TmpButton } from "@/theme/new-system-tmp/ui-elements";
import { Box, ButtonGroup, HStack, Icon, IconButton } from "@chakra-ui/react";
import { Copy, Download, Trash, Upload } from "lucide-react";
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
                <ButtonGroup bg='newSystem.backgroundState.idle' borderRadius='lg' spacing='0' size='sm'>
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