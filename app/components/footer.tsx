import Link from "next/link"

type FooterColumnLink = {
    name: string,
    url: string,
}

export default function Footer() {
    const footerColumns = [
        {
            title: 'My links',
            links: [
                {
                    name: 'This projects github page', 
                    url: 'https://github.com/mJurczuk91/musicshop',
                },
                {
                    name: 'My other projects',
                    url: 'https://github.com/mJurczuk91',
                },
            ]
        },
        {
            title: `Client's panel`,
            links: [
                {
                    name: 'Log in',
                    url: '/login',
                },
                {
                    name: 'Account page',
                    url: '/account',
                },
            ]
        },
        {
            title: 'Fake links that lead to main page',
            links: [
                {
                    name: 'Privacy policy',
                    url: '/',
                },
                {
                    name: 'Jobs',
                    url: '/',
                },
                {
                    name: 'Location',
                    url: '/',
                },
            ]
        },
    ]
    return <div className="w-full bg-darkcyan-500 text-white flex justify-center">
        <div className="w-full max-w-6xl m-4 flex flex-col items-center lg:flex-row lg:justify-between">
            {footerColumns.map(column => <FooterColumn key={column.title} title={column.title} links={column.links} />)}
        </div>
    </div>
}

function FooterColumn({ title, links }: { title: string, links: FooterColumnLink[] }) {
    return <div className="m-4 w-1/2 flex flex-col text-center lg:basis-1/3 lg:text-left lg:h-full">
        <p className="font-bold border-b-2 border-tangerine-500">{title}</p>
        {links.map(link => <Link key={link.name} href={link.url}><span>{link.name}</span></Link>)}
    </div>
}