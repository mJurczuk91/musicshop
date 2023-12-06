import CategoryGridElement from "./categoryGridElement"

export default function CategoryGrid(){
    const categories = [
        {
            name: 'guitars',
            subcategories: [
                'electric guitars', 'funny guitars', 'ukulele',
            ]
        },
        {
            name: 'drums',
            subcategories: [
                'electric drums', 'drums', 'big drums',
            ]
        },
        {
            name: 'headphones',
            subcategories: [
                'asdasdas', 'zxcxzcxzc', 'qazqazqa',
            ]
        },
        {
            name: 'keyboards',
            subcategories: [
                'qewrqwer', 'qewr', 'adsfregh',
            ]
        },
    ]
    return <div className="flex w-full justify-center bg-white border-y-2 border-gray-400 border-opacity-25">
        <div className="max-w-6xl w-full grid grid-rows-1 grid-cols-4 divide-x-2 divide-gray-400 divide-opacity-25">
            {categories.map( el => CategoryGridElement(el))}
        </div>
    </div>
}