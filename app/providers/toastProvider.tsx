'use client'
import { createContext, useState } from "react"
import Toast from "../(ui)/toast/toast"

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
    const [toastList, setToastList] = useState<Toast[]>([]);

    const addToast = ({ message, success }: Toast) => {
        setToastList(toastList => {
            return toastList.concat({message, success});
        });
        setTimeout(() => {
            setToastList( toastList => toastList.slice(1));
        }, 5000);
    }

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="w-fit h-fit fixed right-3 bottom-3 flex flex-col-reverse">
                {toastList.map(({message, success}, index) => <Toast key={index} toast={{message, success}} />)}
            </div>
        </ToastContext.Provider>
    )
}