import { downloadBlob } from "@/utils/file";
import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { Download, Trash } from "lucide-react";
import React, { FC } from "react";
import { useAppBuilder } from "../../canvas/Provider";

interface DownloadButtonProps {
    name: string;
}

const DownloadButton: FC<DownloadButtonProps> = (props) => {
    const { name } = props;
    const { formRefs } = useAppBuilder()

    const downloadJson = () => {
        const formData = formRefs.current?.[name]?.formData ?? {}
        const blob = new Blob([JSON.stringify(formData)], {
            type: "text/plain",
        });
        downloadBlob(
            blob,
            `${name || "panel"
            }-${new Date().getTime()}.json`,
        );
    };

    return (
        <Tooltip label='Download' placement='top'>
            <IconButton
                aria-label="download"
                icon={<Icon as={Download} boxSize='4' />}
                variant='ghost'
                onClick={downloadJson}
            />
        </Tooltip>
    );
};

export default DownloadButton;