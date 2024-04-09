type Props = {
    price: string,
}

export function Price({ price }: Props) {
    return (
        <div className="flex flex-col items-left px-4">
            <div className="flex items-center">
                <span
                className="text-xl font-bold text-tangerine-500">
                    ${price} USD
                </span>
                <span 
                className="pl-2 text-sm text-gray-500">
                    doesn&apos;t include shipping
                </span>
            </div>
        </div>
    )
}