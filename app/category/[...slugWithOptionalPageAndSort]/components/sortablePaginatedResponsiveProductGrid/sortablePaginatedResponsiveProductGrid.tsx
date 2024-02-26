import { parseCategorySlug } from "@/app/(lib)/helpers";
import { products as productsService } from "@/app/(lib)/services/products";
import { PageSelector } from "./pageSelector";
import { CategorySlugType } from "@/app/(lib)/definitions";
import ProductMiniature from "@/app/(ui)/productMiniature";

type Props = {
    slug: string,
    pageNo?: string,
    sort?: string,
}

export default async function SortablePaginatedResponsiveProductGrid({ slug, pageNo, sort}: Props) {
    const page = pageNo ? parseInt(pageNo) : 0;
    const { type, id, name } = parseCategorySlug(slug)
    const { data: products, pagination } = type === CategorySlugType.s ?
        await productsService.getBySubcategory({
            subcategoryId: id, 
            page: page,
            sort: sort,
        })
        :
        await productsService.getByCategory({
            categoryId: id,
            page:page,
            sort: sort,
        });

    return (
        <div>
            <div className="w-full mt-4 flex justify-center">
                <div className="max-w-6xl">
                    <h2 className=" text-2xl uppercase font-bold text-center">{name}</h2>
                    <div className="
                        w-full flex flex-col items-center
                        md:grid md:grid-cols-2 md:grid-rows-{n} md:gap-4
                        lg:grid lg:grid-cols-3 lg:grid-rows-{n} lg:gap-4
                        ">
                        {products.map((product, index) => {
                            return <ProductMiniature key={index} product={product} />
                        })}
                    </div>
                </div>
            </div>
            {pagination && <PageSelector pagination={pagination} slug={slug} />}
        </div>
    )
}