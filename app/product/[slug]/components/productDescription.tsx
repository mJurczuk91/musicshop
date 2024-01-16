type Props = {
    name: string,
    description: string,
}

export default function ProductDescription({name, description}:Props){
    return (
        <div className="mx-4 py-2">
            <span className="text-xl capitalize">{name}</span>
            <p className="py-2">{description}</p>
        </div>
    )
}