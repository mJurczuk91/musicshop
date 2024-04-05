import Image from "next/image";
import Bestsellers from "./components/bestsellers";
import BlogArticleStubs from "./components/blogArticleStubs";
import CategoryGrid from "./components/categoryGrid";
import OffersOfTheWeek from "./components/offersOfTheWeek";

export default function Home() {
  return (
    <main className="flex flex-col">
      <CategoryGrid />
      <div className="w-full flex justify-center">
        <div className="w-full max-w-6xl">
          <Image src={'/drummer4.jpg'} alt="drummer pic" width={1200} height={100} />
        </div>
      </div>
      <Bestsellers />
      <OffersOfTheWeek />
      <BlogArticleStubs />
    </main>
  )
}
