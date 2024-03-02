'use client'

type Props = {
    addToCart: () => void,
    disabled: boolean,
}

export function AddToCartButton({ addToCart, disabled }: Props) {
    return (
        <button
            disabled={disabled}
            onClick={() => addToCart()}
            className={`${disabled ? `bg-gray-400 hover:bg-gray-500` : `bg-tangerine-400 hover:bg-tangerine-500`}  py-2 px-4 ml-2 `}>
            <span className=" text-white font-bold">
                Add to cart
            </span>
        </button>
    )
}