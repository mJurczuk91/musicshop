type Props = {
    expandFunction: (id:string) => void,
    categoryId: string,
    isExpanded: boolean,
}

export default function ExpandButton({ expandFunction, categoryId, isExpanded }: Props) {
    return (
        <button
            className=" font-bold hover:cursor-pointer"
            onClick={() => expandFunction(categoryId)}
        > { isExpanded ? '-' : '+'} </button>
    )
}