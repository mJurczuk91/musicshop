import { Category, Subcategory } from "@/app/(lib)/definitions";
import SubcategoryLink from "./subcategoryLink";

type Props = {
    subcategories: Subcategory[],
}

export default function SubcategoryList({ subcategories }: Props) {
    return <div className="flex flex-col">
        {subcategories.map(subcategory => {
            return <SubcategoryLink
                key={subcategory.id.concat(subcategory.name)}
                subcategory={subcategory}
            />
        })}
    </div>
}

/**/