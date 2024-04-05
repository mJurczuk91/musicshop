import { Product } from "../(lib)/definitions";
import ProductMiniature from "./productMiniature";

type Props = {
    products: Product[],
    sectionTitle?: string,
}

export default function ResponsiveProductGrid({ products, sectionTitle }:Props) {
    return <div className="w-full mt-4 flex justify-center">
    <div className="max-w-6xl">
        {sectionTitle && <h2 className=" text-2xl uppercase font-bold text-center">{sectionTitle}</h2>}
        <div className="
            w-full flex flex-col items-center
            md:grid md:grid-cols-2 md:grid-rows-{n} md:gap-4
            lg:grid lg:grid-cols-4 lg:grid-rows-{n} lg:gap-4
        ">
            {products.map((product, index) => {
                return <ProductMiniature key={index} product={product} />
            })}
        </div>
    </div>
</div>
}