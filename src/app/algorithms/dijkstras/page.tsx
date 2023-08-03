'use client'
import { useState,useEffect } from "react";
import Node from "../../../components/Node"
import { dijkstra } from "@/logic/dijkstra";

type gridNode={
    row:number,
    col:number
    isFinish:boolean,
    isStart:boolean,
    isWall:boolean,
    isVisited:boolean,
    distance:number,
    previousNode:gridNode|null,
}

const START_NODE_ROW=10;
const START_NODE_COL=15;
const FINISH_NODE_ROW=10;
const FINISH_NODE_COL=35;
const emptyGrid:gridNode[][]=[];

export default function  PathFinder()
{ 
    const [grid,setGrid] = useState(emptyGrid);
    const [loader, setLoader] = useState(true);
    const [mouseIsPressed,setMouseIsPressed] = useState(false);
    useEffect(()=>{
            const ggrid:gridNode[][]=getInitialGrid();
            setGrid(ggrid);
            setLoader(false);
    },[])
    function resetGrid()
    {
    }
    function handleMouseDown(row:number,col:number)
    {
        const newGrid:gridNode[][]=getNewGridWithWallToggled(grid,row,col);
        setGrid(newGrid);
        setMouseIsPressed(true);
    }
    function handleMouseEnter(row:number,col:number){
        if(!mouseIsPressed) return;
        const newGrid:gridNode[][]=getNewGridWithWallToggled(grid,row,col);
        setGrid(newGrid);
    }
    function handleMouseUp()
    {
        setMouseIsPressed(false);
    }
    function animateDijkstra(visitedNodesInOrder:gridNode[],nodesInShortestPathOrder:gridNode[])
    {
        for(let i=0; i<=visitedNodesInOrder.length; i++)
        {
            if(i===visitedNodesInOrder.length)
            {
                setTimeout(()=>{
                    animateShortestPath(nodesInShortestPathOrder);
                },10*i);
                return;
            }
            setTimeout(()=>{
                const node:gridNode=visitedNodesInOrder[i];
                const visitedNode=document.getElementById(`node-${node.row}-${node.col}`);
                if(visitedNode){
                    visitedNode.className=`node node-visited w-6 h-6`;
                }
            },10*i)
        }
    }
    function animateShortestPath(nodesInShortestPathOrder:gridNode[]){
        for(let i=0; i<nodesInShortestPathOrder.length; i++)
        {
            setTimeout(()=>{
                const node:gridNode=nodesInShortestPathOrder[i];
                const shortestPathNode=document.getElementById(`node-${node.row}-${node.col}`);
                if(shortestPathNode)
                {
                    shortestPathNode.className=`node node-shortest-path w-6 h-6`;
                }
            },50*i);
        }
    }
    function visualizeDijkstra(){
        const ggrid:gridNode[][]=grid;
        const startNode=ggrid[START_NODE_ROW][START_NODE_COL];
        const finishNode=ggrid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder:gridNode[]=dijkstra(grid,startNode,finishNode);
        const nodesInShortestPathOrder=getNodesInShortestPathOrder(finishNode);
        animateDijkstra(visitedNodesInOrder,nodesInShortestPathOrder);

    }
    if(loader)
    {
        return <><h1>Loading...</h1></>
    }
    return <>
    <button onClick={()=>visualizeDijkstra()} className="m-4 border border-slate-950 hover:border-slate-400 hover:text-slate-400 p-2 rounded text-slate-950">{`Visualize Dijkstra's Algorithm`}</button>
    <button onClick={()=>resetGrid()} className="m-4 border border-slate-950 hover:border-slate-400 hover:text-slate-400 p-2 rounded text-slate-950">{`Reset Grid`}</button>
    <div className="ml-10">
        {grid.map((row,rowIdx)=>{
            return (<div key={rowIdx} className="flex w-auto h-auto">
                {row.map((node,nodeIdx)=>{
                    const {row,col,isFinish,isStart,isWall}=node;
                    return (
                        <Node 
                        size={"6"}
                        key={nodeIdx} 
                        row={row} 
                        col={col}
                        isFinish={isFinish}
                        isStart={isStart}
                        isWall={isWall}
                        onMouseDown={(row,col)=>handleMouseDown(row,col)}
                        onMouseEnter={(row,col)=>handleMouseEnter(row,col)}
                        onMouseUp={()=>handleMouseUp()}
                        />
                    )
                })}
            </div>)
        })}
    </div>
    </>
}

function getInitialGrid(){
    const ggrid:gridNode[][]=[];
    for(let row=0; row<20; row++)
    {
        const currRow:gridNode[]=[];
        for(let col=0; col<50; col++)
        {
            currRow.push(createNode(row,col));
            // console.log(row,col);
        }
        ggrid.push(currRow);
    }
    return ggrid;
}

const createNode=(row:number,col:number)=>{
    const tempp:gridNode= {
        row,
        col,
        isStart: row===START_NODE_ROW && col===START_NODE_COL,
        isFinish: row===FINISH_NODE_ROW && col===FINISH_NODE_COL,
        isWall:false,
        isVisited:false,
        distance:Infinity,
        previousNode:null,
    }
    return tempp;
}

const getNewGridWithWallToggled=(grid:gridNode[][],row:number,col:number)=>{
    const newGrid:gridNode[][]=grid.slice();
    const node:gridNode=newGrid[row][col];
    const newNode:gridNode={
        ...node,
        isWall:!node.isWall,
    }
    newGrid[row][col]=newNode;
    return newGrid;
}


export function getNodesInShortestPathOrder(finishNode:gridNode){
    const nodesInShortestPathOrder:gridNode[]=[];
    let currentNode:gridNode|null=finishNode;
    while(currentNode!==null)
    {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode=currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}