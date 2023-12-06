import Link from "next/link";
import Logo from "./logo";
import Searchbar from "./searchbar";
import CategoryMenu from "./categoryMenu";

export default function Navbar() {
    return <>
        <nav>
        <div className="hidden md:flex md:flex-col md:items-center md:min-w-full md:justify-center md:shadow-sm">
            <div className="w-full p-4 max-w-6xl flex justify-between items-center">
                <div className="flex basis-1/4 justify-start">
                    <Logo />
                </div>
                <div className="flex basis-1/2 justify-center">
                    <Searchbar />
                </div>
                <div className="flex basis-1/4 justify-end">
                    <Link className="mx-2" href='/#'>Account</Link>
                    <Link href='/cart'>Cart</Link>
                </div>
            </div>
            <CategoryMenu />
        </div>

        <div className="md:hidden flex flex-col items-center min-w-full justify-center shadow-sm">
            <div className="w-full p-4 max-w-6xl flex justify-between items-center">
                <Logo />
                <div>
                    <Link className="mx-2" href='/#'>Account</Link>
                    <Link href='/cart'>Cart</Link>
                </div>
            </div>
            <Searchbar />
            <CategoryMenu />
        </div>
        </nav>
    </>
}