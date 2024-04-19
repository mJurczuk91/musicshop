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
        <div className="w-full max-w-xl p-2 m-2 shadow-sm">
            <div className="flex items-center p-2 w-full border-b-2 border-tangerine-500 ">
                <p className="text-gray-600 tracking-tighter">
                    <span>
                        {leftPad(commentDate.getDate().toString(), '0', 2)}.
                        {leftPad((commentDate.getMonth() + 1).toString(), '0', 2)}.
                        {commentDate.getFullYear()}
                    </span>
                    , by
                    <span className="text-tangerine-500 font-bold">
                        &nbsp;{comment.userName}
                    </span>
                </p>
            </div>
            <div>
                <p className="p-2">
                    {isAbbreviated ? comment.message.slice(0, abbreviateCommentsLongerThan).trim().concat('...') : comment.message}
                </p>
                {comment.message.length > abbreviateCommentsLongerThan &&
                    <button
                        onClick={() => setIsAbbreviated(!isAbbreviated)}
                        className="text-tangerine-600 hover:text-tangerine-700 pl-2">
                        {isAbbreviated ? 'Show more' : 'Show less'}
                    </button>}
            </div>
        </div>
    )
}