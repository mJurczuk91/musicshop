import { Product } from "@/app/(lib)/definitions"
import { Price } from "./price"
import { SetAmount } from "./setAmount"
import { Availability } from "./availability/availability"
import ProductDescription from "../productDescription"

type Props = {
    product: Product,
}

export function AddToCart({ product }: Props) {
    return (
        <div>
            <div className="mt-8 mx-4">
                <span className="px-4 text-2xl font-bold capitalize">
                    {product.name}
                </span>
            </div>
            <Price price={product.price} />
            <Availability product={product} />
            <SetAmount product={product} />
            <ProductDescription description={product.description} />
        </div>
    )
}