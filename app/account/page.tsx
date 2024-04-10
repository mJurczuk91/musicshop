import ProtecedRoute from "../(lib)/auth/protectedRoute"
import InnerPage from "./components/innerPage"
export default function Page() {

    return (
        <ProtecedRoute redirectRelativePath="/account">
            <InnerPage />
        </ProtecedRoute>
    )
}