import { parseCategorySlug } from "@/app/(lib)/helpers";
import { products as productsService } from "@/app/(lib)/services/products";
import ResponsiveProductGrid from "@/app/(ui)/responsiveProductGrid";
import { PageSelector } from "./pageSelector";
import { CategorySlugType } from "@/app/(lib)/definitions";

type Props = {
    slug: string,
    pageNo?: string,
}

export default async function SortablePaginatedResponsiveProductGrid({slug, pageNo}:Props){
    const page = pageNo ? parseInt(pageNo) : 0;
    const {type, id, name} = parseCategorySlug(slug)
    const {data:products, pagination} = type === CategorySlugType.s ? 
        await productsService.getBySubcategory(id, page)
        :
        await productsService.getByCategory(id, page);

    return (
        <div>
            <ResponsiveProductGrid products={products}/>
            {pagination && <PageSelector pagination={pagination} slug={slug} />}
        </div>
    )
}