'use client'
import { useState } from "react";
import { Comment } from "@/app/(lib)/definitions"
import { leftPad } from "@/app/(lib)/helpers";

type Props = {
    comment: Comment,
    abbreviateCommentsLongerThan: number,
}

export default function CommentDisplay({ comment, abbreviateCommentsLongerThan }: Props) {
    const [isAbbreviated, setIsAbbreviated] = useState<boolean>(comment.message.length > abbreviateCommentsLongerThan);
    const commentDate = new Date(comment.date);
    return (
        <div className="flex flex-row w-full max-w-6xl mx-4 border-gray-500 border-b-2">
            <div className="basis-1/5 flex flex-col justify-center text-center">
                <span>{comment.userName}</span>
                <span className="mt-4">
                    {commentDate.getDate()}.
                    {leftPad(commentDate.getMonth().toString(), '0', 2)}.
                    {commentDate.getFullYear()}
                </span>
            </div>
            <div className="basis-4/5">
                <p>{isAbbreviated ? comment.message.slice(0, abbreviateCommentsLongerThan).trim().concat('...') : comment.message}</p>
                {comment.message.length > abbreviateCommentsLongerThan &&
                    <button
                        onClick={() => setIsAbbreviated(!isAbbreviated)}
                        className="text-blue-400 hover:text-blue-600">
                        {isAbbreviated ? 'Show more' : 'Show less'}
                    </button>}
            </div>
        </div>
    )
}