import { categories } from "@/app/(lib)/services/categories";
import CategoryNavigation from "./components/categoryNavigation/categoryNavigation";
import SortablePaginatedResponsiveProductGrid from "./components/sortablePaginatedResponsiveProductGrid";
import { parseCategorySlug } from "@/app/(lib)/helpers";
import { CategorySlugType } from "@/app/(lib)/definitions";

type Props = {
    params: {
        slugWithOptionalPage: [
            'slug',
            'pageNo'
        ]
    }
}

export default async function Page({ params }: Props) {
    const [slug, pageNo] = [...params.slugWithOptionalPage]
    const allCategories = (await categories.getAll()).data;
    const {type, id} = parseCategorySlug(slug);
    const currentCategoryId = type === CategorySlugType.c ? id 
        : allCategories.find(c => c.subcategories.find(s => s.id === id))?.id;
    if(!currentCategoryId) throw new Error('404 not found');
    return (
        <div>
            <CategoryNavigation categoriesJSONstring={JSON.stringify(allCategories)} currentCategoryId={currentCategoryId} />
            <SortablePaginatedResponsiveProductGrid slug={slug} pageNo={pageNo} />
        </div>
    )
}