import ProductMiniature from "./product-miniature"
import { Product } from "../lib/definitions"

export default function Bestsellers() {
    const products: Product[] = [
        {
            id: 0,
            name: 'guitar',
            description_short: 'jaka jest każdy widzi',
            image_url: '/guitar.jpg',
            price: 500.99,
        },
        {
            id: 1,
            name: 'guitar',
            description_short: 'jaka jest każdy widzi',
            image_url: '/guitar.jpg',
            price: 666.99,
        },
        {
            id: 2,
            name: 'guitar',
            description_short: 'jaka jest każdy widzi',
            image_url: '/guitar.jpg',
            price: 333.99,
        },
        {
            id: 3,
            name: 'guitar',
            description_short: 'jaka jest każdy widzi',
            image_url: '/guitar.jpg',
            price: 222.99,
        }
    ]
    return <div className="w-full mt-4 flex justify-center">
        <div className="max-w-6xl">
            <h2 className=" text-2xl uppercase font-bold text-center">Bestsellers</h2>

            <div className="w-full flex flex-col items-center md:grid md:grid-cols-2 md:grid-rows-2 md:gap-4 lg:grid-cols-4 lg:grid-rows-1 lg:gap-4">
                {products.map(product => {
                    return <ProductMiniature key={product.id} {...product} />
                })}
            </div>
        </div>
    </div>
}