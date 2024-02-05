import CategoryMenuItem from "./categoryMenuItem"
import { categories } from "@/app/(lib)/services/categories";

export default async function CategoryMenu() {
    const cats = (await categories.getAll()).data;
    
    return <div className="w-full flex justify-center">
        <div className=" max-w-6xl w-full p-4 flex justify-center">
            {cats.map(category => <CategoryMenuItem key={category.id} category={category} />)}
        </div>
    </div>
}