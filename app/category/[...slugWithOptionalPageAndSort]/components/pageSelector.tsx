import { Pagination } from "@/app/(lib)/definitions"
import Link from "next/link"
import { generateLink } from "./helpers";

type Props = {
    pagination: Pagination,
    slug: string,
    sort?: string,
}

export function PageSelector({ pagination, slug, sort }: Props) {
    let pageNoArray = [];
    for (let i = 1; i < pagination.pageCount + 1; i++) {
        pageNoArray.push(i);
    }
    return ( //
        <div className="h-fit w-fit flex text-center">
            {pageNoArray.map(page => pagination.page === page ?
                <div key={page} className="w-6 h-fit border-black border-l border-t border-b last:border-r">
                    <div className="font-bold">
                        <span>
                            {page}
                        </span>
                    </div>
                </div>
                :
                <div key={page} className="border-black border-l border-t border-b last:border-r">
                    <Link href={generateLink({ slug, page: `${page}`, sort })}>
                        <div className="w-6 h-fit">
                            {page}
                        </div>
                    </Link>
                </div>
            )}
        </div>
    )
}