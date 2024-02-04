import { fetchCommentsByProductId } from "@/app/(lib)/data";
import CommentDisplay from "./commentDisplay";
import { getCommentsByProductId } from "@/app/(lib)/services/comments";

type Props = {
    productId: string,
}

export default async function ProductCommentSection({ productId }: Props) {
    const comments = (await getCommentsByProductId(productId)).data;
    return (
        <div className="w-full flex flex-col items-center">
            {comments.map(c => {
                return <CommentDisplay key={c.id} comment={c} abbreviateCommentsLongerThan={150} />
            })}
        </div>
    )
}