import Image from 'next/image'
import Link from 'next/link';

const linkStyleClassName="border border-slate-950 hover:border-slate-400 hover:text-slate-400 p-2 rounded text-slate-950 ";

export default function Home() {
  return (
    <>
    <header className='m-4 flex flex-col gap-2'>
      <div className='text-3xl '>Welcome! to Algorithms.io</div>
      <p>Visualize all your favorite algorithms and DSA problems here.</p>
    </header>
      <ul className="m-4 list-none flex flex-col gap-2 w-56">
        <Link href="/algorithms/dijkstras"className={`${linkStyleClassName}`}>{`Dijktra's Algorithm`}</Link>
        <Link href="/algorithms/ratInMaze"className={`${linkStyleClassName}`}>{`Rat in Maze`}</Link>
        <Link href="/algorithms/nQueen"className={`${linkStyleClassName}`}>{`N Queens`}</Link>
        <Link href="/"className={`${linkStyleClassName}`}>{`More Coming Soon...`}</Link>
      </ul>    
    </>
  )
}
