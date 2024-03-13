'use client'
import { useField } from "formik";

type Props = {
    label: string,
    name: string,
    type: string,
}

export default function TextInput({ label, name, type }: Props) {
    const [field, meta] = useField(name);
    return (
        <div>
            <div className='flex w-full justify-between'>
                <label htmlFor={name}>{label}</label>
                <input
                    className={`${meta.error && meta.touched ? 'border-red-500' : 'border-darkcyan-500'}
                    border rounded-md focus:outline-none px-2`}
                    type={type}
                    id={name}
                    {...field}
                />
            </div>
            <div className='min-h-10'>
                {
                    meta.error && meta.touched &&
                    <p className='text-red-600 w-fit py-2'>{meta.error}</p>
                }
            </div>
        </div>
    )
}