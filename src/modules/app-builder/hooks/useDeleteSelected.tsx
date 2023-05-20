import { useCallback } from "react";
import { useAppBuilder, useReactFlow } from "../canvas/Provider";
import { useStoreApi } from "reactflow";
import useDeleteNode from "./useDeleteNode";
import useDeleteEdges from "./useDeleteEdges";
import { useHotkeys } from "react-hotkeys-hook";
import { APP_BUILDER_KEYCODES } from "../common/keyCodes";
import { SHORTCUT_SCOPES } from "../shortcuts/scopes";

interface IUseDeleteNodeProps { }

const useDeleteSelected = (props?: IUseDeleteNodeProps) => {
    const store = useStoreApi();
    const deleteNodes = useDeleteNode();
    const deleteEdges = useDeleteEdges();

    const deleteSelected = useCallback(() => {
        const { edges, getNodes } = store.getState();
        const selectedNodes = getNodes().filter((node) => node.selected);
        deleteNodes(selectedNodes.map(node => node.id))
        const selectedEdges = edges.filter((edge) => edge.selected);
        deleteEdges(selectedEdges.map(edge => edge.id))
    }, [deleteEdges, deleteNodes])

    return deleteSelected
};

export const useDeleteShortcut = (enabled = true, description = 'Delete') => {
    const deleteSelected = useDeleteSelected()
    const { shortcutEnabled } = useAppBuilder()
    useHotkeys(APP_BUILDER_KEYCODES.DELETE, deleteSelected, {
        scopes: [SHORTCUT_SCOPES.CANVAS],
        enabled: shortcutEnabled && enabled,
        description: description,
        preventDefault: true
    })
}

export default useDeleteSelected;