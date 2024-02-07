'use client'
import { Category } from "@/app/(lib)/definitions";
import { useReducer } from "react";
import ExpandButton from "./expandButton";
import CategoryLink from "./categoryLink";
import SubcategoryList from "./subcategoryList";

export type Props = {
    categoriesJSONstring: string,
}

export type ToggleExpandAction = {
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

function reducer(state: CategoryNavigationState, action: ToggleExpandAction): CategoryNavigationState {
    if (state.categories.find(c => c.category.id === action.payload.categoryId)) {
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
    const [state, dispatch] = useReducer(reducer, {
        categories: categories.map(c => {
            return { category: c, expanded: false }
        })
    });
    return (
        <div>
            {state.categories.map(c => {
                return (
                    <div key={c.category.id.concat(c.category.name)}>
                        <div>
                            <CategoryLink category={c.category} />
                            <ExpandButton expandFunction={dispatch} categoryId={c.category.id} />
                        </div>

                        <div className={`${c.expanded ? '' : 'hidden'}`}>
                            <SubcategoryList category={c.category} subcategories={c.category.subcategories} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}