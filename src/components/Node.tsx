'use client'
type NodeProp={
     size:string,
     row:number,
     col:number,
     isFinish:boolean,
     isStart:boolean,
     isWall:boolean,
     onMouseDown:(row:number,col:number)=>void,
     onMouseEnter:(row:number,col:number)=>void,
     onMouseUp:()=>void,
}

import './Node.css';

export default function Node({size,row,col,isFinish,isStart,isWall,onMouseDown,onMouseEnter,onMouseUp}:NodeProp)
{
    const extraClassName=isFinish?'node-finish':isStart?'node-start':isWall?'node-wall':'';
    const width="w-"+size;
    const height="h-"+size;
    return (
    <div 
    id={`node-${row}-${col}`}
    className={`node ${extraClassName} p-0 m-0 ${width} ${height}`}
    onMouseDown={()=>onMouseDown(row,col)}
    onMouseEnter={()=>onMouseEnter(row,col)}
    onMouseUp={()=>onMouseUp()}
    >
    </div>
)}