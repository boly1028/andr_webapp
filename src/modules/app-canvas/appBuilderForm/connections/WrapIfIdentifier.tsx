import { FC, useCallback, useEffect, useMemo } from "react";
import { useFieldTemplate } from "../templates/FieldTemplate";
import { useAppBuilder, useReactFlow } from "../../canvas/Provider";
import { Position, useNodeId, useNodes, useStore, useStoreApi } from "reactflow";
import { debounce } from 'lodash'
import Handle from "../ReactFlow/Handle";
import { DIRECTION, createHandlerId, extractDataFromHandler } from "./utils";
import { useConnectEdge } from "../hooks/useConnectEdge";

interface WrapIfIdentifierProps {
    id: string;
    formData: string;
}

export const WrapIfIdentifier: FC<WrapIfIdentifierProps> = (props) => {
    const { id, formData } = props;
    const { fieldRef } = useFieldTemplate();
    const { formRefs, editorRef } = useAppBuilder()
    const panel = useNodeId()
    const { connect } = useConnectEdge()
    const { deleteElements, getNode, getEdges } = useReactFlow();

    // When nodes are added after populating identifier field, we need to listen to them in order to
    // connect new nodes with existing identifiers
    const nodes = useNodes();
    const nodesSets = useMemo(() => {
        return nodes.map(node => node.id)
    }, [nodes])

    const leftHandle = createHandlerId(panel ?? '', id, DIRECTION.LEFT);
    const rightHandle = createHandlerId(panel ?? '', id, DIRECTION.RIGHT);

    const isIdentifier = useMemo(() => {
        return id.split('_').pop() === 'identifier'
    }, [id])

    const identifierValue: string = useMemo(() => {
        return formData || ''
    }, [formData])

    const getMyEdges = () => getEdges().filter(edge => edge.target === panel && extractDataFromHandler(edge.targetHandle ?? '').rjsfIdPrefix === id);

    const handleUpdate = useCallback(debounce((value: string) => {
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
    }, 700), [connect, panel, id, editorRef])

    useEffect(() => {
        if (isIdentifier)
            if (panel) {
                formRefs.current[panel] = {
                    ...formRefs.current[panel] ?? {},
                    fieldRefs: {
                        ...formRefs.current[panel]?.fieldRefs ?? {},
                        [id]: {
                            onConnectionChange: (data) => {
                                fieldRef.current?.onChange?.(data.source)
                                console.log(data.source)
                            }
                        }
                    }
                }
                console.log("FIELD REF START", formRefs.current[panel].fieldRefs)
            }
    }, [formRefs, fieldRef, panel, isIdentifier, id]);

    useEffect(() => {
        if (isIdentifier) {
            handleUpdate(identifierValue);
        }
    }, [identifierValue, isIdentifier, nodesSets])

    useEffect(() => {
        return () => {
            const myEdges = getMyEdges();
            deleteElements({ edges: myEdges })
        }
    }, [id])

    if (!isIdentifier || !panel) return null;

    return (
        <>
            <Handle adoType="" id={leftHandle} type='target' position={Position.Left} style={{ left: '-5px' }} />
            <Handle adoType="" id={rightHandle} type='target' position={Position.Right} style={{ right: '-5px' }} />
        </>
    )
}