'use client'

import { useEffect, useState } from "react";
import SearchResultList from "./searchResultList";
import { Product } from "@/app/(lib)/definitions";

type Props = {
    children: React.ReactNode,
}

export default function Searchbar() {
    const [query, setQuery] = useState<string>('');
    const [data, setData] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [focus, setFocus] = useState<boolean>(false);

    let timer: NodeJS.Timeout | null = null

    useEffect(() => {
        if (query.length === 0) return;
        setLoading(true);
        fetch(`/api/search?query=${query}`)
            .then(response => response.json())
            .then(data => {
                setLoading(false);
                setData(data);
            });
    }, [query])

    return <div className={`${loading ? 'animate-pulse' : ''}`}>
        <input 
            autoComplete='off'
            className="p-2 text-darkcyan-900 border-tangerine-500 bg-white border-2 rounded-md focus:outline-none"
            type="text" placeholder="Search our catalogue" name="searchField"
            onFocus={() => setFocus(true)}
            onBlur={() => {
                setTimeout(() => {
                    setFocus(false);
                }, 100)
            }}
            onChange={
                (e: React.ChangeEvent<HTMLInputElement>) => {
                    if (timer) clearTimeout(timer);
                    const value = e.currentTarget.value;
                    timer = setTimeout(() => {
                        setQuery(value);
                    }, 500)
                }} />
        {focus && query.length > 0 &&
            <SearchResultList data={data} />
        }
    </div>
}