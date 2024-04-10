type Props = {
    message: string,
    success: boolean,
}

export default function AvailabilityMessage({ message, success }: Props) {
    return (
        <div>
            <p className={`
                ${success ?
                    'text-green-600'
                    :
                    'text-red-600'
                } font-bold tracking-tight`
            }>
                {success && <span>&#x2714;</span>}
                {!success && <span>&#128473;</span>}
                <span className="ml-2 font-normal">{message}</span>
            </p>
        </div>
    )
}