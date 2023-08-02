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

export function dijkstra(grid:gridNode[][],startNode:gridNode,finishNode:gridNode)
{
    const visitedNodesInOrder:gridNode[]=[];
    startNode.distance=0;
    const unvisitedNodes:gridNode[]=getAllNodes(grid);
    while(!!unvisitedNodes.length)
    {
        sortNodesByDistance(unvisitedNodes);
        const closestNode=unvisitedNodes.shift();
        if(closestNode)
        {
            if(closestNode.isWall) continue;
            if(closestNode.distance===Infinity) return visitedNodesInOrder;
            closestNode.isVisited=true;
            visitedNodesInOrder.push(closestNode);
            if(closestNode===finishNode) return visitedNodesInOrder;
            updateUnvisitedNeighbors(closestNode,grid);
        }
        else
        {
            break;
        }

    }
    return visitedNodesInOrder;    
}

function getAllNodes(grid:gridNode[][])
{
    const nodes:gridNode[]=[];
    for(const row of grid)
    {
        for(const node of row)
        {
            nodes.push(node);
        }
    }
    return nodes;
}

function sortNodesByDistance(unvisitedNodes:gridNode[])
{
    unvisitedNodes.sort((nodeA:gridNode,nodeB:gridNode)=>nodeA.distance-nodeB.distance)
}

function updateUnvisitedNeighbors(node:gridNode,grid:gridNode[][])
{
    const unvisitedNeighbors = getUnvisitedNeighbors(node,grid);
    for(const neighbor of unvisitedNeighbors){
        neighbor.distance=node.distance+1;
        neighbor.previousNode=node;
    }
}

function getUnvisitedNeighbors(node:gridNode,grid:gridNode[][])
{
    const neighbors:gridNode[]=[];
    const {row,col}=node;
    if(row>0) neighbors.push(grid[row-1][col]);
    if(row<grid.length-1) neighbors.push(grid[row+1][col]);
    if(col>0) neighbors.push(grid[row][col-1]);
    if(col<grid[0].length-1) neighbors.push(grid[row][col+1]);
    return neighbors.filter(neighbors=>!neighbors.isVisited);
}