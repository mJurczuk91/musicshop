import { parseSlug } from "@/app/(lib)/helpers";
import { products as productsService } from "@/app/(lib)/services/products";
import ResponsiveProductGrid from "@/app/(ui)/responsiveProductGrid";

type Props = {
    categorySlug: string,
    subcategorySlug?: string,
    pageNo?: string,
}

export default async function SortablePaginatedResponsiveProductGrid({categorySlug, subcategorySlug, pageNo}:Props){
    const page = pageNo ? parseInt(pageNo) : 0;
    const {data:products, pagination} = subcategorySlug ? 
        await productsService.getBySubcategory(parseSlug(subcategorySlug).id, page)
        :
        await productsService.getByCategory(parseSlug(categorySlug).id, page)
    ;

    return (
        <div>
            <ResponsiveProductGrid products={products}/>
        </div>
    )
}