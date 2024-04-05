'use client'

import { useEffect, useState } from "react";
import SearchResult from "./searchResult";
import { Product } from "@/app/(lib)/definitions";
import SearchResultLoading from "./searchResultLoading";

type Props = {
    children: React.ReactNode,
}

export default function Searchbar() {
    const [query, setQuery] = useState<string>('');
    const [data, setData] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [focus, setFocus] = useState<boolean>(false);
    const [searchFieldEmpty, setSearchFieldEmpty] = useState<boolean>(true);

    let timer: NodeJS.Timeout | null = null

    useEffect(() => {
        if (query.length === 0) return;
        fetch(`/api/search?query=${query}`)
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .finally(
                () => {
                    setTimeout(() => setLoading(false), 200);
                }
            );
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, [query]);

    return <div className="w-full max-w-sm">
        <input 
            autoComplete='off'
            className="p-2 w-full text-darkcyan-900 border-tangerine-500 bg-white border-2 rounded-md focus:outline-none"
            type="text" placeholder="Search our catalogue" name="searchField"
            onFocus={() => {
                setFocus(true);
            }}
            onBlur={() => {
                setTimeout(() => {
                    setFocus(false);
                }, 100)
            }}
            onChange={
                (e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.currentTarget.value;
                    if(value.length === 0){
                        setSearchFieldEmpty(true);
                    } else {
                        setLoading(true);
                        setSearchFieldEmpty(false)
                    }
                    if (timer) {
                        clearTimeout(timer);
                    }
                    timer = setTimeout(() => {
                        setQuery(value);
                    }, 500)
                }} />
            <div className={`absolute w-full flex flex-col ${focus && !searchFieldEmpty ? 'visible' : 'invisible'}`}>
                {loading ? 
                <div className="w-full flex items-center">
                    <SearchResultLoading /> 
                </div>
                :
                data.length === 0 ?
                    <SearchResult />
                    :
                    data.map(product => <SearchResult key={product.id} product={product} />)}
            </div>
    </div>
}

//<SearchResultList data={data} />