import { categories } from "@/app/(lib)/services/categories";
import CategoryNavigation from "./components/categoryNavigation/categoryNavigation";
import SortablePaginatedResponsiveProductGrid from "./components/sortablePaginatedResponsiveProductGrid/sortablePaginatedResponsiveProductGrid";
import { parseCategorySlug } from "@/app/(lib)/helpers";
import { CategorySlugType } from "@/app/(lib)/definitions";
import { ProductQuerySort } from "@/app/(lib)/services/products";

type Props = {
    params: {
        slugWithOptionalPageAndSort: [
            'slug',
            'pageNo',
            'sort',
        ]
    }
}

export default async function Page({ params }: Props) {
    const [slug, pageNo, sort] = parseParams(...params.slugWithOptionalPageAndSort);
    const allCategories = (await categories.getAll()).data;
    const { type, id } = parseCategorySlug(slug);
    const currentCategoryId = type === CategorySlugType.c ? id
        : allCategories.find(c => c.subcategories.find(s => s.id === id))?.id;
    if (!currentCategoryId) throw new Error('404 not found');

    return (
        <div className="w-full flex justify-center">
            <div className="max-w-6xl flex m-4 p-4">
                <div className=" min-w-52">
                    <CategoryNavigation categoriesJSONstring={JSON.stringify(allCategories)} currentCategoryId={currentCategoryId} />
                </div>
                <SortablePaginatedResponsiveProductGrid slug={slug} pageNo={pageNo} sort={sort} />
            </div>
        </div>
    )
}

const parseParams = (slugInput:string, pageNoInput:string|undefined, sortInput:string|undefined):[string,string|undefined,string|undefined] => {

    function isInt(string:string) {
        return /^[0-9]*$/.test(string);
    }

    function checkIfValidSortParam(string:string|undefined){
        let res = undefined;
        for(let el of Object.keys(ProductQuerySort)){
            if(string === el){
                res = ProductQuerySort[el as keyof typeof ProductQuerySort];
            }
        }
        return res;
    }

    let slug = slugInput;
    let pageNo = undefined;
    let sort = undefined;
    
    if(pageNoInput){
        if(isInt(pageNoInput)){
            pageNo = pageNoInput;
            sort = checkIfValidSortParam(sortInput);
        }
        else {
            sort = checkIfValidSortParam(pageNoInput);
        }
    }

    return [slug, pageNo, sort];
}