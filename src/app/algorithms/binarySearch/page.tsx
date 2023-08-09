'use client'
import {useState,useEffect} from 'react';
import Link from 'next/link';
import {binarySearch} from '@/logic/binarySearch';
import './page.css';

const BAR_WIDTH=8;
const ANIMATION_SPEED_MS=3;
const NUMBER_OF_ARRAY_BARS = 100;
const PRIMARY_COLOR='turquoise';
const SECONDAY_COLOR='red';
const TEMP_ARRAY:number[]=[];
const BUTTON_STYLE="m-1 border border-slate-950 hover:border-slate-400 hover:text-slate-400 p-2 rounded text-slate-950";

export default function BinarySearchVisualizer(){
    const [numberOfArrayBars,setNumberOfArrayBars]=useState(110);
    const [target,setTarget] = useState(0);
    const [barWidth,setBarWidth]=useState(8);
    const [animationSpeed,setAnimationSpeed]=useState(600);
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
        arr.sort((a, b) => a - b);
        const red:number=randomIntFromInterval(70,150);
        const green:number=randomIntFromInterval(70,150);
        const blue:number=randomIntFromInterval(70,150);
        const color:string="rgb("+red+","+green+","+blue+")";
        const newTraget=randomIntFromInterval(0,numberOfArrayBars-1);
        setColor(color);
        setArray(arr);
        setTarget(arr[newTraget]);
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
    function animateBinarySearch()
    {
        const animations:number[][]=binarySearch(array,target);
        for(let i=0; i<animations.length; i++)
        {
            const arrayBars = Array.from(document.getElementsByClassName('array-bar') as HTMLCollectionOf<HTMLElement>);
            const [lowIdx,midIdx,highIdx]=animations[i];
            console.log(lowIdx,midIdx,highIdx);
            const lowStyle=arrayBars[lowIdx].style;
            const midStyle=arrayBars[midIdx].style;
            const highStyle=arrayBars[highIdx].style;
            if(i%2===0)
            {                
                setTimeout(()=>{
                    arrayBars[lowIdx].className = "array-bar inline-block my-0 mx-px node-visited"
                    arrayBars[midIdx].className = "array-bar inline-block my-0 mx-px node-visited"
                    arrayBars[highIdx].className = "array-bar inline-block my-0 mx-px node-visited"
                    lowStyle.backgroundColor='black';
                    highStyle.backgroundColor='black';
                    midStyle.backgroundColor='green';
                    for(let i=0; i<array.length; i++)
                    {
                        if(i<lowIdx || i>highIdx)
                        {
                            arrayBars[i].style.opacity='0.5';
                        }
                    }
                },animationSpeed*i)                
            }
            else
            {
                setTimeout(()=>{
                    arrayBars[lowIdx].className = "array-bar inline-block my-0 mx-px node-unvisited"
                    arrayBars[midIdx].className = "array-bar inline-block my-0 mx-px node-unvisited"
                    arrayBars[highIdx].className = "array-bar inline-block my-0 mx-px node-unvisited"
                    lowStyle.backgroundColor=(array[lowIdx]===target)? 'red':primaryColor;
                    highStyle.backgroundColor=(array[highIdx]===target)? 'red':primaryColor;                  
                    midStyle.backgroundColor=primaryColor;
                },animationSpeed*i)  
            }
        }
        setTimeout(()=>{
            const arrayBars = Array.from(document.getElementsByClassName('array-bar') as HTMLCollectionOf<HTMLElement>);
            for(let i=0; i<array.length; i++)
            {
                arrayBars[i].style.opacity='1';
            }
        },(animationSpeed*animations.length)+50)
        
    }
    return <>
                <ul className='flex flex-row justify-start my-2 '>
                        <Link href="/" className={`${BUTTON_STYLE}`}>{`Home`}</Link>
                        <button onClick={()=>{resetArray()}} className={`${BUTTON_STYLE}`}>Generate New Array</button>
                        <button onClick={()=>{animateBinarySearch()}} className={`${BUTTON_STYLE}`}>Binary Search</button>
                        <button onClick={()=>{increaseSpeed()}} className={`${BUTTON_STYLE}`}>Increase</button>
                        <button onClick={()=>{decreaseSpeed()}} className={`${BUTTON_STYLE}`}>Decrease</button>
                        <div className={`${BUTTON_STYLE}`}>{animationSpeed}</div>
                </ul>
                <div className='absolute left-24 bottom-3'>
                    {array.map((value,idx)=>(
                        <div 
                            key={idx}
                            className="array-bar inline-block my-0 mx-px"
                            style={{
                                backgroundColor: `${(array[idx]===target)? 'red':primaryColor}`,
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