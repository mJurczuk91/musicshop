type Props = {
    amount: number,
}

export function Availability({ amount }: Props) {
    return (
        <div>
            {amount > 0 ?
                <div>
                    <span>
                        OK ICON
                    </span>
                    <span>
                        Product avaliable
                    </span>
                </div>
            :
                <div>
                    <span>
                        X
                    </span>
                    <span className=" text-red-600">
                        Product not avaliable
                    </span>
                </div>
            }
        </div>
    )
}