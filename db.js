const {faker} = require('@faker-js/faker');

module.exports = () => {
    const data = {
        categories: [
            {
                "name": "drums",
                "subcategories": [
                    "acoustic drums",
                    "e-drums",
                    "cymbals",
                    "drumheads",
                    "drum hardware"
                ]
            },
            {
                "name": "guitars",
                "subcategories": [
                    "electric guitars",
                    "acoustic guitars",
                    "guitar amplifiers",
                    "guitar effects",
                    "strings"
                ]
            },
            {
                "name": "keyboards",
                "subcategories": [
                    "synthesizers",
                    "stage pianos",
                    "digital pianos",
                    "keyboard hardware"
                ]
            },
            {
                "name": "headphones",
                "subcategories": [
                    "studio headphones",
                    "bluetooth headphones",
                    "in-ear headphones",
                    "overhead headphones"
                ]
            }
        ],
        products: [],
        articles: [],
    }

    // create products
    let pid = 1001;
    for(let category of data.categories){
        for(let subcategory of category.subcategories){
            const amount = faker.number.int(10);
            for(let i = 0; i < amount; i++){
                const product = {
                    id: pid.toString(),
                    name: faker.word.noun() + faker.number.int(1000).toString(),
                    category: category.name,
                    subcategory,
                    price: faker.finance.amount(10, 1000),
                    amount: faker.number.int(10),
                    description: faker.lorem.paragraph(),
                    image_url: `/${category.name}.jpg`,
                }
                pid++;
                data.products.push(product);
            }      
        }
    }

    // create articles
    for(let i = 0; i < 3; i++){
        const article = {
            title: faker.lorem.sentence(),
            image_url: `/guitars.jpg`,
            link: '/#',
            synopsis: faker.lorem.paragraph()
        };
        data.articles.push(article);
    }
    return data;
}