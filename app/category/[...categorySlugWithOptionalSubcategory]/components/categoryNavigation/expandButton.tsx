import { ToggleExpandAction } from "./categoryNavigation"
type Props = {
    expandFunction: ({ }: ToggleExpandAction) => void,
    categoryId: string,
}

export default function ExpandButton({ expandFunction, categoryId }: Props) {
    return (
        <button
            className=" font-bold hover:cursor-pointer"
            onClick={() => expandFunction({ payload: { categoryId } })}
        > + </button>
    )
}