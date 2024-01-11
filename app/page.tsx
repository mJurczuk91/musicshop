import Bestsellers from "./(ui)/bestsellers";
import BlogArticleStubs from "./(ui)/blogArticleStubs";
import CategoryGrid from "./(ui)/categoryGrid";
import OffersOfTheWeek from "./(ui)/offersOfTheWeek";

export default function Home() {
  return (
    <main>
      <CategoryGrid />
      <Bestsellers />
      <OffersOfTheWeek />
      <BlogArticleStubs />
    </main>
  )
}
