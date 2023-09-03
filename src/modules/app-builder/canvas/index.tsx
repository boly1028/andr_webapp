import React, { FC, useCallback, useMemo, useRef, useState } from "react";
import ReactFlow, {
  MarkerType,
  NodeTypes,
  useEdgesState,
  useNodesState,
} from "reactflow";
import { IEdgeData, INodeData, useAppBuilder } from "./Provider";
import "reactflow/dist/style.css";
import AppBuilderForm from "../appBuilderForm/Form";
import { Box, Center } from "@chakra-ui/react";
import { WRAPPER_ID } from "../hooks/useGetWrapper";
import { APP_BUILDER_KEYCODES } from "../common/keyCodes";
import LoadTemplate from "../common/LoadTemplate";
import { useConnectEdge } from "../appBuilderForm/hooks/useConnectEdge";
import { useAppShortcuts } from "../shortcuts";
import { useLoadFlexUrl } from "../hooks/useLoadFlexUrl";
import { useAddNodeByDrop } from "../hooks/useAddNodeByDrop";

interface AppBuilderCanvasProps { }
const AppBuilderCanvas: FC<AppBuilderCanvasProps> = (props) => {
  const { } = props;
  const [nodes, , onNodesChange] = useNodesState<INodeData>([]);
  const [edges, , onEdgesChange] = useEdgesState<IEdgeData>([]);
  const { formRefs, isDirty, editorRef } = useAppBuilder();
  const { connect } = useConnectEdge()

  const NODE_TYPES: NodeTypes = useMemo(() => {
    return {
      form: AppBuilderForm,
    };
  }, [AppBuilderForm]);

  // Enable all shortcuts for app; This can later be disabled using shortcut context
  useAppShortcuts();
  useLoadFlexUrl();

  const { onDragOver, onDrop } = useAddNodeByDrop()

  return (
    <Box w="full" h="full" id={WRAPPER_ID} ref={(ref) => editorRef.current.rfWrapperInstance = ref ?? undefined}>
      {!isDirty && (
        <Center w="full" h="full" overflow="auto">
          <LoadTemplate />
        </Center>
      )}
      <ReactFlow
        deleteKeyCode={null}
        multiSelectionKeyCode={APP_BUILDER_KEYCODES.MULTISELECT}
        zoomActivationKeyCode={APP_BUILDER_KEYCODES.ZOOM}
        style={{ width: "100%", height: "100%", background: "transparent" }}
        connectionLineStyle={{ stroke: "#ddd", strokeWidth: 2 }}
        snapToGrid={true}
        snapGrid={[16, 16]}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={NODE_TYPES}
        // fitView
        zoomOnPinch={true}
        panOnScroll={true}
        zoomOnScroll={false}
        // preventScrolling={false}
        defaultEdgeOptions={{
          deletable: true,
          markerEnd: MarkerType.ArrowClosed,
          zIndex: 99,
        }}
        // nodeOrigin={[0.5, 0.5]}
        minZoom={0.1}
        defaultViewport={{
          x: 50,
          y: 50,
          zoom: 1,
        }}
        proOptions={{
          hideAttribution: true,
        }}
        onNodesDelete={(nodes) => {
          nodes.forEach((node) => {
            if (formRefs.current[node.id]) {
              delete formRefs.current[node.id];
            }
          });
        }}
        fitViewOptions={{
          duration: 300,
        }}
        onConnect={(conn) => {
          connect(conn)
        }}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        {/* <Background variant={BackgroundVariant.Dots} gap={20} size={0.75} color='#ffffff' /> */}
        {/* <MiniMap zoomable pannable /> */}
        {/* <Controls /> */}
      </ReactFlow>
    </Box>
  );
};
export default AppBuilderCanvas;
