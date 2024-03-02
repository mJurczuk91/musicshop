type Props = {
    price: string,
}

export function Price({ price }: Props) {
    return (
        <div className="flex flex-col items-center p-4">
            <div>
                <span
                className="text-xl">
                    ${price}
                </span>
            </div>
            <div>
                <span 
                className=" text-sm text-gray-500">
                    doesn&apos;t include shipping
                </span>
            </div>
        </div>
    )
}