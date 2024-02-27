import { categories } from "@/app/(lib)/services/categories";
import CategoryNavigation from "./components/categoryNavigation/categoryNavigation";
import SortablePaginatedResponsiveProductGrid from "./components/sortablePaginatedResponsiveProductGrid/sortablePaginatedResponsiveProductGrid";
import { parseCategorySlug } from "@/app/(lib)/helpers";
import { CategorySlugType } from "@/app/(lib)/definitions";
import { ProductQuerySort } from "@/app/(lib)/services/products";
import { products as productsService } from "@/app/(lib)/services/products";
import { SortSelector } from "./components/sortablePaginatedResponsiveProductGrid/sortSelector";

type Props = {
    params: {
        slugWithOptionalPageAndSort: [
            'slug',
            'pageNoString',
            'sort',
        ]
    }
}

export default async function Page({ params }: Props) {
    const [slug, pageNoString, sortValue, sortKey] = parseParams(...params.slugWithOptionalPageAndSort);
    const pageNo = pageNoString ? parseInt(pageNoString) : 0;

    const allCategories = (await categories.getAll()).data;
    const { type, id } = parseCategorySlug(slug);

    const currentCategoryId = type === CategorySlugType.c ?
        allCategories.find(c => c.id === id)?.id
        :
        allCategories.find(c => c.subcategories.find(s => s.id === id))?.id;

    const currentCategoryName = type === CategorySlugType.c ?
        allCategories.find(c => c.id === id)?.name
        :
        allCategories.flatMap(el => el.subcategories).find(el => id === el.id)?.name;
    if (!currentCategoryName || !currentCategoryId) throw new Error('404 not found');

    const { data: products, pagination } = type === CategorySlugType.s ?
        await productsService.getBySubcategory({
            subcategoryId: id,
            page: pageNo,
            sort: sortValue,
        })
        :
        await productsService.getByCategory({
            categoryId: id,
            page: pageNo,
            sort: sortValue,
        });
    if (!products || products.length === 0) throw new Error('404 not found');

    return (
        <div className="w-full flex justify-center">
            <div className="max-w-6xl flex m-4 p-4">
                <div className="min-w-44 md:min-w-56">
                    <CategoryNavigation categoriesJSONstring={JSON.stringify(allCategories)} currentCategoryId={currentCategoryId} />
                </div>
                <div>
                    <div className="mx-4 flex justify-between">
                        <span className="capitalize text-2xl font-bold tracking-tight">
                            {currentCategoryName}
                        </span>
                        <SortSelector slug={slug} page={pageNoString} sort={sortKey} />
                    </div>
                    <SortablePaginatedResponsiveProductGrid products={products} />
                </div>
            </div>
        </div>
    )
}

const parseParams = (slugInput: string, pageNoInput: string | undefined, sortInput: string | undefined): [string, string | undefined, string | undefined, string | undefined] => {

    function isInt(string: string) {
        return /^[0-9]*$/.test(string);
    }

    function checkIfValidSortParam(string: string | undefined) {
        let res = undefined;
        for (let el of Object.keys(ProductQuerySort)) {
            if (string === el) {
                res = ProductQuerySort[el as keyof typeof ProductQuerySort];
            }
        }
        return res;
    }

    let slug = slugInput;
    let pageNo = undefined;
    let sortValue = undefined;
    let sortKey = undefined;

    if (pageNoInput) {
        if (isInt(pageNoInput)) {
            pageNo = pageNoInput;
            sortValue = checkIfValidSortParam(sortInput);
            if (sortValue) sortKey = sortInput;
        }
        else {
            sortValue = checkIfValidSortParam(pageNoInput);
            if (sortValue) sortKey = sortInput;
        }
    }

    return [slug, pageNo, sortValue, sortKey];
}