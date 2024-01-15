import { fetchCommentsByProductId } from "@/app/(lib)/data";
import CommentDisplay from "./commentDisplay";

type Props = {
    productId: string,
}

export default async function ProductCommentSection({ productId }: Props) {
    const comments = await fetchCommentsByProductId(productId);
    return (

        <div className="w-full mb-4 flex flex-col items-center">
            <div className="w-full max-w-6xl mx-4 px-4 lg:px-0">
                <span className="text-2xl font-bold ">Comments</span>
            </div>
            {comments.map(c => {
                return <CommentDisplay key={c.id} comment={c} abbreviateCommentsLongerThan={150} />
            })}
        </div>
    )
}