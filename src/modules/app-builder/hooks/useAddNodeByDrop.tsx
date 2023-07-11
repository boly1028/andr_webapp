import { useCallback } from "react";
import { ReactFlowProps } from "reactflow";
import { useAppBuilder, useReactFlow } from "../canvas/Provider";
import { RF_DRAG_KEYS, RF_DRAG_KEYS_TYPE } from "../types";
import { getSchemaFromPath } from "@/lib/schema/utils";
import useAddNode from "./useAddNode";

export const useAddNodeByDrop = () => {
    const { editorRef } = useAppBuilder();
    const { project } = useReactFlow();
    const addNode = useAddNode();

    const onDragOver: ReactFlowProps['onDragOver'] = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop: ReactFlowProps['onDrop'] = useCallback(
        async (event) => {
            const wrapperInstance = editorRef.current.rfWrapperInstance;
            event.preventDefault();
            if (!wrapperInstance) return;
            const reactFlowBounds = wrapperInstance.getBoundingClientRect();
            const schema = event.dataTransfer.getData(RF_DRAG_KEYS.SCHEMA) as RF_DRAG_KEYS_TYPE[RF_DRAG_KEYS.SCHEMA];

            // check if the dropped element is valid
            if (typeof schema === 'undefined' || !schema) {
                return;
            }

            const position = project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });
            const ado = await getSchemaFromPath(schema);
            addNode(ado, { position });
        },
        [editorRef, project, addNode]
    );

    return {
        onDragOver,
        onDrop
    }
}