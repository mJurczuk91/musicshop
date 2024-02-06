import { parseSlug } from "@/app/(lib)/helpers";
import { categories } from "@/app/(lib)/services/categories";
import { products } from "@/app/(lib)/services/products";

type Props = {
    params: {
        categorySlugWithOptionalSubcategory: [
            'categorySlug',
            'subcategorySlug'
        ]
    }
}

export default async function Page({ params }: Props) {
    const [categorySlug, subcategorySlug] = [...params.categorySlugWithOptionalSubcategory]
    const paginatedProducts = subcategorySlug ? await products.getBySubcategory(parseSlug(subcategorySlug).id) : await products.getByCategory(parseSlug(categorySlug).id);
    const allCategories = (await categories.getAll()).data;
/*     console.log(paginatedProducts);
    console.log(allCategories); */
}