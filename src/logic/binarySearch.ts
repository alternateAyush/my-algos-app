export function binarySearch(array:number[],target:number)
{
    const animations:number[][]=[];
    binarySearchHelper(array,animations,target);
    return animations;
}

function binarySearchHelper(array:number[],animations:number[][],target:number)
{
    var low:number=0;
    var high:number=array.length-1;
    while(low<=high)
    {
        var mid=Math.floor((low+high)/2);
        animations.push([low,mid,high])
        animations.push([low,mid,high])
        if(array[mid]===target)
        {
            animations.pop();
            return;
        }
        else if(array[mid]<target)
        {
            low=mid+1;            
        }
        else
        {
            high=mid-1;
        }
    }
}