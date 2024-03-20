import ProtecedRoute from "../(lib)/auth/protectedRoute"
export default function Page() {
    return (
        <ProtecedRoute redirectRelativePath="/account">
            <div>
                EY YO ITS THE ACCOUNT PAGE
            </div>
        </ProtecedRoute>
    )
}