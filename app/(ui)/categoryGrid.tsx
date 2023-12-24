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
        <div className="max-w-6xl py-4 w-full grid grid-cols-2 grid-rows-2 divide-x-2 divide-y-2 lg:divide-gray-400 lg:divide-opacity-25 lg:divide-x-2 lg-divide-y-2 lg:grid-rows-1 lg:grid-cols-4 ">
            {categories.map( el => CategoryGridElement(el))}
        </div>
    </div>
}