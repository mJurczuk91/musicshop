import {  Product } from "@/app/(lib)/definitions";
import ProductMiniature from "@/app/(ui)/productMiniature";

type Props = {
    products: Product[],
}

export default async function SortablePaginatedResponsiveProductGrid({ products }: Props) {
    return (
        <div>
            <div className="w-full flex justify-center">
                <div className="max-w-6xl">
                    <div className="
                        w-full flex flex-col items-center
                        md:grid md:grid-cols-2 md:grid-rows-{n} md:gap-4
                        lg:grid lg:grid-cols-3 lg:grid-rows-{n} lg:gap-4
                        ">
                        {products.map((product, index) => {
                            return <ProductMiniature key={index} product={product} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}