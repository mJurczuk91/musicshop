import { Product } from "../lib/definitions";
import Link from "next/link";
import Card from "./card";

export default function ProductMiniature({ id, name, price, description_short, image_url }: Product) {
    return <div className="bg-white p-4 m-4 shadow-md">
        <Link href={`/product/${id}`}>
            <div className="text-center">
                <img className="h-auto max-w-full" src={`${image_url}`} />
                <h4 className="text-lg font-bold">{name}</h4>
            </div>
        </Link>
        <div className="w-full mt-2 text-center">
            <p className="mb-4">{description_short}</p>
            <span className="font-bold">{price}</span>
        </div>
    </div>
}