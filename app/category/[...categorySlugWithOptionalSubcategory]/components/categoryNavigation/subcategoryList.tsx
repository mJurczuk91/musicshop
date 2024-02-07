import { Category, Subcategory } from "@/app/(lib)/definitions";
import SubcategoryLink from "./subcategoryLink";

type Props = {
    category: Category,
    subcategories: Subcategory[],
}

export default function SubcategoryList({ category, subcategories }: Props) {
    return <div className="flex flex-col">
        {subcategories.map(subcategory => {
            return <SubcategoryLink
                key={subcategory.id.concat(subcategory.name)}
                category={category}
                subcategory={subcategory}
            />
        })}
    </div>
}

/**/