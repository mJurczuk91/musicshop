import { expect, test, describe, it } from 'vitest';
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import { render, screen } from '@testing-library/react';
import Bestsellers from '../app/(ui)/bestsellers';
import BlogArticleStubs from '../app/(ui)/blogArticleStubs';
import { products, blogArticles, categories } from '../mocks/mockData.js';
import ProductMiniature from '../app/(ui)/productMiniature';
import CategoryMenuItem from '../app/(ui)/navbar/categoryMenuItem';
import CategoryMenu from '../app/(ui)/navbar/categoryMenu';


describe('product miniature', () => {
    test('displays products name', () => {
        render(<ProductMiniature product={products[0]} />);
        const name = screen.getByText(products[0].name);
        expect(name).toBeInTheDocument();
    });
    test('displays first 30 letters of product description', () => {
        render(<ProductMiniature product={products[0]} />);
        const description = screen.getByText(products[0].description.slice(0,29));
        expect(description).toBeInTheDocument();
    });
    test('displays products image', () => {
        render(<ProductMiniature product={products[0]} />);
        const img = screen.getByAltText('product image') as HTMLImageElement;
        expect(img.src).toContain(`http://localhost:3000${products[0].image_url}`);
    });
})

describe('bestsellers section', () => {
    test('bestsellers section renders 4 product miniatures', async () => {
        const bestsellers = await Bestsellers();
        render(bestsellers);
        for(let i = 0; i < 4; i++){
            const name = screen.getByText(products[i].name);
            const description = screen.getByText(products[i].description.slice(0,29));
            expect(name).toBeInTheDocument();
            expect(description).toBeInTheDocument();
        }
    })
});

describe('blog articles section', () => {
    const renderArticles = async () => {
        const articles = await BlogArticleStubs();
        render(articles);
    };
    it('displays article titles', async () => {
        await renderArticles();
        for(let article of blogArticles){
            const title = screen.getByText(article.title);
            expect(title).toBeInTheDocument();
        }
    });
    it('displays correct image', async () => {
        await renderArticles();
        const images = screen.getAllByAltText("article image") as HTMLImageElement[];
        const imageSrcs = images.map(img=>img.src);
        for(let article of blogArticles){  
            expect(imageSrcs).toContain(`http://localhost:3000${article.image_url}`);
        }
    })
})

describe('CategoryMenuItem', () => {
    test('it displays category name', () => {
        render(<CategoryMenuItem category={categories[0]}/>)
        const cat = screen.getByText(categories[0].name);
        expect(cat).toBeInTheDocument();
    });
    test('it displays all subcategories', () => {
        render(<CategoryMenuItem category={categories[0]}/>);
        for(let item of categories[0].subcategories){
            const subcat = screen.getByText(item);
            expect(subcat).toBeInTheDocument();
        }
    });
});

describe('CategoryMenu', async () => {
    test('it displays all categories and subcategories', async () => {
        const categoryMenu = await CategoryMenu();
        render(categoryMenu);
        for(let cat of categories){
            expect(screen.getByText(cat.name)).toBeInTheDocument();
            for(let subcat of cat.subcategories){
                expect(screen.getByText(subcat)).toBeInTheDocument();
            }
        }
    })
})