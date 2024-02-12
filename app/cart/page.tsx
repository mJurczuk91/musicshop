import { ProductList } from "./components/productList/productList";
import { Summary } from "./components/summary";

export default function Page() {
    return (
        <div>
            <div>CART</div>
            <ProductList />
            <Summary />
        </div>
    )
}