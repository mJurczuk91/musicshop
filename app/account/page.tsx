import ProtecedRoute from "../(lib)/auth/protectedRoute"
import LogoutButton from "./components/logoutButton"

export default function Page() {

    return (
        <ProtecedRoute redirectRelativePath="/account">
            <div>
                EY YO ITS THE ACCOUNT PAGE
                <LogoutButton />
            </div>
        </ProtecedRoute>
    )
}