import ProtecedRoute from "../(lib)/auth/protectedRoute"
import CheckoutSummary from "./components/checkoutSummary"

export default async function Page() {

    return (
        <ProtecedRoute redirectRelativePath="/checkout">
            <CheckoutSummary />
        </ProtecedRoute>
    )
}