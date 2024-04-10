import { LoginTokenPayload } from "@/app/(lib)/definitions"
import LogoutButton from "./logoutButton"

type Props = {
    user: LoginTokenPayload,
}

export default function AccountInfo({ user }: Props) {
    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full max-w-6xl flex flex-col items-center">
                <p>User name: <span>{user.name}</span></p>
                <LogoutButton />
            </div>
        </div>
    )
}