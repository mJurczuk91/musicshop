'use client'

import { Product } from "@/app/(lib)/definitions";
import { CartContext } from "@/app/providers/cartProvider";
import { useContext } from "react";

type Props = {
    product: Product,
}

export function Availability({ product }: Props) {
    const { getProductAmountMinusCart } = useContext(CartContext);
    return (
        <div className="">
            {product.amount > 0 ?
                getProductAmountMinusCart(product) > 0 ?
                    <div>
                        <span className="text-green-700">
                            Product available
                        </span>
                    </div>
                    :
                    <div className="">
                        <span className=" text-orange-700 font-bold text-xl m-2">
                            X
                        </span>
                        <span className=" text-orange-700">
                            All available stock is in cart
                        </span>
                    </div>
                :
                <div>
                    <span className="text-red-600 font-bold text-xl m-2">
                        X
                    </span>
                    <span className=" text-red-600">
                        Product not available
                    </span>
                </div>
            }
        </div>
    )
}