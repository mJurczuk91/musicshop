'use client'

import { Toast } from "@/app/providers/toastProvider"
import { useState } from "react";

type Props = {
    message: string,
    success: boolean,
}

//${success ? 'border-green-600' : 'border-red-600'}

export default function Toast({ message, success }: Props) {
    const [visible, setVisible] = useState<boolean>(true);
    return (
        <div className={`flex w-96 h-20 my-2 bg-white shadow-lg ${visible ? '' : 'hidden'}`}>
            <div className={`h-full w-4 min-w-4  ${success ? 'bg-green-600' : 'bg-red-600'}`}></div>
            <div className="w-full flex items-center px-2 border-tangerine-500 border-t border-b border-r ">
                <button
                    onClick={() => setVisible(visible => !visible)}
                    className="select-none absolute right-2 top-2">
                    X
                </button>
                <span>{message}</span>
            </div>
        </div>
    )
}