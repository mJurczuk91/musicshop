import CategoryGridElement from "./categoryGridElement"
import { categories } from "../(lib)/services/categories";
import { Category } from "../(lib)/definitions";

export default async function CategoryGrid(){
    const getCategoriesToDisplay = async ():Promise<Category[]> => {
        const cat = (await categories.getAll()).data;
        return cat.map(el => {
            return {
                id: el.id,
                name: el.name,
                subcategories: el.subcategories.slice(0,3),    
            }; 
        })
    };
    const cats = await getCategoriesToDisplay()

    return <div className="hidden md:flex w-full justify-center bg-white border-y-2 border-gray-400 border-opacity-25">
        <div className="border-gray-400 border-opacity-25 [&>*:nth-child(n+3)]:border-t-2 [&>*:nth-child(odd)]:border-r-2 max-w-6xl mx-4 py-4 w-full grid grid-cols-2 grid-rows-2 lg:[&>*:nth-child(n+3)]:border-t-0 lg:[&>*:nth-child(odd)]:border-r-0 lg:divide-gray-400 lg:divide-opacity-25 lg:divide-x-2 lg-divide-y-2 lg:grid-rows-1 lg:grid-cols-4 ">
            {cats.map( cat => <CategoryGridElement key={cat.id} category={cat} />)}
        </div>
    </div>
}