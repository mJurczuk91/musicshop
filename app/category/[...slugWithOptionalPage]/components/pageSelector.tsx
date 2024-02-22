import { Pagination } from "@/app/(lib)/definitions"
import Link from "next/link"

type Props = {
    pagination: Pagination,
    slug: string,
}

export function PageSelector({ pagination, slug }: Props) {
    let pageNoArray = [];
    for (let i = 1; i < pagination.pageCount + 1; i++) {
        pageNoArray.push(i);
    }
    return (
        <div>
            {pageNoArray.map(page => {
                return (
                    <div
                        className={` ${pagination.page === page ? `font-bold` : ``}`}
                        key={page}
                    >
                        {pagination.page === page ?
                            <div>
                                {page}
                            </div>
                            :
                            <Link href={slug.concat(`/${page}`)}>
                                {page}
                            </Link>
                        }
                    </div>
                )
            })}
        </div>
    )
}