type Props = {
    details: { key: string, value: string }[],
}

export default function ProductDetails({ details }: Props) {
    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full max-w-6xl">
                <span className="text-2xl font-bold">Product details</span>
                {details.map(({ key, value }) => {
                    return <div key={key.concat(value)} className="odd:bg-gray-300 border-gray-500 first-of-type:border-t-2">
                        <div className="w-full flex flex-row py-2 hover:bg-gray-400">
                            <span className=" basis-1/2 w-full capitalize font-bold text-right mr-2">{key}</span>
                            <span className=" basis-1/2 w-full text-left ml-2">{value}</span>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}