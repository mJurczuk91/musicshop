import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyJwtToken } from './auth';

type Props = {
    children: React.ReactNode,
    redirectRelativePath?: string,
}

export default async function ProtecedRoute({ children, redirectRelativePath }: Props) {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    const allowed = token && await verifyJwtToken(token);

    if (!allowed) {
        const params = redirectRelativePath ? `?redirect=${encodeURI(redirectRelativePath)}` : null;
        redirect(`/login${params ?? ''}`);
    };

    return (
        <div>
            {children}
        </div>
    )
}