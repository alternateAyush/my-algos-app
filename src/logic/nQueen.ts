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

export function ratInMaze(grid:gridNode[][],startRow:number,startCol:number,finishRow:number,finishCol:number)
{
    const solvedGrid:gridNode[]=[];
    const visitedNodes:gridNode[]=[];
    const flag=solveMaxRec(grid,startRow,startCol,finishRow,finishCol,solvedGrid,visitedNodes,null);
    if(!flag)
    {
        console.log('no path');
        grid[finishRow-1][finishCol-1].previousNode=null;
    }
    return visitedNodes;
}

function isSafe(grid:gridNode[][],i:number,j:number,n:number,m:number)
{
    return (i<n && j<m && grid[i][j].isWall===false) 
}
function solveMaxRec(grid:gridNode[][],i:number,j:number,n:number,m:number,solvedGrid:gridNode[],visitedNodes:gridNode[],preNode:gridNode|null)
{    
    if(i===n-1 && j===m-1)
    {
        console.log("hello",i,j);
        solvedGrid.push(grid[i][j]);
        grid[i][j].previousNode=preNode;
        grid[i][j].isVisited=true;
        return true;
    }
    if(isSafe(grid,i,j,n,m))
    {
        solvedGrid.push(grid[i][j]);
        if(visitedNodes.length< 4294967290)
        {
            visitedNodes.push(grid[i][j]);
        }        
        grid[i][j].previousNode=preNode;
        grid[i][j].isVisited=true;
        if(solveMaxRec(grid,i,j+1,n,m,solvedGrid,visitedNodes,grid[i][j])) return true;
        else if(solveMaxRec(grid,i+1,j,n,m,solvedGrid,visitedNodes,grid[i][j])) return true;
        solvedGrid.pop();
    }
    return false;
}