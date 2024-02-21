'use client'
import { Category } from "@/app/(lib)/definitions";
import { useReducer, useState } from "react";
import ExpandButton from "./expandButton";
import CategoryLink from "./categoryLink";
import SubcategoryList from "./subcategoryList";

export type Props = {
    categoriesJSONstring: string,
    currentCategoryId: string,
}

export default function CategoryNavigation({ categoriesJSONstring, currentCategoryId }: Props) {
    const categories = JSON.parse(categoriesJSONstring) as Category[];
    const [expandedCategories, setExpandedCategories] = useState<string[]>([currentCategoryId]);

    const isCategoryExpanded = (id:string):boolean => {
        return Boolean(expandedCategories.find(el => el === id))
    }

    const toggleExpandCategory = (id:string) => {
        if(isCategoryExpanded(id)) setExpandedCategories(expandedCategories.filter(e => e !== id))
        else setExpandedCategories(expandedCategories.concat(id));
    }

    return (
        <div>
            {categories.map(c => {
                return (
                    <div key={c.id.concat(c.name)}>
                        <div>
                            <CategoryLink category={c} />
                            <ExpandButton expandFunction={toggleExpandCategory} categoryId={c.id} />
                        </div>

                        <div className={`${isCategoryExpanded(c.id) ? '' : 'hidden'}`}>
                            <SubcategoryList subcategories={c.subcategories} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}