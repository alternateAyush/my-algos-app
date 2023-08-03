'use client'
import {useState,useEffect} from 'react';
import { getMergeSortAnimations} from '@/logic/sorting';
import Link from 'next/link';

const ANIMATION_SPEED_MS=20;
const NUMBER_OF_ARRAY_BARS = 150;
const PRIMARY_COLOR='turquoise';
const SECONDAY_COLOR='red';
const TEMP_ARRAY:number[]=[];
const BUTTON_STYLE="m-1 border border-slate-950 hover:border-slate-400 hover:text-slate-400 p-2 rounded text-slate-950";

export default function SortingVisualizer(){
    const [array,setArray] = useState(TEMP_ARRAY);
    useEffect(()=>{
        resetArray();        
    },[]);
    function resetArray(){
        const arr:number[]=[];
        for(let i=0; i<NUMBER_OF_ARRAY_BARS; i++)
        {
            arr.push(randomIntFromInterval(5,500));
        }
        setArray(arr);
    }
    function mergeSort(){
        const animations:number[][]=getMergeSortAnimations(array);
        for(let i=0; i<animations.length; i++)
        {
            const arrayBars = Array.from(document.getElementsByClassName('array-bar') as HTMLCollectionOf<HTMLElement>);
            const isColorChange= (i%3!==2);
            if(isColorChange)
            {
                const [barOneIdx,barTwoIdx]=animations[i];
                const barOneStyle=arrayBars[barOneIdx].style;
                const barTwoStyle=arrayBars[barTwoIdx].style;
                const color = (i%3===0)? SECONDAY_COLOR:PRIMARY_COLOR;
                setTimeout(()=>{
                    barOneStyle.backgroundColor=color;
                    barTwoStyle.backgroundColor=color;
                },ANIMATION_SPEED_MS*i)

            }
            else
            {
                const [barOneIdx,newHeight]=animations[i];
                const barOneStyle=arrayBars[barOneIdx].style;
                setTimeout(()=>{
                    barOneStyle.height=`${newHeight}px`;
                },ANIMATION_SPEED_MS*i)                
            }
        }
    }
    // function testSortingAlgorithms() {
    //     for (let i = 0; i < 100; i++) {
    //       const array = [];
    //       const length = randomIntFromInterval(1, 1000);
    //       for (let i = 0; i < length; i++) {
    //         array.push(randomIntFromInterval(-1000, 1000));
    //       }
    //       const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
    //       const mergeSortedArray = getMergeSortAnimations(array.slice());
    //       console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    //     }
    //   }
    const arr:number[]=array;
    return <>
                <ul className='flex flex-row justify-start my-2 '>
                        <Link href="/" className={`${BUTTON_STYLE}`}>{`Home`}</Link>
                        <button onClick={()=>{resetArray()}} className={`${BUTTON_STYLE}`}>Generate New Array</button>
                        <button onClick={()=>{mergeSort()}} className={`${BUTTON_STYLE}`}>Merge Sort</button>
                        {/* <button onClick={()=>{testSortingAlgorithms()}} className={`${BUTTON_STYLE}`}>Test Sorting Algorithm</button> */}
                </ul>
                <div className='absolute left-24 bottom-1'>
                    {arr.map((value,idx)=>(
                        <div 
                            key={idx}
                            className="array-bar inline-block w-1 my-0 mx-px"
                            style={{
                                backgroundColor: PRIMARY_COLOR,
                                height: `${value}px`,
                            }}></div>
                    ))}
                </div>
            </>
}

function randomIntFromInterval(min:number,max:number){
    return Math.floor(Math.random()*(max-min)+1+min);
}
function arraysAreEqual(arrayOne:number[], arrayTwo:number[]) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
      if (arrayOne[i] !== arrayTwo[i]) {
        return false;
      }
    }
    return true;
  }