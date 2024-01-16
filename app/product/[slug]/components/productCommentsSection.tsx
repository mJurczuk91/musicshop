import { fetchCommentsByProductId } from "@/app/(lib)/data";
import CommentDisplay from "./commentDisplay";

type Props = {
    productId: string,
}

export default async function ProductCommentSection({ productId }: Props) {
    const comments = await fetchCommentsByProductId(productId);
    return (

        <div className="w-full flex flex-col items-center">
            {comments.map(c => {
                return <CommentDisplay key={c.id} comment={c} abbreviateCommentsLongerThan={150} />
            })}
        </div>
    )
}