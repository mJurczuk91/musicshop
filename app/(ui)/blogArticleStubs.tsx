import { BlogArticleStub } from "../(lib)/definitions"
import { fetchBlogArticleStubs } from "../(lib)/data"
import Link from "next/link";

export default async function BlogArticleStubs() {
    const stubs = await fetchBlogArticleStubs();
    return <div className="flex mt-4 py-8 w-full justify-center border-t-2 border-b-2 border-t-gray-400 border-b-gray-400 border-opacity-25">
        <div className="max-w-6xl flex">
            {stubs.map((stub, index) => <ArticleStub key={index} stub={stub} />)}
        </div>
    </div>
}

function ArticleStub({ stub }: { stub: BlogArticleStub }) {
    return <div className="mx-4 p-2 h-80 basis-1/3 bg-white shadow-md">
        <Link href={stub.link}>
            <span className=" my-2 font-bold text-lg">{stub.title}</span>
        </Link>
        <div>
            <div className="float-left">
            <img className="h-auto w-48" src={stub.image_url} alt="article image"></img>
            </div>
            <p className="text-sm">{stub.synopsis}</p>
        </div>
    </div>
}

