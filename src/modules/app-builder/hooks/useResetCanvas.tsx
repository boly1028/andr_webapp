import { useCallback } from "react";
import { useAppBuilder, useReactFlow } from "../canvas/Provider";
import { useHotkeys } from "react-hotkeys-hook";
import { APP_BUILDER_KEYCODES } from "../common/keyCodes";
import { SHORTCUT_SCOPES } from "../shortcuts/scopes";
import useConfirmationModal from "@/modules/modals/hooks/useConfirmationModal";
import { useStore } from "reactflow";

interface IUseResetCanvasProps { }

const useResetCanvas = (props?: IUseResetCanvasProps) => {
    const { updateNodeUpdater, formRefs } = useAppBuilder()
    const { setNodes, setEdges } = useReactFlow()
    const numNodes = useStore(state => state.nodeInternals.size);

    const openConfirmationModal = useConfirmationModal(
        'danger',
        'Are you sure you want to reset canvas?',
        undefined,
        'Delete All'
    )
    const resetCanvas = useCallback(() => {
        setEdges([])
        setNodes([])
        formRefs.current = {}
        updateNodeUpdater()
    }, [setNodes, setEdges, updateNodeUpdater])

    const reset = useCallback((force = false) => {
        if (force) {
            resetCanvas()
        } else {
            openConfirmationModal(resetCanvas)
        }
    }, [resetCanvas, openConfirmationModal])

    return { reset, disabled: numNodes === 0 }
};

export const useResetShortcut = (enabled = true, description = 'Reset') => {
    const { reset, disabled } = useResetCanvas();
    const { shortcutEnabled } = useAppBuilder()
    useHotkeys(APP_BUILDER_KEYCODES.RESET, ()=>reset(), {
        scopes: [SHORTCUT_SCOPES.CANVAS],
        enabled: shortcutEnabled && enabled && !disabled,
        description: description,
        preventDefault: true
    })

}

export default useResetCanvas;