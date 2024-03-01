import { Toast } from "@/app/toastProvider"

type Props = {
    toast:Toast,
    remove: ()=>void,
}

export default function Toast({ toast:{message, success}, remove}:Props){
    return (
        <div className="w-72 h-20 my-2 bg-slate-200 shadow-lg ">
            <span>{message}</span>
        </div>
    )
}