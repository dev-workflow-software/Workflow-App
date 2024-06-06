
import { Container as ReactFlowContainer } from '../reactFlow/Container';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Axios } from 'axios';
import { BaseEdge, MarkerType, addEdge, applyEdgeChanges, applyNodeChanges, useEdgesState, useNodesState } from 'reactflow';
import { ProcessCard } from '../reactFlow/ProcessCard';


export const WorkflowSettings = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onConnect = useCallback(
        (connection) => setEdges((eds) => {
            console.log({connection});
            connection.animated = true;
            connection.markerEnd = {
                type: MarkerType.ArrowClosed,
            };
            return addEdge(connection, eds)
        }),
        [setEdges]
    );

    

    useEffect(()=>{
        setNodes([
            { id: 'GUID0', position: { x: 0, y: 0 }, data: { id: 'GUID0', name: 'Document Type A' },type:'processCard'},
            { id: 'GUID1', position: { x: 0, y: 100 }, data: { id:'GUID1', name: 'Document Type B' },type:'processCard'},
        ]);
        setEdges([
            {
                id: 'GUID0-GUID1',
                source: 'GUID0',
                sourceHandle:"from_GUID0",
                target: 'GUID1',
                animated:true,
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                },
            }
        ]);

        // const data = await Axios.get(`${import.meta.env.VITE_PUBLIC_API_HOST}/config/workflow`);

    },[]);

    useEffect(()=>{
        console.log(edges, '//TODO: should we persist these changes while editing? maybe not?');
    },[edges]);
       

    const nodeTypes = useMemo(() => ({ processCard: ProcessCard }), []);
   
    const myNodeChange = (changes) => {
        console.log('myNodeChange',{changes});
        onNodesChange(changes);
    }

    return <ReactFlowContainer 
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={myNodeChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        sx={{height:"75%"}} 
    />
}