import CommentDisplay from "./commentDisplay";
import { comments } from "@/app/(lib)/services/comments";

type Props = {
    productId: string,
}

export default async function ProductCommentSection({ productId }: Props) {
    const comms = (await comments.getByProductId(productId)).data;
    return (
        <div className="w-full flex flex-col items-center">
            {comms.map(c => {
                return <CommentDisplay key={c.id} comment={c} abbreviateCommentsLongerThan={150} />
            })}
        </div>
    )
}