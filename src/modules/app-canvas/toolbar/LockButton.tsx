import { Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { Lock, Unlock } from "lucide-react";
import React, { FC } from "react";
import { useStoreApi, useStore, ReactFlowState } from 'reactflow'

interface LockButtonProps {
}


const isInteractiveSelector = (s: ReactFlowState) => s.nodesDraggable && s.nodesConnectable && s.elementsSelectable;

const LockButton: FC<LockButtonProps> = (props) => {
    const { } = props;
    const store = useStoreApi()
    const isInteractive = useStore(isInteractiveSelector);

    const handleLock = () => {
        store.setState({
            nodesDraggable: !isInteractive,
            nodesConnectable: !isInteractive,
            elementsSelectable: !isInteractive,
        });
    }
    
    return (
        <Tooltip label={`Fit View`} bg='base.white' placement='top'>
            <IconButton
                aria-label="delete"
                icon={<Icon as={isInteractive ? Unlock : Lock} boxSize='4' />}
                variant='ghost'
                onClick={handleLock}
            />
        </Tooltip>
    );
};

export default LockButton;