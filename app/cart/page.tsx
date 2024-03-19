import { ProductList } from "./components/productList/productList";
import { Summary } from "./components/summary";

export default function Page() {
    return (
        <div className="w-full h-full flex flex-col items-center">
            <div className="w-full max-w-6xl text-center my-4 border-b-2 border-black border-opacity-10">
                <span className=" font-bold text-2xl">
                    CART
                </span>
            </div>
            <div>
                <p>
                    cart is currently empty.
                </p>
            </div>
            <div className="w-full h-full flex flex-col justify-center items-center">
                <div className="w-full max-w-6xl flex flex-col items-center">

                    <div className="w-full">
                        <ProductList />
                    </div>
                    <div className="w-full">
                        <Summary />
                    </div>
                </div>
            </div>
        </div>
    )
}