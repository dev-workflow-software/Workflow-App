import { Handle, Position } from "reactflow";
import Card from '@mui/material/Card';
import {Typography, CardContent, InputLabel} from '@mui/material';
import {TextareaAutosize} from '@mui/base';
import { useState } from "react";


export const ProcessCard = ({data,...props}) => {
  console.log (data);
  const [enlarged,setEnlarged] = useState(false);
  return <>
    <Handle type="target" position={Position.Top} id={`to_${data.id}`} />
    <Card sx={{ minWidth: 275 }} onClick={()=>setEnlarged(!enlarged)} >
      <CardContent>
        <Typography variant="h5" component="div" align="center">
            {data.name}
        </Typography>
        {enlarged ? <div onClick={(e)=>{e.stopPropagation()}}>
          {PaymentResponse.children}
        </div>: null}
      </CardContent>
    </Card>
    <Handle type="source" position={Position.Bottom} id={`from_${data.id}`}/>
  </>
};