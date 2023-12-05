import Link from "next/link";
import Logo from "./logo";
import Searchbar from "./searchbar";
import CategoryMenu from "./category-menu";

export default function Navbar() {
    return <>
        <nav className="flex flex-col items-center min-w-full justify-center shadow-sm">
            <div className="w-full p-4 max-w-6xl flex justify-between items-center">
                <Logo />
                <Searchbar />
                <div>
                    <Link className="mx-2" href='/#'>Account</Link>
                    <Link href='/cart'>Cart</Link>
                </div>
            </div>
            <CategoryMenu />
        </nav>
    </>
}