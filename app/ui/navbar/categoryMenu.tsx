import CategoryMenuItem from "./categoryMenuItem"

export default function CategoryMenu() {
    const categories = [
        {
            name: 'guitars',
            subcategories: [
                'electric guitars', 'funny guitars', 'ukulele', 'blabla', 'asdasd'
            ]
        },
        {
            name: 'drums',
            subcategories: [
                'electric drums', 'drums', 'big drums', 'small drums', 'zxczxc'
            ]
        },
        {
            name: 'headphones',
            subcategories: [
                'asdasdas', 'zxcxzcxzc', 'qazqazqa', 'sdgs dfsgdfs', 'dsfa asdfas'
            ]
        },
        {
            name: 'keyboards',
            subcategories: [
                'qewrqwer', 'qewr', 'adsfregh', 'asdf asdfdasfa', 'hggg ghfhsfgh'
            ]
        },
    ]
    return <div className="w-full flex justify-center">
        <div className=" max-w-6xl w-full p-4 flex justify-center">
            {categories.map(category => <CategoryMenuItem key={category.name} name={category.name} subitems={category.subcategories} />)}
        </div>
    </div>
}