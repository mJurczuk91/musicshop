'use client'
import { useState } from "react"

export default function Searchbar() {
    const [input, setInput] = useState<string>('');
    return <div className="flex">
        <form onSubmit={() => {
            console.log(input);
        }}>
            <input className="p-2 text-darkcyan-900 border-tangerine-500 border rounded-l-md focus:outline-none"
            type="text" placeholder="Search our catalogue" onChange={(e: React.ChangeEvent) => {
                if (e.target.nodeValue) setInput(e.target.nodeValue.toString());
            }} />
            <button className="p-2 text-darkcyan-900 tracking-tight rounded-r-md border-tangerine-500 border bg-white hover:bg-darkcyan-100">SEARCH</button>
        </form>
    </div>
}