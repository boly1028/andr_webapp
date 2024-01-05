import React, { useCallback, useEffect, useMemo } from "react";
import { getTemplate, WidgetProps } from "@andromedarjsf/utils";
import { HStack } from "@chakra-ui/react";
import { useFieldTemplate } from "../../templates/FieldTemplate";
import { useAppBuilder, useNodes, useReactFlow } from "@/modules/app-builder/canvas/Provider";
import { Position, useNodeId } from "reactflow";
import { useConnectEdge } from "../../hooks/useConnectEdge";
import { createHandlerId, createLocalVfsPath, DIRECTION, extractDataFromHandler, getComponentNameFromVfsPath } from "../../connections/utils";
import Handle from "../../ReactFlow/Handle";
import VfsResolver from "./VfsResolver";

const AndrAddrWidget = (props: WidgetProps) => {
    const { id, value } = props;
    const { fieldRef } = useFieldTemplate();
    const { formRefs, editorRef } = useAppBuilder()
    const panel = useNodeId()
    const { connect } = useConnectEdge()
    const { getNode, getEdges, deleteElements } = useReactFlow();
    // When nodes are added after populating identifier field, we need to listen to them in order to
    // connect new nodes with existing identifiers
    const nodes = useNodes();
    const nodesSets = useMemo(() => {
        return nodes.map(node => node.id).toString()
    }, [nodes])

    const leftHandle = createHandlerId(panel ?? '', id, DIRECTION.LEFT);
    const rightHandle = createHandlerId(panel ?? '', id, DIRECTION.RIGHT);

    const identifierValue = useMemo(() => {
        return getComponentNameFromVfsPath(value || '')
    }, [value])
    const getMyEdges = () => getEdges().filter(edge => edge.target === panel && extractDataFromHandler(edge.targetHandle ?? '').rjsfIdPrefix === id);

    const handleUpdate = useCallback((value: string) => {
        const myEdges = getMyEdges();
        const sourceNode = getNode(value);
        if (!sourceNode) return deleteElements({ edges: myEdges });
        if (myEdges.some(edge => edge.source === value)) return;
        const cacheDirection = editorRef.current.edgeCache?.[value]?.[createHandlerId(panel ?? '', id)];
        connect({
            source: value,
            target: panel,
            sourceHandle: createHandlerId(value, '', cacheDirection?.[0] ?? DIRECTION.UP),
            targetHandle: createHandlerId(panel ?? '', id, cacheDirection?.[1] ?? DIRECTION.LEFT)
        })
    }, [connect, panel, id, editorRef, deleteElements])

    useEffect(() => {
        if (panel) {
            formRefs.current[panel] = {
                ...(formRefs.current[panel] ?? {}),
                fieldRefs: {
                    ...(formRefs.current[panel]?.fieldRefs ?? {}),
                    [id]: {
                        onConnectionChange: (data) => {
                            fieldRef.current?.onChange?.(createLocalVfsPath(data.source))
                        }
                    }
                }
            }
        }
    }, [formRefs, fieldRef, panel, id]);

    useEffect(() => {
        const tId = setTimeout(() => {
            handleUpdate(identifierValue ?? '');
        }, 700);
        return () => clearTimeout(tId)
    }, [identifierValue, nodesSets])

    useEffect(() => {
        return () => {
            const myEdges = getMyEdges();
            deleteElements({ edges: myEdges })
        }
    }, [id])
    if (!panel) return null;

    const BaseInputTemplate = getTemplate<'BaseInputTemplate'>('BaseInputTemplate', props.registry, props.options);

    return (
        <>
            <Handle adoType="" id={leftHandle} type='target' position={Position.Left} style={{ left: '-5px' }} />
            <HStack spacing={-1} gap={-1} pr='3'>
                <BaseInputTemplate
                    {...props}
                    schema={{
                        ...props.schema,
                        examples: nodes.map(n => `./${n.id}`)
                    }}
                    mr='0'
                />
                <VfsResolver formData={value} />
            </HStack>
            <Handle adoType="" id={rightHandle} type='target' position={Position.Right} style={{ right: '-5px' }} />
        </>
    );
};

export default AndrAddrWidget;
