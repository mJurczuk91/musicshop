import { BlogArticleStub } from "./definitions";

export async function fetchBlogArticleStubs():Promise<BlogArticleStub[]>{
    try{
        if(!process.env.ARTICLES) throw new Error("Articles resource env variable not set");
        const resp = await fetch(process.env.ARTICLES);
        if(!resp.ok) throw new Error("Fetching article stubs failed");
        return resp.json();
    } catch {
        throw new Error ("Fetching article stubs failed")
    }
}