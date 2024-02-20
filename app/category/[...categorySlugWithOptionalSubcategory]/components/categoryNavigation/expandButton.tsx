type Props = {
    expandFunction: (id:string) => void,
    categoryId: string,
}

export default function ExpandButton({ expandFunction, categoryId }: Props) {
    return (
        <button
            className=" font-bold hover:cursor-pointer"
            onClick={() => expandFunction(categoryId)}
        > + </button>
    )
}