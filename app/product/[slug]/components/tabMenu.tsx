'use client'
import { useState } from "react"

type Props = {
    elements: { title: string, jsx: JSX.Element }[],
}

export default function TabMenu({ elements }: Props) {
    const [selectedItem, setSelectedItem] = useState<string>(elements[0].title);
    return (
        <div className="w-full my-6 shadow-lg flex flex-col items-center">
            <div className="w-full max-w-6xl flex justify-center">
                {elements.map(({ title }) => {
                    return (
                        <button
                            key={title.concat('button')}
                            className={`capitalize p-2 mx-2 ${title === selectedItem ? 'font-bold border-orange-500 border-b-2' : ''} hover:font-bold hover:border-orange-500 hover:border-b-2`}
                            onClick={() => { setSelectedItem(title) }}
                        >
                            {title}
                        </button>
                    )
                })}
            </div>
            {elements.map(({ title, jsx }) => {
                return (
                    <div
                        key={title.concat('content')}
                        className={`${selectedItem === title ? '' : 'hidden'} w-full max-w-6xl`}
                    >
                        <div className='w-full border-gray-500 border-b-2 text-center mt-2'>
                            <span className="text-2xl tracking-tight font-bold capitalize">{title}</span>
                        </div>

                        <div>
                            {jsx}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}