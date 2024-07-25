'use client'

import { useState } from "react";

type Props = {
    message: string,
    success: boolean,
}

export default function Toast({ message, success }: Props) {
    const [visible, setVisible] = useState<boolean>(true);
    return (
        <div className={`flex w-96 h-20 my-2 bg-white shadow-lg ${visible ? '' : 'hidden'}`}>
            <div className={`h-full w-4 min-w-4  ${success ? 'bg-green-600' : 'bg-red-600'}`}></div>
            <div className="w-full flex items-center justify-between px-2 border-tangerine-500 border-t border-b border-r ">
                <span>{message}</span>
                <div className="w-fit h-full flex-col justify-start">
                    <button
                        onClick={() => setVisible(visible => !visible)}
                        className="select-none">
                        &#x2715;
                    </button>
                </div>
            </div>
        </div>
    )
}