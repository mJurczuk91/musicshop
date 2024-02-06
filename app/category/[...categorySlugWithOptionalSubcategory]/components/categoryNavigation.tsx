'use client'
import { Category, Subcategory } from "@/app/(lib)/definitions";
import { getCategorySlug, getSubcategorySlug } from "@/app/(lib)/helpers";
import Link from "next/link";
import { SyntheticEvent, useReducer } from "react";

export type Props = {
    categoriesJSONstring: string,
}

type ToggleExpandAction = {
    payload: {
        categoryId: string
    },
}

type CategoryNavigationState = {
    categories: {
        category: Category,
        expanded: boolean,
    }[],
}

function reducer(state:CategoryNavigationState, action:ToggleExpandAction):CategoryNavigationState {
    if(state.categories.find(c => c.category.id === action.payload.categoryId)){
        return {
            categories: state.categories.map(c => {
                return {
                    category: c.category,
                    expanded: c.category.id === action.payload.categoryId ? !c.expanded : c.expanded
                }
            })
        }
    } else return state;
}

export default function CategoryNavigation({ categoriesJSONstring }: Props) {
    // ZAPYTAĆ CO TU SIĘ ZESRAŁO
    const categories = JSON.parse(categoriesJSONstring) as Category[];
    const [state, dispatch] = useReducer(reducer, {categories: categories.map(c => {
        return {category: c, expanded: false}
    })});
    return (
        <div>
            {state.categories.map(c => {
                return <div key={c.category.id.concat(c.category.name)}>
                    <Link href={`/category/${getCategorySlug(c.category)}`}>
                        <span>
                            {c.category.name}
                        </span>
                    </Link>
                    <button
                        className=" font-bold hover:cursor-pointer"
                        onClick={(e: SyntheticEvent) => dispatch({payload: {categoryId: c.category.id}})}
                    >+</button>
                    <div className={`${c.expanded ? '' : 'hidden'}`}>
                        {c.category.subcategories.map(subcategory => {
                            return <Link 
                                href={`/category/${getCategorySlug(c.category)}/${getSubcategorySlug(subcategory)}`}
                                key={subcategory.id.concat(subcategory.name)}
                                >
                                    <span>
                                        {subcategory.name}
                                    </span>
                                </Link>
                        })}
                    </div>
                </div>
            })}
        </div>
    )
}