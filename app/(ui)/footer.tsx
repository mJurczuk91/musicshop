import Link from "next/link"

type FooterColumnLink = {
    name: string,
    url: string,
}

export default function Footer() {
    const footerColumns = [
        {
            title: 'E-Shop',
            links: [
                {
                    name: 'Special offers',
                    url: '/#'
                },
                {
                    name: 'Shipping rates & policies',
                    url: '/#'
                },
                {
                    name: 'Returns',
                    url: '/#'
                },
            ]
        },
        {
            title: `Client's panel`,
            links: [
                {
                    name: 'Log in',
                    url: '/#'
                },
                {
                    name: 'Register',
                    url: '/#'
                },
                {
                    name: 'Your orders',
                    url: '/#'
                },
            ]
        },
        {
            title: 'Stationary shop',
            links: [
                {
                    name: 'Location',
                    url: '/#'
                },
                {
                    name: 'Jobs',
                    url: '/#'
                },
            ]
        },
    ]
    return <div className="w-full bg-amber-950 text-white flex justify-center">
        <div className="w-full max-w-6xl m-4 flex flex-col items-center lg:flex-row lg:justify-between">
            {footerColumns.map(column => <FooterColumn key={column.title} title={column.title} links={column.links} />)}
        </div>
    </div>
}

function FooterColumn({ title, links }: { title: string, links: FooterColumnLink[] }) {
    return <div className="m-4 w-1/2 flex flex-col text-center lg:basis-1/3 lg:text-left lg:h-full">
        <p className="font-bold border-b-2 border-gray-500 border-opacity-30">{title}</p>
        {links.map(link => <Link key={link.name} href={link.url}><span>{link.name}</span></Link>)}
    </div>
}