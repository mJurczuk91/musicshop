import Bestsellers from "./(ui)/bestsellers";
import BlogArticleStubs from "./(ui)/blogArticleStubs";
import CategoryGrid from "./(ui)/categoryGrid";

export default function Home() {
  return (
    <main>
      <CategoryGrid />
      <Bestsellers />
      <BlogArticleStubs />
    </main>
  )
}
