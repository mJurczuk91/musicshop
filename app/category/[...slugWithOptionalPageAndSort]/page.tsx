import { categories } from "@/app/(lib)/services/categories";
import CategoryNavigation from "./components/categoryNavigation/categoryNavigation";
import SortablePaginatedResponsiveProductGrid from "./components/categoryProductGrid";
import { parseCategorySlug } from "@/app/(lib)/helpers";
import { CategorySlugType } from "@/app/(lib)/definitions";
import { ProductQuerySort } from "@/app/(lib)/services/products";
import { products as productsService } from "@/app/(lib)/services/products";
import { SortSelector } from "./components/sortSelector";
import { PageSelector } from "./components/pageSelector";

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
    const { type:categoryType, id:categoryId } = parseCategorySlug(slug);

    const currentCategoryId = categoryType === CategorySlugType.c ?
        allCategories.find(cat=> cat.id === categoryId)?.id
        :
        allCategories.find(cat=> cat.subcategories.find(subcat=> subcat.id === categoryId))?.id;

    const currentTitle = categoryType === CategorySlugType.c ?
        allCategories.find(cat => cat.id === categoryId)?.name
        :
        allCategories.flatMap(cat => cat.subcategories).find(subcat => categoryId === subcat.id)?.name;
    if (!currentTitle || !currentCategoryId) throw new Error('404 not found');

    const { data: products, pagination } = categoryType === CategorySlugType.s ?
        await productsService.getBySubcategory({
            subcategoryId: categoryId,
            page: pageNo,
            sort: sortValue,
        })
        :
        await productsService.getByCategory({
            categoryId: categoryId,
            page: pageNo,
            sort: sortValue,
        });
    if (!products || products.length === 0) throw new Error('404 not found');
    return (
        <div className="w-full flex justify-center">
            <div className="max-w-6xl flex m-4 p-4">
                <div>
                    <div className="mx-4 flex flex-col md:flex-row justify-between">

                        <div className="flex flex-col md:flex-row">
                            <div className="flex mr-2 my-2 md:my-0">
                                <span className="mr-2">
                                    Sort by:
                                </span>
                                <SortSelector slug={slug} page={pageNoString} sort={sortKey} />
                            </div>

                            {pagination &&
                            <div className="flex">
                                <span className="mr-2">Page:</span>
                                <PageSelector pagination={pagination} slug={slug} sort={sortKey} />
                            </div>}
                        </div>

                        <span className="capitalize text-2xl font-bold tracking-tight">
                            {currentTitle}
                        </span>
                    </div>

                    <SortablePaginatedResponsiveProductGrid products={products} />

                </div>
            </div>
        </div>
    )
}

const parseParams = (slugInput: string, pageNoInput: string | undefined, sortInput: string | undefined):
    [slug: string, pageNoString: string | undefined, sortValue: string | undefined, sortKey: string | undefined] => {

    function isInt(string: string) {
        return /^[0-9]*$/.test(string);
    }

    function checkIfValidSortKey(string: string | undefined): string | undefined {
        return Object.keys(ProductQuerySort).find(key => key === string);
    }

    let slug = slugInput;
    let pageNoString = undefined;
    let sortValue = undefined;
    let sortKey = undefined;


    if (pageNoInput) {
        if (isInt(pageNoInput)) {
            pageNoString = pageNoInput;
            sortKey = checkIfValidSortKey(sortInput);
            if (sortKey) sortValue = ProductQuerySort[sortKey as keyof typeof ProductQuerySort];
        }
        else {
            sortKey = checkIfValidSortKey(pageNoInput);
            if (sortKey) sortValue = ProductQuerySort[sortKey as keyof typeof ProductQuerySort];
        }
    }
    return [slug, pageNoString, sortValue, sortKey];
}