import Image from 'next/image'
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <ul className="m-4">
        <Link className="border border-slate-950 hover:border-slate-400 hover:text-slate-400 p-2 rounded text-slate-950" href="/algorithms">{`Dijktra's Algorithm`}</Link>
      </ul>    
    </>
  )
}
