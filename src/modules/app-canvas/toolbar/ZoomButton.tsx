import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { ZoomIn, ZoomOut } from "lucide-react";
import React, { FC } from "react";
import { useReactFlow } from "../canvas/Provider";
import { APP_BUILDER_KEYCODES } from "../common/keyCodes";

interface ZoomButtonProps {
    offset: number
}

const ZoomButton: FC<ZoomButtonProps> = (props) => {
    const { offset } = props;
    const { zoomTo, getZoom } = useReactFlow()

    const handleZoom = () => {
        const zoom = getZoom();
        zoomTo(zoom + offset, {
            'duration': 300
        })
    }
    return (
        <Tooltip label={`Zoom`} bg='base.white' placement='top'>
            <IconButton
                aria-label="delete"
                icon={<Icon as={offset < 0 ? ZoomOut : ZoomIn} boxSize='4' />}
                variant='ghost'
                onClick={handleZoom}
            />
        </Tooltip>
    );
};

export default ZoomButton;