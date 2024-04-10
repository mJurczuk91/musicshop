'use client'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
    const router = useRouter();
    const handleLogout = () => {
        fetch("/api/auth/signout")
        .then(()=>{
            router.push('/');
            router.refresh();
        })
    }
    return <button
    className='border-2 rounded-md p-2 m-2 border-tangerine-600 hover:border-tangerine-800'
    onClick={handleLogout}>
        LOG OUT
    </button>
}