'use client'
import { useState } from "react"

export default function Searchbar() {
    const [input, setInput] = useState<string>('');
    return <div className="flex">
        <form onSubmit={() => {
            console.log(input);
        }}>
            <input className="border border-gray-300 p-2 rounded-l-md focus:outline-none"
            type="text" placeholder="Search our catalogue" onChange={(e: React.ChangeEvent) => {
                if (e.target.nodeValue) setInput(e.target.nodeValue.toString());
            }} />
            <button className="border p-2 rounded-r-md border-gray-300 border-solid bg-white hover:bg-gray-100">SEARCH</button>
        </form>
    </div>
}