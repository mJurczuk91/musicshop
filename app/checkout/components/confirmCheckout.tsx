import { CartContext } from "@/app/providers/cartProvider";
import { ToastContext } from "@/app/providers/toastProvider";
import { useContext } from "react";

export default function ConfirmCheckout() {
    const { cart, clearCart } = useContext(CartContext)
    const { addToast } = useContext(ToastContext);

    const totalPrice = cart
        .map(item => item.amount * parseInt(item.product.price))
        .reduce((prev, curr) => prev + curr)
        .toFixed(2);



    const handleCheckout = () => {
        fetch('/api/checkout', {
            method: 'POST',
            body: JSON.stringify(cart.map(item => {
                return {
                    itemId: item.product.id,
                    itemPrice: item.product.price,
                    itemName: item.product.name,
                    itemImageUrl: item.product.imgUrlArray[0],
                    amount: item.amount,
                }
            })),
        })
        .then(response => response.json() as Promise<{ success: boolean, message: string }>)
        .then(json => handleOrderPlaced(json.success, json.message));
    }

    const handleOrderPlaced = (success: boolean, message: string) => {
        if (success) clearCart();
        addToast({ message, success });
    }

    return (
        <div className="m-4 p-4 flex items-center justify-center max-w-6xl w-full border-darkcyan-500 border-t-2 border-opacity-35">
            <p>
                Total cost: <span className="font-bold">${totalPrice}</span>
            </p>

            <button
                disabled={cart.length === 0}
                onClick={handleCheckout}
                className={`
                ${cart.length === 0 ? `bg-gray-400 hover:bg-gray-500` : `bg-tangerine-400 hover:bg-tangerine-500`}
                py-2 px-4 ml-2 h-fit font-bold text-white`}>
                Confirm purchase
            </button>

        </div>
    )
}