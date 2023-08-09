'use client'
import {useState,useEffect} from 'react';
import { getMergeSortAnimations,getBubbleSortAnimations} from '@/logic/sorting';
import Link from 'next/link';
import './page.css';

const BAR_WIDTH=8;
const ANIMATION_SPEED_MS=3;
const NUMBER_OF_ARRAY_BARS = 100;
const PRIMARY_COLOR='turquoise';
const SECONDAY_COLOR='red';
const TEMP_ARRAY:number[]=[];
const BUTTON_STYLE="m-1 border border-slate-950 hover:border-slate-400 hover:text-slate-400 p-2 rounded text-slate-950";

export default function SortingVisualizer(){
    const [numberOfArrayBars,setNumberOfArrayBars]=useState(100);
    const [barWidth,setBarWidth]=useState(8);
    const [animationSpeed,setAnimationSpeed]=useState(3);
    const [primaryColor,setColor] = useState("turquoise");
    const [array,setArray] = useState(TEMP_ARRAY);
    useEffect(()=>{
        resetArray();        
    },[]);
    function resetArray(){
        const arr:number[]=[];
        console.log(numberOfArrayBars,barWidth);
        for(let i=0; i<numberOfArrayBars; i++)
        {
            arr.push(randomIntFromInterval(5,500));
        }
        const red:number=randomIntFromInterval(50,200);
        const green:number=randomIntFromInterval(50,200);
        const blue:number=randomIntFromInterval(50,200);
        const color:string="rgb("+red+","+green+","+blue+")";
        setColor(color);
        setArray(arr);
    }  
    function increaseSpeed()
    {
        let currSpeed=animationSpeed;
        if(currSpeed===2) return;
        setAnimationSpeed(currSpeed-1);
    }  
    function decreaseSpeed()
    {
        let currSpeed=animationSpeed;
        if(currSpeed===500) return;
        setAnimationSpeed(currSpeed+1);
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
                console.log(barOneIdx,barTwoIdx);
                const barOneStyle=arrayBars[barOneIdx].style;
                const barTwoStyle=arrayBars[barTwoIdx].style;
                const color = (i%3===0)? SECONDAY_COLOR:primaryColor;
                setTimeout(()=>{
                    barOneStyle.backgroundColor=color;
                    barTwoStyle.backgroundColor=color;
                },animationSpeed*i)
                
            }
            else
            {
                const [barOneIdx,newHeight]=animations[i];
                console.log(barOneIdx);
                const barOneStyle=arrayBars[barOneIdx].style;
                setTimeout(()=>{
                    barOneStyle.height=`${newHeight}px`;                    
                },animationSpeed*i)                
            }
        }
    }
    function bubbleSort(){
        const animations:number[][]=getBubbleSortAnimations(array);
        for(let i=0; i<animations.length; i++)
        {
            const arrayBars = Array.from(document.getElementsByClassName('array-bar') as HTMLCollectionOf<HTMLElement>);
            const isColorChange= (i%3!==2);
            if(isColorChange)
            {
                const [barOneIdx,barTwoIdx]=animations[i];
                console.log(barOneIdx,barTwoIdx);
                const barOneStyle=arrayBars[barOneIdx].style;
                const barTwoStyle=arrayBars[barTwoIdx].style;
                const color = (i%3===0)? SECONDAY_COLOR:primaryColor;
                setTimeout(()=>{
                    arrayBars[barOneIdx].className = "array-bar inline-block my-0 mx-px";
                    arrayBars[barTwoIdx].className = "array-bar inline-block my-0 mx-px";
                    barOneStyle.backgroundColor=color;
                    barTwoStyle.backgroundColor=color;
                },animationSpeed*i)
                
            }
            else
            {
                const [barOneIdx,newHeight1,barTwoIdx,newHeight2]=animations[i];
                console.log(barOneIdx);
                const barOneStyle=arrayBars[barOneIdx].style;
                const barTwoStyle=arrayBars[barTwoIdx].style;
                setTimeout(()=>{
                    arrayBars[barOneIdx].className = "array-bar inline-block my-0 mx-px node-visited";
                    arrayBars[barTwoIdx].className = "array-bar inline-block my-0 mx-px node-visited";
                    barOneStyle.height=`${newHeight1}px`;
                    barTwoStyle.height=`${newHeight2}px`;
                },animationSpeed*i)               
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
    //       const sortedArray= getBubbleSortAnimations(array.slice());
    //       console.log(arraysAreEqual(javaScriptSortedArray, sortedArray));
    //     }
    //   }
    return <>
                <ul className='flex flex-row justify-start my-2 '>
                        <Link href="/" className={`${BUTTON_STYLE}`}>{`Home`}</Link>
                        <button onClick={()=>{resetArray()}} className={`${BUTTON_STYLE}`}>Generate New Array</button>
                        <button onClick={()=>{mergeSort()}} className={`${BUTTON_STYLE}`}>Merge Sort</button>
                        <button onClick={()=>{bubbleSort()}} className={`${BUTTON_STYLE}`}>Bubble Sort</button>
                        <button onClick={()=>{increaseSpeed()}} className={`${BUTTON_STYLE}`}>Increase</button>
                        <button onClick={()=>{decreaseSpeed()}} className={`${BUTTON_STYLE}`}>Decrease</button>
                        <div className={`${BUTTON_STYLE}`}>{animationSpeed}</div>
                        {/* <button onClick={()=>{testSortingAlgorithms()}} className={`${BUTTON_STYLE}`}>Test Sorting Algorithm</button> */}
                </ul>
                <div className='absolute left-24 bottom-3'>
                    {array.map((value,idx)=>(
                        <div 
                            key={idx}
                            className="array-bar inline-block my-0 mx-px"
                            style={{
                                backgroundColor: primaryColor,
                                height: `${value}px`,
                                width: `${barWidth}px`,
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