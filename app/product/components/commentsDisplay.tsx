'use client'

import { Comment } from "@/app/(lib)/definitions";
import { useState } from "react";

type Props = {
    comments: Comment[],
}

export default function CommentsDisplay({ comments }: Props) {
    const [expandedCommentIds, setExpandedCommentIds] = useState<string[]>([])

    const toggleExpandComment = (id: string) => {
        if (expandedCommentIds.find(el => el == id)) setExpandedCommentIds(expandedCommentIds.filter(el => el !== id));
        else setExpandedCommentIds(expandedCommentIds.concat(new Array(id)));
        console.log(expandedCommentIds);
    }

    return (
        <div>
            {comments && comments.map(c => {
                return expandedCommentIds.find(id => id === c.id) ?
                    c.message.length > 150 ?
                        <p key={c.id}>{c.message} <button onClick={() => toggleExpandComment(c.id)}>Show less</button></p>
                        :
                        <p key={c.id}>{c.message}</p>
                    :
                    c.message.length > 150 ?
                        <p key={c.id}>{c.message.slice(0, 150).concat('...')}<button onClick={() => toggleExpandComment(c.id)}>Show more</button></p>
                        :
                        <p key={c.id}>{c.message}</p>
            })}
        </div>
    )
}