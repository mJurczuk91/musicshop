import Logo from "./logo";
import Searchbar from "./searchbar/searchbar";
import CategoryMenu from "./categoryMenu";
import IconLink from "./iconLink";

export default function Navbar() {
    return <>
        <nav className="bg-darkcyan-500 shadow-md">
            <div className="hidden md:flex md:flex-col md:items-center md:min-w-full md:justify-center md:shadow-sm">
                <div className="w-full p-4 max-w-6xl flex justify-between items-center">
                    <div className="flex basis-1/4 justify-start">
                        <Logo />
                    </div>
                    <div className="flex basis-1/2 justify-center">
                        <Searchbar />
                    </div>
                    <div className="flex basis-1/4 justify-end">
                        <IconLink description="Your account" targetUrl="/account" iconUrl="/svg/acc.svg" />
                        <IconLink description="Cart" targetUrl="/cart" iconUrl="/svg/cart.svg" />
                    </div>
                </div>
                <CategoryMenu />
            </div>

            <div className="md:hidden flex flex-col items-center min-w-full justify-center shadow-sm">
                <div className="w-full p-4 max-w-6xl flex justify-between items-center">
                    <Logo />
                    <div className="flex flex-shrink-0">
                        <IconLink description="Your account" targetUrl="/account" iconUrl="/svg/acc.svg" />
                        <IconLink description="Cart" targetUrl="/cart" iconUrl="/svg/cart.svg" />
                    </div>
                </div>
                <Searchbar />
                <CategoryMenu />
            </div>
        </nav>
    </>
}