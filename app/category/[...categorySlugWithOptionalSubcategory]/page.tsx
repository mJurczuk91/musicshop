import { categories } from "@/app/(lib)/services/categories";
import CategoryNavigation from "./components/categoryNavigation/categoryNavigation";
import SortablePaginatedResponsiveProductGrid from "./components/sortablePaginatedResponsiveProductGrid/sortablePaginatedResponsiveProductGrid";
import { parseSlug } from "@/app/(lib)/helpers";

type Props = {
    params: {
        categorySlugWithOptionalSubcategory: [
            'categorySlug',
            'subcategorySlug',
            'pageNo'
        ]
    }
}

export default async function Page({ params }: Props) {
    const [categorySlug, subcategorySlug, pageNo] = [...params.categorySlugWithOptionalSubcategory]
    const allCategories = (await categories.getAll()).data;

    return (
        <div>
            <CategoryNavigation categoriesJSONstring={JSON.stringify(allCategories)} currentCategoryId={parseSlug(categorySlug).id} />
            <SortablePaginatedResponsiveProductGrid categorySlug={categorySlug} subcategorySlug={subcategorySlug} pageNo={pageNo} />
        </div>
    )
}