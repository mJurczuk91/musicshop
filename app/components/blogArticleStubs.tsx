import { BlogArticleStub } from "../(lib)/definitions"
import { articles } from "../(lib)/services/articles";
import Link from "next/link";

export default async function BlogArticleStubs() {
    const stubs = (await articles.getPage()).data;
    return <div className="flex py-8 w-full justify-center border-t-gray-400 border-b-gray-400 border-opacity-25">
        <div className="max-w-6xl flex flex-col">
            {stubs.map((stub, index) => <ArticleStub key={index} stub={stub} />)}
        </div>
    </div>
}

function ArticleStub({ stub }: { stub: BlogArticleStub }) {
    return <div className="my-4 basis-1/3 bg-white border-darkcyan-100 border w-full flex lg:odd:flex-row-reverse">
        <div className="flex justify-center p-8 basis-1/2 w-full">
            <img className="w-64" src={stub.image_url} alt="article image"></img>
        </div>
        <div className="flex flex-col justify-center p-8 basis-1/2 w-full">
            <span className=" my-2 font-bold text-lg">{stub.title}</span>
            <p className="text-sm">{stub.synopsis}</p>
        </div>
    </div>
}