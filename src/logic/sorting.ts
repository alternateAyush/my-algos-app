export function getMergeSortAnimations(array:number[])
{
    const animations:number[][]=[];
    if(array.length<=1) return animations;
    // if(array.length<=1) return array;
    mergeSort(array,0,array.length-1,animations);
    // return array;
    return animations;
}
export function getBubbleSortAnimations(array:number[])
{
    const animations:number[][]=[];
    if(array.length<=1) return animations;
    // if(array.length<=1) return array;
    bubbleSort(array,animations);
    return animations;
    // return array;
}

// function printArray(arr1:number[],arr2:number[])
// {
//     console.log("aux:",);
//     for(const x of arr1)
//     {
//         console.log(x,);
//     }
//     console.log("\n");
//     console.log("main:",);
//     for(const x of arr1)
//     {
//         console.log(x,);
//     }
//     console.log("\n");
// }
// Bubble sort
function bubbleSort(arr:number[],animations:number[][])
{
    const n:number=arr.length;
    for(let i=0; i<n; i++)
    {
        let swapped:boolean=false;
        for(let j=0; j<(n-i-1); j++)
        {
            animations.push([j,j+1]);
            animations.push([j,j+1]);
            if(arr[j]>arr[j+1])
            {
                let t=arr[j];
                arr[j]=arr[j+1];
                arr[j+1]=t;
                swapped=true;
            }
            animations.push([j,arr[j],j+1,arr[j+1]]);
        } 
        if(swapped===false) break;       
    }        
}
// Merge Sort
function mergeSort(mainArray:number[],startIdx:number,endIdx:number,animations:number[][])
{
    if(startIdx===endIdx) return;
    const middleIdx = Math.floor((endIdx+startIdx)/2);
    mergeSort(mainArray,startIdx,middleIdx,animations);
    mergeSort(mainArray,middleIdx+1,endIdx,animations);
    doMerge(mainArray,startIdx,middleIdx,endIdx,animations);
}

function doMerge(mainArray:number[],startIdx:number,middleIdx:number,endIdx:number,animations:number[][])
{
    const arr1:number[]=[];
    const arr2:number[]=[];
    for(let i=startIdx; i<=middleIdx; i++)
    {
        arr1.push(mainArray[i]);
    }
    for(let i=middleIdx+1; i<=endIdx; i++)
    {
        arr2.push(mainArray[i]);
    }
    let k:number=startIdx;
    let i:number=0;
    let j:number=0;
    while(i<=(middleIdx-startIdx) && j<=(endIdx-(middleIdx+1)))
    {
        animations.push([startIdx+i,middleIdx+1+j]);
        animations.push([startIdx+i,middleIdx+1+j]);
        if(arr1[i]<=arr2[j])
        {
            animations.push([k,arr1[i]]);
            mainArray[k++]=arr1[i++];
        }
        else
        {
            animations.push([k,arr2[j]]);
            mainArray[k++]=arr2[j++];
        }
    }
    while(i<=(middleIdx-startIdx))
    {
        animations.push([startIdx+i,startIdx+i]);
        animations.push([startIdx+i,startIdx+i]);
        animations.push([k,arr1[i]]);
        mainArray[k++]=arr1[i++];
    }
    while(j<=(endIdx-(middleIdx+1)))
    {
        animations.push([middleIdx+1+j,middleIdx+1+j]);
        animations.push([middleIdx+1+j,middleIdx+1+j]);
        animations.push([k,arr2[j]]);
        mainArray[k++]=arr2[j++];
    }
}