import { Category } from "./definitions";

export async function fetchCategories() : Promise<Category[]>{
    if(!process.env.CATEGORIES) throw new Error('Categories env resource not found');
    const res = await fetch(process.env.CATEGORIES);
    if(!res.ok) throw new Error("Categories not found");
    return res.json();
}