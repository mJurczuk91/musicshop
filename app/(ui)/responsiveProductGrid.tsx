import { Product } from "../(lib)/definitions";
import ProductMiniature from "./productMiniature";

type Props = {
    sectionTitle: string,
    products: Product[],
}

export default function ResponsiveProductGrid({ sectionTitle, products }:Props) {
    return <div className="w-full mt-4 flex justify-center">
    <div className="max-w-6xl">
        <h2 className=" text-2xl uppercase font-bold text-center">{sectionTitle}</h2>
        <div className="w-full flex flex-col items-center md:grid md:grid-cols-2 md:grid-rows-2 md:gap-4 lg:grid-cols-4 lg:grid-rows-1 lg:gap-4">
            {products.map((product, index) => {
                return <ProductMiniature key={index} product={product} />
            })}
        </div>
    </div>
</div>
}