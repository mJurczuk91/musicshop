type Props = {
    description: string,
}

export default function ProductDescription({description}:Props){
    return (
        <div className="px-4">
            <p className="py-2 text-sm tracking-tight">{description}</p>
        </div>
    )
}