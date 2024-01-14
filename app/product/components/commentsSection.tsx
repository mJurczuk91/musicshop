import { fetchCommentsByProductId } from "@/app/(lib)/data";
import { Comment } from "@/app/(lib)/definitions";
import { useState } from "react";
import CommentsDisplay from "./commentsDisplay";

type Props = {
    productId: string,
}

export default async function ProductCommentSection({ productId }: Props) {
    const comments = await fetchCommentsByProductId(productId);
    return (
        <CommentsDisplay comments={comments} />
    )
}