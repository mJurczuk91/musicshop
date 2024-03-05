'use client'

import { Toast } from "@/app/providers/toastProvider"
import { useState } from "react";

type Props = {
    toast:Toast,
}

export default function Toast({ toast:{message, success} }:Props){
    const [visible, setVisible] = useState<boolean>(true);
    return (
        <div className={`w-72 h-20 my-2 bg-slate-200 shadow-lg ${visible ? '' : 'hidden'}`}>
            <span>{message}</span>
            <div onClick={() => setVisible(visible => !visible)}>CLICK TO REMOVE</div>
        </div>
    )
}