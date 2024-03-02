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

type TimedIdentifiableToast = {
    toast: Toast,
    id: number,
    timer: NodeJS.Timeout,
}

type Props = {
    children: React.ReactNode,
}

export default function ToastProvider({ children }: Props) {
    const [toastList, setToastList] = useState<TimedIdentifiableToast[]>([]);
    const [id, setId] = useState<number>(0);

    const getId = ():number => {
        let result = id;
        setId(id => id+1)
        return result;
    }

    const removeToast = (id:number) => {
/*         setToastList(toastList.map(toast => {
            if(toast.id === id){
                clearTimeout(toast.timer);
            }
            else return toast;
        })); */
        
        setToastList(toastList => {
            let newToastList:TimedIdentifiableToast[] = [];
            for (let toast of toastList){
                if(toast.id !== id){
                    newToastList.push(toast);
                }
                clearTimeout(toast.timer);
            }
            return newToastList;
        });
    }

    const addToast = ({ message, success }: Toast) => {
        const id = getId();
        console.log(id);
        setToastList(toastList => {
            return toastList.concat({
                id,
                toast: {message, success},
                timer: setTimeout(() => { removeToast(id) }, 3000),
            })
        });
    }

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="w-fit h-fit absolute right-3 bottom-3 flex flex-col-reverse">
                {toastList.map(({toast:{message, success}, id}) => <Toast key={id} toast={{message, success}} remove={() => removeToast(id)} />)}
            </div>
        </ToastContext.Provider>
    )
}