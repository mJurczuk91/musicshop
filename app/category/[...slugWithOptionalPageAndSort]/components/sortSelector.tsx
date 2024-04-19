'use client'

import { ProductQuerySort } from "@/app/(lib)/services/products"
import { useRouter } from "next/navigation"
import { generateLink } from "./helpers"

type Props = {
    slug: string,
    page?:string,
    sort?:string,
}

export function SortSelector({slug, page, sort}:Props){
    const router = useRouter();
    const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        if(!Object.keys(ProductQuerySort).find(el => el === e.target.value) || !e.target.value) throw new Error('404 not found');
        const link = generateLink({slug, page, sort:e.target.value});
        try{
            router.push(link);
        } catch(e){
            throw new Error('404 not found');
        }
    }
    return (
        <div>
            <select value={sort ? sort : 'default'} onChange={handleChange}>
                <option value={'nameAsc' as keyof typeof ProductQuerySort}>Name, ascending</option>
                <option value={'nameDesc' as keyof typeof ProductQuerySort}>Name, descending</option>
                <option value={'priceAsc' as keyof typeof ProductQuerySort}>Price, ascending</option>
                <option value={'priceDesc' as keyof typeof ProductQuerySort}>Price, descending</option>
                <option value={'default' as keyof typeof ProductQuerySort}>Relevance</option>
            </select>
        </div>
    )
}

