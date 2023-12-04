'use client'
import { useState } from "react"

export default function Searchbar() {
    const [input, setInput] = useState<string>('');
    return <div>
        <form onSubmit={() => {
            console.log(input);
        }}>
            <input placeholder="Search our catalogue" onChange={(e:React.ChangeEvent) => {
                if(e.target.nodeValue) setInput(e.target.nodeValue.toString());
            }} />
            <button>SEARCH</button>
        </form>
    </div>
}