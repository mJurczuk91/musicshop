type Props = {
    addToCart: () => void,
}

export function AddToCartButton({ addToCart }: Props) {
    return (
        <button
            onClick={() => addToCart()}
            className=" bg-orange-400 py-2 px-4 ml-2 hover:bg-orange-500">
            <span className=" text-white font-bold">
                Add to cart
            </span>
        </button>
    )
}