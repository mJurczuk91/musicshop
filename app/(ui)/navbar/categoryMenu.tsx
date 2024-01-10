import { fetchCategories } from "../../(lib)/data"
import CategoryMenuItem from "./categoryMenuItem"

export default async function CategoryMenu() {
    const categories = await fetchCategories();
    return <div className="w-full flex justify-center">
        <div className=" max-w-6xl w-full p-4 flex justify-center">
            {categories.map(category => <CategoryMenuItem key={category.name} category={category} />)}
        </div>
    </div>
}