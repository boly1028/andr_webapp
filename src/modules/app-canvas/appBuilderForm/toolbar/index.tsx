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
        <Box pb='6' w='full'>
            <HStack bg='newSystem.background.900' borderRadius='lg' justifyContent='center' w='full'>
                <ButtonGroup bg='newSystem.backgroundState.idle' borderRadius='lg' spacing='0' size='sm'>
                    <DeleteButton name={name} />
                    <DuplicateButton name={name} />
                    <DownloadButton name={name} />
                    <LoadButton name={name} />
                </ButtonGroup>
            </HStack>
        </Box>
    );
};

export default Toolbar;