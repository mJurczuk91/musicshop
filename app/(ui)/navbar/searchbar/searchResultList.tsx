import { Product } from "@/app/(lib)/definitions";
import SearchResult from "./searchResult";

type Props = {
    //query: string,
    data: Product[],
}

export default function SearchResultList({ data }: Props) {
    return (
        <div className="absolute  flex flex-col">
            {data.length > 0 ?
                data.map(product => <SearchResult key={product.id} product={product} />)
                :
                <SearchResult />
            }
        </div>
    )
}