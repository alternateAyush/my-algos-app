'use client'
type NodeProp={
     row:number,
     col:number,
     isFinish:boolean,
     isStart:boolean,
     isWall:boolean,
     mouseIsPressed:boolean,
     onMouseDown:(row:number,col:number)=>void,
     onMouseEnter:(row:number,col:number)=>void,
     onMouseUp:()=>void,
}

import './Node.css';

export default function Node({row,col,isFinish,isStart,isWall,mouseIsPressed,onMouseDown,onMouseEnter,onMouseUp}:NodeProp)
{
    const extraClassName=isFinish?'node-finish':isStart?'node-start':isWall?'node-wall':'';
    return (
    <div 
    id={`node-${row}-${col}`}
    className={`node ${extraClassName} p-0 m-0`}
    onMouseDown={()=>onMouseDown(row,col)}
    onMouseEnter={()=>onMouseEnter(row,col)}
    onMouseUp={()=>onMouseUp()}
    >
    </div>
)}