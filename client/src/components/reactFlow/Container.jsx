import React from 'react';
import ReactFlow, { Background, Controls, MiniMap, NodeToolbar } from 'reactflow';
 
import 'reactflow/dist/style.css';
import './Container.css';

export const Container = ({sx,...args}) => {
  return <div style={sx}>
    <ReactFlow fitView  {...args} >
      <Controls />
      <MiniMap />
      <Background variant="dots" gap={25} size={2} />
      <NodeToolbar isVisible ><h1>
        afsdfasfdas
      </h1>
        <button>delete</button>
        <button>copy</button>
        <button>expand</button>
      </NodeToolbar>
    </ReactFlow>
  </div>
    
}