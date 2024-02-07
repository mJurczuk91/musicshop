import { parseSlug } from "@/app/(lib)/helpers";
import { categories } from "@/app/(lib)/services/categories";
import { products } from "@/app/(lib)/services/products";
import CategoryNavigation from "./components/categoryNavigation/categoryNavigation";
import SortablePaginatedResponsiveProductGrid from "./components/sortablePaginatedResponsiveProductGrid/sortablePaginatedResponsiveProductGrid";

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
            <CategoryNavigation categoriesJSONstring={JSON.stringify(allCategories)} />
            <SortablePaginatedResponsiveProductGrid categorySlug={categorySlug} subcategorySlug={subcategorySlug} pageNo={pageNo} />
        </div>
    )
}