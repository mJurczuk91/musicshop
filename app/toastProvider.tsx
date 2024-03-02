'use client'

import { createContext, useEffect, useState } from "react"
import Toast from "./(ui)/toast/toast"

export type ToastContextType = {
    addToast: (message: string, success: boolean) => void,
}

export const ToastContext = createContext<ToastContextType>({
    addToast: (message: string, success: boolean) => { },
})

type Props = {
    children: React.ReactNode,
}

export default function ToastProvider({ children }: Props) {
    const [toastList, setToastList] = useState<JSX.Element[]>([]);
    useEffect(() => {
        console.log(toastList);
    },[toastList])

    const addToast = (message: string, success: boolean) => {
        console.log(message);
        setToastList(toastList.concat(<Toast message={message} success={success} remove={() => { }} />))
    }

    return (
        <ToastContext.Provider value={{addToast}}>
            {children}
            <div className={`
                ${toastList.length === 0 ? 'invisible' : ''}
                flex flex-col-reverse fixed right-1 bottom-1 h-fit w-fit`
            }>
                {toastList}
            </div>
        </ToastContext.Provider>
    )
}