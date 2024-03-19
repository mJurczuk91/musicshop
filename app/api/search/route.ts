import { NextRequest } from "next/server";
import { productsSearch, products } from "@/app/(lib)/services/products";
import { Product } from "@/app/(lib)/definitions";


export async function GET(request:NextRequest){
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    const response:{data: Product[]} = {
        data: [],
    }
    if(query) response.data = (await productsSearch(query)).data;

    return Response.json(response.data);
}