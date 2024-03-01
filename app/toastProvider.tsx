'use client'
import { createContext, useState } from "react"
import Toast from "./(ui)/toast/toast"

export type Toast = {
    message: string,
    success: boolean,
}

export type ToastContextType = {
    addToast: (toast: Toast) => void,
}

export const ToastContext = createContext<ToastContextType>({
    addToast: (toast: Toast) => { }
})

type Props = {
    children: React.ReactNode,
}

export default function ToastProvider({ children }: Props) {
    const [toastList, setToastList] = useState<JSX.Element[]>([]);
    const addToast = ({ message, success }: Toast) => {
        setToastList(toastList.concat(<Toast toast={{ message, success }} remove={() => { }} />))
    }
    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="w-fit h-fit absolute right-3 bottom-3 flex flex-col-reverse">
                {toastList}
            </div>
        </ToastContext.Provider>
    )
}