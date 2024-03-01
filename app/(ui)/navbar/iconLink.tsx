import Link from "next/link"

export default function IconLink({ description, iconUrl, targetUrl }: { description: string, iconUrl: string, targetUrl: string }) {
    return <>
        <Link href={targetUrl}
            className="flex flex-col items-center mx-2"
        >
            <img src={iconUrl} className="h-auto w-8"></img>
            <span className="tracking-tighter text-xs text-white">{description}</span>
        </Link>
    </>
}