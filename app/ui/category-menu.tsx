import CategoryMenuItem from "./category-menu-item"

export default function CategoryMenu(){
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
    return <div>
        {categories.map( category => <CategoryMenuItem key={category.name} name={category.name} subitems={category.subcategories}/>)}
    </div>
}