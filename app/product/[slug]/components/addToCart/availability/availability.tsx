'use client'

import { Product } from "@/app/(lib)/definitions";
import { CartContext } from "@/app/providers/cartProvider";
import { useContext } from "react";
import AvailabilityMessage from "./availabilityMessage";

type Props = {
    product: Product,
}

export function Availability({ product }: Props) {
    const { getProductAmountMinusCart } = useContext(CartContext);
    return (
        <div className="flex flex-col px-4 items-left">
            {product.amount < 1 &&
                <AvailabilityMessage success={false} message="Product not available" />
            }
            {product.amount > 0 && getProductAmountMinusCart(product) === 0 &&
                <AvailabilityMessage success={false} message="All available stock is in cart" />
            }
            {product.amount > 0 && getProductAmountMinusCart(product) > 0 &&
                <AvailabilityMessage success={true} message="Product available" />
            }
        </div>
    )
}