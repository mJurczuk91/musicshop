import Image from "next/image";
import Bestsellers from "./(ui)/bestsellers";
import BlogArticleStubs from "./(ui)/blogArticleStubs";
import CategoryGrid from "./(ui)/categoryGrid";
import OffersOfTheWeek from "./(ui)/offersOfTheWeek";

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
